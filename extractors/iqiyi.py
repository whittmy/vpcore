#!/usr/bin/env python

from ..common import *
from ..extractor import VideoExtractor
from ..tornado_fetcher34 import Fetcher
import time
from uuid import uuid4
from random import random,randint
import json
from math import floor
from zlib import decompress
import hashlib
import urllib.parse

'''
Changelog:
-> http://www.iqiyi.com/common/flashplayer/20150916/MainPlayer_5_2_28_c3_3_7_4.swf
   use @fffonion 's method in #617.
   Add trace AVM(asasm) code in Iqiyi's encode function where the salt is put into the encode array and reassemble by RABCDasm(or WinRABCDasm),then use Fiddler to response modified file to replace the src file with its AutoResponder function ,set browser Fiddler proxy and play with !debug version! Flash Player ,finially get result in flashlog.txt(its location can be easily found in search engine).
   Code Like (without letters after #comment:),it just do the job : trace("{IQIYI_SALT}:"+salt_array.join(""))
   ```(Postion After getTimer)
     findpropstrict      QName(PackageNamespace(""), "trace")
     pushstring          "{IQIYI_SALT}:" #comment for you to locate the salt
     getscopeobject      1
     getslot             17 #comment: 17 is the salt slots number defined in code
     pushstring          ""
     callproperty        QName(Namespace("http://adobe.com/AS3/2006/builtin"), "join"), 1
     add
     callpropvoid        QName(PackageNamespace(""), "trace"), 1
   ```

-> http://www.iqiyi.com/common/flashplayer/20150820/MainPlayer_5_2_27_2_c3_3_7_3.swf
    some small changes in Zombie.bite function

'''

'''
com.qiyi.player.core.model.def.DefinitonEnum
bid meaning for quality
0 none
1 standard
2 high
3 super
4 suprt-high
5 fullhd
10 4k
96 topspeed

'''
def mix(tvid):
    salt = '2c76de15dcb44bd28ff0927d50d31620'
    tm = str(randint(2000,4000))
    sc = hashlib.new('md5', bytes(salt + tm + tvid, 'utf-8')).hexdigest()
    return tm, sc, 'eknas'

def getVRSXORCode(arg1,arg2):
    loc3=arg2 %3
    if loc3 == 1:
        return arg1^121
    if loc3 == 2:
        return arg1^72
    return arg1^103


def getVrsEncodeCode(vlink):
    loc6=0
    loc2=''
    loc3=vlink.split("-")
    loc4=len(loc3)
    # loc5=loc4-1
    for i in range(loc4-1,-1,-1):
        loc6=getVRSXORCode(int(loc3[loc4-i-1],16),i)
        loc2+=chr(loc6)
    return loc2[::-1]

def getDispathKey(rid):
    tp=")(*&^flash@#$%a"  #magic from swf
    time=json.loads(get_content("http://data.video.qiyi.com/t?tn="+str(random())))["t"]
    t=str(int(floor(int(time)/(10*60.0))))
    return hashlib.new("md5",bytes(t+tp+rid,"utf-8")).hexdigest()

class Iqiyi(VideoExtractor):
    name = "爱奇艺 (Iqiyi)"

    stream_types = [
        {'id': '4k', 'container': 'f4v', 'video_profile': '4K'},
        {'id': 'fullhd', 'container': 'f4v', 'video_profile': '全高清'},
        {'id': 'suprt-high', 'container': 'f4v', 'video_profile': '超高清'},
        {'id': 'super', 'container': 'f4v', 'video_profile': '超清'},
        {'id': 'high', 'container': 'f4v', 'video_profile': '高清'},
        {'id': 'standard', 'container': 'f4v', 'video_profile': '标清'},
        {'id': 'topspeed', 'container': 'f4v', 'video_profile': '最差'},
    ]

    stream_to_bid = {  '4k': 10, 'fullhd' : 5, 'suprt-high' : 4, 'super' : 3, 'high' : 2, 'standard' :1, 'topspeed' :96}

    stream_urls = {  '4k': [] , 'fullhd' : [], 'suprt-high' : [], 'super' : [], 'high' : [], 'standard' :[], 'topspeed' :[]}

    baseurl = ''

    gen_uid = ''
    def getVMS(self):
        #tm ->the flash run time for md5 usage
        #um -> vip 1 normal 0
        #authkey -> for password protected video ,replace '' with your password
        #puid user.passportid may empty?
        #TODO: support password protected video
        tvid, vid = self.vid
        tm, sc, src = mix(tvid)
        uid = self.gen_uid
        vmsreq='http://cache.video.qiyi.com/vms?key=fvip&src=1702633101b340d8917a69cf8a4b8c7' +\
                "&tvId="+tvid+"&vid="+vid+"&vinfo=1&tm="+tm+\
                "&enc="+sc+\
                "&qyid="+uid+"&tn="+str(random()) +"&um=1" +\
                "&authkey="+hashlib.new('md5',bytes(hashlib.new('md5', b'').hexdigest()+str(tm)+tvid,'utf-8')).hexdigest()
        return json.loads(get_content(vmsreq))

    # rocking for html5
    def getTmts(self):
        tvid, vid = self.vid
        rt = self.compute_by_phantomjs(tvid)    # 成员函数被掉用 self. , 成员函数定义时第一个参数为 self
        #print(rt+"\n\n")
        src = r1(r'src\s=\s([a-z 0-9]+)', rt)
        sc = r1(r'sc\s=\s([a-z 0-9]+)', rt)
        qd_wsz = r1(r'qd_wsz\s=\s([^\\]+)', rt)
        t = r1(r't\s=\s([^\\]+)', rt)
        jst = r1(r'jsT\s=\s([^\\]+)', rt)
        qd_jsin = r1(r'qd_jsin\s=\s([^\\]+)', rt)   # new
        refI = urllib.parse.unquote(r1(r'__refI\s=\s([^\\]+)', rt)) #new
        pos = refI.find(';')
        if pos!=-1:
            refI = refI[pos:]
            refI = self.url + refI
            refI = urllib.parse.quote_plus (urllib.parse.quote_plus (refI)) #quote_plus : for char '/'
        #print(refI)
        if src==None or sc==None \
            or qd_wsz==None or t==None or jst==None:
            print('!!! get data error from phantomjs !!!')
            exit()

        # uid 只是代表唯一id而已
        # 每次变更，优先先确认如下的接口参数是否有变更
        uid = self.gen_uid
        tmtsreq = 'http://cache.m.iqiyi.com/jp/tmts/' +tvid+'/be63d714afd883b930f81679d9f05d5f/?platForm=h5&rate=1' +\
                "&tvid=" + tvid +\
                "&vid=" + vid +\
                "&cupid=qc_100001_100102&type=m3u8" +\
                "&qyid=" + uid +\
                "&nolimit=0" +\
                "&src=" + src +\
                "&sc=" +sc +\
                "&__refI=" + refI +\
                "&qd_wsz=" + qd_wsz +\
                "&t=" + t +\
                "&qd_jsin=" + qd_jsin +\
                "&__jsT=" + jst +\
                "&callback=jsonp1"
        #print(tmtsreq)
        rt = get_content(tmtsreq)
        try:
            info = json.loads(r1(r'\((\{.*\})\)', rt))
        except:
            print('!! tmtsreq content to json data failed !!')
            exit()
        return info
    
    # rocking 返回字符串，方便后面正则处理
    def compute_by_phantomjs(self, tvid):
        # create a fetcher
        fetcher=Fetcher(
          user_agent='', # user agent
          phantomjs_proxy='http://localhost:12306', # phantomjs url
          pool_size=100, # max httpclient num
          async=False,
          has_body=False,
          has_head=False
          )
        # fetch html after rendering javascript from url
         #返回的是json格式
        rt = fetcher.phantomjs_fetch("./module/iqiyi/iqiyi.html", js_url="./iqiyi.js", js_url_callback='function() { var l = window.weorjjigh("' + tvid + '");  return writeObj(l);}')
        #print(rt)
        
        # 转化为字符串
        return str(rt)

    def prepare(self, **kwargs):
        assert self.url or self.vid

        if self.url and not self.vid:
            html = get_html(self.url)
            tvid = r1(r'data-player-tvid="([^"]+)"', html) or r1(r'tvid=([^&]+)', self.url)
            videoid = r1(r'data-player-videoid="([^"]+)"', html) or r1(r'vid=([^&]+)', self.url)
            self.vid = (tvid, videoid)

        self.gen_uid=uuid4().hex
        
        # rocking for m3u8
        if kwargs['geturl']:
            info = self.getTmts()
            assert info["code"] == "A00000"
            
            e = str(info['data']['playInfo']['tvid']) + "_31";
            
            based = info['data']['m3u']
            #print(based)
            if based.find("?") != -1:
                self.baseurl = based + "&qypid=" + e
            else:
                self.baseurl = based + "?qypid=" + e
            return

        info = self.getVMS()

        if info["code"] != "A000000":
            log.e("[error] outdated iQIYI key")
            log.wtf("is your you-get up-to-date?")

        self.title = info["data"]["vi"]["vn"]

        # data.vp = json.data.vp
        #  data.vi = json.data.vi
        #  data.f4v = json.data.f4v
        # if movieIsMember data.vp = json.data.np

        #for highest qualities
        #for http://www.iqiyi.com/v_19rrmmz5yw.html  not vp -> np
        try:
            if info["data"]['vp']["tkl"]=='' :
                raise ValueError
        except:
            log.e("[Error] Do not support for iQIYI VIP video.")
            exit(-1)

        vs = info["data"]["vp"]["tkl"][0]["vs"]
        self.baseurl=info["data"]["vp"]["du"].split("/")

        for stream in self.stream_types:
            for i in vs:
                if self.stream_to_bid[stream['id']] == i['bid']:
                    video_links=i["fs"] #now in i["flvs"] not in i["fs"]
                    if not i["fs"][0]["l"].startswith("/"):
                        tmp = getVrsEncodeCode(i["fs"][0]["l"])
                        if tmp.endswith('mp4'):
                             video_links = i["flvs"]
                    self.stream_urls[stream['id']] = video_links
                    size = 0
                    for l in video_links:
                        size += l['b']
                    self.streams[stream['id']] = {'container': stream['container'], 'video_profile': stream['video_profile'], 'size' : size}
                    break

    def extract(self, **kwargs):
        # rocking for m3u8
        if kwargs['geturl']:
            return self.baseurl
    
    
        if 'stream_id' in kwargs and kwargs['stream_id']:
            # Extract the stream
            stream_id = kwargs['stream_id']

            if stream_id not in self.streams:
                log.e('[Error] Invalid video format.')
                log.e('Run \'-i\' command with no specific video format to view all available formats.')
                exit(2)
        else:
            # Extract stream with the best quality
            stream_id = self.streams_sorted[0]['id']

        urls=[]
        for i in self.stream_urls[stream_id]:
            vlink=i["l"]
            if not vlink.startswith("/"):
                #vlink is encode
                vlink=getVrsEncodeCode(vlink)
            key=getDispathKey(vlink.split("/")[-1].split(".")[0])
            baseurl = [x for x in self.baseurl]
            baseurl.insert(-1,key)
            url="/".join(baseurl)+vlink+'?su='+self.gen_uid+'&qyid='+uuid4().hex+'&client=&z=&bt=&ct=&tn='+str(randint(10000,20000))
            urls.append(json.loads(get_content(url))["l"])
        #download should be complete in 10 minutes
        #because the url is generated before start downloading
        #and the key may be expired after 10 minutes
        
        # rocking old
        if kwargs['geturl']:
            u = '\n'.join(urls)
            return u
            
        self.streams[stream_id]['src'] = urls
 
        
site = Iqiyi()
download = site.download_by_url
iqiyi_download_by_vid = site.download_by_vid
download_playlist = playlist_not_supported('iqiyi')
