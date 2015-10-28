           /* 本js 为 html中几个<script>标签内容的合并*/
           window.__page_start = new Date().getTime();
            // 移动端分享视频时针对大于21亿4700万的tvid进行了处理，此处进行兼容；
            // 当发现是经过转换过的tvid时，计算真实tvid并控制页面跳转到正确的tvid播放页。
            // 2014-05-27@caozhonghong
            (function() {
                function getRealID(id) {
                    if (id % 100 == 99 && id > 200000099 && id < 2000000099) {
                        return (id - 99 - 2000000 * 100 + 2147483647 + 62);
                    } else {
                        return id;
                    }
                }

                var fTvid = location.href.match(/\btvid=([^=\?#&]*)\b/i);
                if (fTvid) {
                    var rTvid = getRealID(fTvid[1]);
                    if (fTvid[1] != rTvid) {
                        // 重定向到正确tvid播放页
                        location.href = location.href.replace(/\btvid=[^=\?#&]*\b/i, "tvid=" + rTvid);
                    }
                }
            })(); (function(console) {
                var rules = {
                    level: 0,
                    //['info', 'trace', 'warn', 'error', 'log']，2对应的是warn
                    types: {
                        'interface_failure_timeout': { //接口超时出错
                            methods: 'random 0',
                            isGanglia: true
                        },
                        'interface_failure_param': { //传入的参数出错
                            methods: 'random 0',
                            isGanglia: true
                        },
                        'interface_failure_internal': { //内部错误，返回的接口数据不是想要的都可以发送这个
                            methods: 'random 5',
                            isGanglia: true
                        },
                        'interface_success': {
                            methods: 'random 30',
                            isGanglia: true
                        },
                        'env': {
                            methods: 'random 30'
                        },
                        'inc': {
                            //暂时配置一个累加的字段,有些需求需要累加
                            methods: 'random 1',
                            isGanglia: true
                        },
                        'timer': { //临时增加的，用来看时间消耗，这个以后会被profile替换
                            methods: 'random 30',
                            isGanglia: true
                        }
                    }
                };

                var getCookie = function(key) {
                    var value = null;
                    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                    result = reg.exec(document.cookie);
                    if (result) {
                        value = result[2] || "";
                    }
                    if ('string' == typeof value) {
                        value = decodeURIComponent(value);
                        return value;
                    }
                    return "";
                },
                setCookie = function(key, value, options) {
                    options = options || {};
                    value = encodeURIComponent(value);
                    var expires = options.expires;
                    if ('number' == typeof options.expires) {
                        expires = new Date();
                        expires.setTime(expires.getTime() + options.expires);
                    }

                    document.cookie = key + "=" + value + (options.path ? "; path=" + options.path: "") + (expires ? "; expires=" + expires.toGMTString() : "") + (options.domain ? "; domain=" + options.domain: "") + (options.secure ? "; secure": '');
                };
                var methods = {
                    all: function() {
                        return true;
                    },
                    random: function(percent) {
                        var randValue = getCookie('lograndvalue');
                        if (randValue === '') {
                            randValue = Math.random() * 100;
                            setCookie('lograndvalue', randValue, {
                                expires: 7 * 24 * 3600 * 1000
                            });
                        }
                        return randValue < percent;
                    }
                };
                var jsonToQuery = function(json) {
                    var query = []; (function f(json) {
                        for (var k in json) {
                            var v = '';
                            if (typeof json[k] != 'object') {
                                v = json[k];
                            } else {
                                //这里不做递归调用了，提高效率
                                //v = f.call(this, json[k]);
                            }
                            query.push(k + '=' + encodeURIComponent(v));
                        }
                    })(json);
                    return query.join('&');
                };

                ['info', 'trace', 'warn', 'error'].forEach(function(method, l) {
                    
                });
                console.track = (function() { //用来描述用户行为轨迹
                    var key = 'track';
                    return {
                        dot: function(msg) {
                            //feedback 打点
                            msg = new Date() + ':::' + msg;
                            try {
                                var omsg = localStorage.getItem(key);
                                var omsgArr = [];
                                if (omsg && (omsgArr = omsg.split('\n')).length > 1000) {
                                    omsgArr = omsgArr.slice(500);
                                }
                                omsgArr.push(msg);
                                localStorage.setItem(key, omsgArr.join('\n'));
                            } catch(e) {

}
                        },
                        getTrackMsg: function() {
                            var msg = '';
                            try {
                                msg = localStorage.getItem(key);
                            } catch(e) {}
                            return msg;
                        },
                        clearTrackMsg: function() {
                            try {
                                localStorage.setItem(key, '');
                            } catch(e) {}

                        }
                    };
                })(); ['time', 'timeEnd', 'profile', 'profileEnd'].forEach(function() {
                    //性能监控相关代码,这个暂时先不实现
                });

            })(window.console);
            
            window.Qiyi = window.Qiyi || {};
            window.Q = window.Qiyi; (function(Q) {
                Q.liburl = "http://static.qiyi.com/js/html5/js/lib/h5lib.removesea.1.0.1.js";
                Q.load = function(jobName, callback) {
                    seajs.use(Q.liburl,
                    function() {
                        seajs.use("http://static.iqiyi.com/js/html5/" + jobName,
                        function(pagejob) {
                            if (pagejob && pagejob.addJobs) {
                                pagejob.addJobs();
                            }
                            if (pagejob && pagejob.start) {
                                pagejob.start();
                            }
                            if (callback) {
                                callback();
                            }
                        });
                    });
                };
                Q.ready = function(callback) {
                    seajs.use(Q.liburl,
                    function() {
                        callback();
                    });
                };
                Q.PageInfo = Q.PageInfo || {};
            })(window.Q);

            Q.PageInfo = Q.PageInfo || {};
            Q.PageInfo.debug = true;
            Q.PageInfo.sample = "sample";
            
            
            
            /*鉴权(常变)20150921
                        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('G 1g={1e:18(n){1a 18(n,r){1a 18(n){1a{1f:n}}(18(t){G e,a=0;2v(G o=n;a<t["1i"];a++){G s=r(t,a);e=a===0?s:e^s}1a e?o:!o})}(18(r,t,e,a){G o=4L;G s=a(t,e)-r(n,o);1a 2P}(J,2e,18(n){1a(""+n)["4K"](1,(n+"")["1i"]-1)}("4J"),18(n,r){1a(1t n)[r]()}),18(n,r){G t=J(n["2t"](r),16)["1r"](2);1a t["2t"](t["1i"]-1)})}("4I")};G 1d=18(n){G r=1t 4G;G t;1Q(n&&n.1i>0){G e=n.1w("*");2v(t=0;t<e.1i-1;t++){4D(t%3){1R 0:r+=1V.1X(J(e[t],8));2c;1R 1:r+=1V.1X(J(e[t],10));2c;1R 2:r+=1V.1X(J(e[t],16));2c}}1a r}4o{1a""}};18 2E(n,r,t,e,o,s){G c=18(){I=I>v?v:I};G p=18(n,r){1a n===r};G p=18(n,r){1a n===r};G u=18(n,r){1a n>r};G I=1g.1e.1f("4n")?3:2q.4m;G v=1g.1e.1f("4k")?4:2q.4i;G f=1g.1e.1f("43")?1o.40:16;p(f,2b)||p(f,-2b)?c():"";G d=1g.1e.1f("8")?1o.24:1;I=1j.1v(I/d);G D=1g.1e.1f("3a")?1j.1v(1o.3Z/d):"";G h=1g.1e.1f("2m")?1:1j.1v(1o.2n/d);G g=1g.1e.1f("3Y")?"":I-h-D;G b=1g.1e.1f("4")?1k(D+"1c"+g):1;G l=1g.1e.1f("3X")?["3S","3Q","3P","1i","2B","3N","3M","1T","3L","3J","3I"]:"3H*";G k,w,n=1x(1k(n)),z,Z,1c=[z=3G,Z=-3F,~z,~Z],m=[];w=(1t 2e).3x();l.2B((l[l[0]](-5).1s("")[l[3]]-5).1r(16));k=(!r?w-7:s+""+o)+"";k=1x(!r?1k(k):1k(k+e+""+t));18 M(t,e,a,o){G s=18(){G n=18(){G n=18(){G n=18(){1c=[S(o[0],1c[0]),S(o[1],1c[1]),S(o[2],1c[2]),S(o[3],1c[3])];M(t,e+(15<<6),e&1p,1c)};G r=18(){M(t,e,e&1p,o)};o=[o[3],S(o[1],(z=S(S(o[0],[o[1]&o[2]|~o[1]&o[3],o[3]&o[1]|~o[3]&o[2],o[1]^o[2]^o[3],o[2]^(o[1]|~o[3])][Z=a>>4]),S(1j.1D(1j.1N(a+1))*2y|0,m[[a,5*a+1,3*a+5,7*a][Z]%16+(e++>>>6)])))<<(Z=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*Z+a%4])|z>>>32-Z),o[1],o[2]];!(e&1p)?n():r()};G r=18(){G n=18(){G n="";k=n};m=[];n();M(t,0,-3,o)};G s=18(n,r){1a n<r};s(e,k<<6)?n():r()};G s=18(){G n=18(){m[e>>2]|=o.1z(e)<<8*(e++%4);M(3,e,-1,o)};G t=18(){M(15,e,0,r?"3w":"3v")};G a=18(n,r){1a n<r};a(e,o.1i)?n():t()};G c=18(){G n=18(){k+=(1c[e>>3]>>(1^e++&7)*4&15).1r(16);M(t,e,a--,o)};G r=18(n,r){1a n<r};r(e,32)?n():""};G p=18(n,r){1a n>=r};p(a,0)?n():a<0&&a>-3?s():c()};G c=18(){q.1h+=1d("3u*");q.1h+=1d("2f*");o=[o[3],S(o[1],(z=S(S(o[0],[o[1]&o[2]|~o[1]&o[3],o[3]&o[1]|~o[3]&o[2],o[1]^o[2]^o[3],o[2]^(o[1]|~o[3])][Z=a>>4]),S(1j.1D(1j.1N(a+1))*2y|0,m[[a,5*a+1,3*a+5,7*a][Z]%16+(e++>>>6)])))<<(Z=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*Z+a%4])|z>>>32-Z),o[1],o[2]];M(J("c",16),e,0,n);1u+="2h";q.1h+=1d("3r*")};G p=18(){G r=18(){m[e>>2]|=(J(o.1m((a>>2)*8,8),16)>>8*(a%4)&1A^a%4)<<((e++&3)<<3);M(9,e,a+1,o)};G t=18(){M(12,e,!K("Q")*1,n)};G s=18(n,r){1a n<r};s(a,o.1i>>1)?r():t()};G i=18(){G r=18(){m[e>>2]|=t.1z(a++)<<8*(e%4);M(12,++e,a,n)};G s=18(){G n=18(){m[e>>2]|=1<<(e%4<<2o(1t 2p("1a "+1q("2r="))())+1.8)+7};K(1q("2s"))?n():"";m[k=(e+8>>6<<4)+14]=e<<3;M(3,0,0,1c)};G c=18(n,r){1a n<r};t=1q(1O(o));c(a,t.1i)?r():s()};G u=18(){G n=18(){m[e>>2]|=(J(o.1m((a>>2)*8,8).1w("").1H().1s(""),16)>>8*(a%4)&1A^a%8)<<((e++&3)<<3);M(16,e,a+1,o)};G t=18(){M(7,e,0,r?"3q":"3p")};G s=18(n,r){1a n<r};s(a,o.1i>>1)?n():t()};G I=18(n,r){1a n>r};G v=18(n,r){1a n<r};I(t,0)&&v(t,5)?s():t>6&&t<10?p():t>11&&t<14?i():t>14&&t<17?u():"";G f=18(){n+="c";G n=1g.1e.1f("e")?1d("2u*"):7;n+=1d("1G*");G r=18(){G n=18(){m[e>>2]|=1<<(e%4<<2o(1t 2p("1a "+1q("2r="))())+1.8)+7};K(1q("2s"))?n():"";m[k=(e+8>>6<<4)+14]=e<<3;M(3,0,0,1c)};m=[]}}l[l[0]][l[1]](1o[l[7]][l[2]]("3o"))[l[10]](18(n){G a=18(){l[l[4]]+=1};G o=18(){1C.1L=1d("1J*1W*");1u+="%28%29";1u+="20%";q.1h+=1d("3n*");G r="";p(f,J("2Q",16))||p(f,-J("2Q",16))?3m():"";G t=18(){G r=18(){G n="";k=n};m=[];r();M(1b,0,-3,n)}};G s=18(){l[l[5]]+=1};G c=18(n,r){1a n>r};G c=18(n,r){1a n>r};c(n.1h[l[6]](l[0][0]+l[0][4]+l[1][1]+"1"+"."+"2"+"."),l[l[3]]-13)?a():"";G u=18(){k=1x(!r?1k(k):1k(k+e+""+t));q.26=3l;G n=18(){M(J("7",16),i,J("0",16),r?"3k":"3j")}};c(n[l[8]][l[6]](l[5][0]+"/b"+l[1][1]+l[4][2]+l[2][6]),l[l[3]]-13)?s():""});18 S(n,r){1a((n>>1)+(r>>1)<<1)+(n&1)+(r&1)}G C=1g.1e.1f("28")?"n%":18(){G r=18(){G n=18(){G n=18(){G n="s";s=n};n();s+="2I"};G r=18(){G n=18(){G n="s";s=n};G r=18(){e+="c";u(1b,J("0",16))&&2a(1b,1*5)?2K():1b>J("6",16)&&1b<J("a",16)?2L():1b>1*11&&1b<1*2*7?2M():1b>J("e",16)&&1b<1*19?2N():"";s+="i"};G t=18(){s+="2I";b?3i():"";M(1b,i+(1*3*5<<1*2*3),i&1*3*3*7,1c);m=[];q.1h+=1d("3h*");q.1h+=1d("2f*")};n();s+="i";G o=18(){q.t=w-l[l[l[3]]-1];G n=1g.1e.1f("4")?1k(D+"1c"+g):1};G c=18(){M(J("10",16),i,j+1,a);G n=18(){1c=[S(a[J("0",16)],1c[J("0",16)]),S(a[1],1c[1]),S(a[J("2",16)],1c[1*2]),S(a[J("3",16)],1c[1*3])];M(1b,i+(1*3*5<<1*2*3),i&1*3*3*7,1c)}};s+="j";s+="s";s+="c"};G t=18(n,r){1a n===r};t(1x(31.2Y.1r()),e)?n():r()};G t=18(n,r){1a n 2U r};G e=1g.1e.1f("2S")?"2R":10;e+="n";e+="c";e+="2h";e+="n%";e+="20";e+="j";e+="3W";e+="a";e+="2V";e+="2W";e+="2X";e+="d";e+="%28%29";e+="%";e+="20%";e+="7";e+="B";e+="%20%2Z";e+="%";e+="2";e+="30";G o=18(){G r=18(){G n=18(){1c=[S(a[J("0",16)],1c[J("0",16)]),S(a[1],1c[1]),S(a[J("2",16)],1c[1*2]),S(a[J("3",16)],1c[1*3])];M(1b,i+(1*3*5<<1*2*3),i&1*3*3*7,1c)};G r=18(){M(1b,i,i&J("3f",16),a)};a=[a[1*3],S(a[1],(z=S(S(a[J("0",16)],[a[1]&a[J("2",16)]|~a[J("1",16)]&a[J("3",16)],a[1*3]&a[J("1",16)]|~a[J("3",16)]&a[J("2",16)],a[1]^a[1*2]^a[J("3",16)],a[1*2]^(a[J("1",16)]|~a[1*3])][Z=j>>J("4",16)]),S(1j.1D(1j.1N(j+1))*(1*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2)|J("0",16),m[[j,J("5",16)*j+1,1*3*j+J("5",16),1*7*j][Z]%(1*2*2*2*2)+(i++>>>J("6",16))])))<<(Z=[1*7,1*2*2*3,J("11",16),J("16",16),J("5",16),J("9",16),J("e",16),J("14",16),1*2*2,1*11,1*2*2*2*2,1*23,1*2*3,1*2*5,J("f",16),1*3*7][J("4",16)*Z+j%J("4",16)])|z>>>J("20",16)-Z),a[1],a[J("2",16)]];!(i&J("3f",16))?n():r()};G t=18(){G r=18(){m[i>>1*2]|=(J(a.1m((j>>1*2)*(1*2*2*2),J("8",16)),J("10",16))>>J("8",16)*(j%J("4",16))&1*3*5*17^j%(1*3))<<((i++&1*3)<<J("3",16));M(1*3*3,i,j+1,a)};G t=18(){M(J("c",16),i,0,n)};G e=18(n,r){1a n<r};e(j,a.1i>>1)?r():t()}};e+="33%34%";e+="20%";e+="7";e+="D";G s=1g.1e.1f("35")?"n":2b;s+="u";s+="l";G c=18(){1C.1L=36;37(j,J("0",16))?38():j<J("0",16)&&j>-J("3",16)?39():3b();G n=1g.1e.1f("4")?1k(D+"1c"+g):1};s+="l";t("3c",1T.3d.3e)?r():"";G p=18(){G n=1g.1e.1f("2m")?1:1j.1v(1o.2n/d)};1a s};l[l[l[3]]]=18(n){1a M(1,0,-1,1q(1O(k))),n[n[n[3]]]=[n[n[4]],n[n[5]],n[n[0]],n[n[6]]].1s("")[n[9]](1t 3g(n[11],"g")),(n[n[n[3]]-1]&&n[n[n[3]]-1][n[3]]^10&2)^4}(l);1Q(r){G y=18(){G n=k;R.2G=n};G T=18(){G n=C;R.27=n};G A=18(){G n=w;R.d=n};G N=18(){1C.1S=R.27();1u+="c";q.1h+="1B";1P=1d("1I*");l[l[1*2*2]]+=J("1",16);q.3s=3t;G n=1g.1e.1f("1Y")?"":"1F*1E*"};G x=18(){G n=1g.1e.1f("3y")?1k(D+1d("3z*")+g):16};G R=1g.1e.1f("3A")?{}:"2";y();G H=18(){u(a[l[1*2*2*2]][l[J("6",16)]](l[1*5][0]+1d("1F*1E*")+l[J("1",16)][1]+l[J("4",16)][1*2]+l[1*2][1*2*3]),l[l[J("3",16)]]-J("d",16))?3B():""};G E=18(){2a(j,a.1i>>1)?3C():3D();M(3,0,0,1c);G r=1g.1e.1f("3E")?2:[1d("1I*2j*2i*1y*2J*"),1d("1y*1B*2H*1G*"),1d("3K*2F*1M*2C*3O*1W*1U*2j*1M*1y*1K*3R*2C*1M*2H*1G*"),1d("1G*2J*2x*3T*1K*3U*"),1d("3V*2F*2T*1J*"),1d("1I*2w*2i*1Z*1K*"),1d("2k*2g*2D*1U*41*4f*1Z*"),1d("42*2z*1p*44*45*1M*2u*1K*"),1d("2k*2g*2x*1U*46*48*47*49*4c*"),1d("4a*1B*4b*1y*2w*"),1d("1Z*2z*4d*4e*1B*1p*1J*")];q.1h+="32";G t=18(){G r=18(){m[i>>1*2]|=1b.1z(j++)<<J("8",16)*(i%J("4",16));M(1*2*2*3,++i,j,n)};G t=18(){m[i>>1*2]|=J("1",16)<<(i%J("4",16)<<1*3)+J("7",16);m[k=(i+1*2*2*2>>1*2*3<<1*2*2)+J("e",16)]=i<<1*3;M(1*3,J("0",16),J("0",16),1c)};G e=18(n,r){1a n<r};1b=1q(1O(a));e(j,1b.1i)?r():t()};1u+="%28%29"};T();A();1a R}G Y=18(){G n=18(){G n=18(){G n="";k=n};m=[];n();M(1b,0,-3,a)};m[i>>2]|=(J(a.1m((j>>2)*8,8).1w("").1H().1s(""),16)>>8*(j%4)&1A^j%8)<<((i++&3)<<3);M(1b,i,j--,a)};G P=18(){k=(!r?w-7:s+""+o)+"";q.26=4g;q.1h+=1d("1y*");1C.1L=1d("1J*1W*");q.1h+=1d("4h*");G n=k};1Q(u(k.1i,4)){G O=18(){G n=18(){G n=b;q.4j=n};n()};G W=18(){G n="4l";q.1h=n};G X=18(){G n=k;q.26=n};G Q=18(){G n=L;q.2A=n};G L=1g.1e.1f("1Y")?"":"1F*1E*";L+=1T.4p+";"+1o.24+";&4q="+w;L=4r(L);G q=1g.1e.1f("4s")?3:{};G B=18(){q.1h+=1d("1p*");G r=18(){G r=18(){m[i>>2]|=(J(a.1m((j>>2)*8,8),16)>>8*(j%4)&1A^j%4)<<((i++&3)<<3);M(9,i,j+1,a)};G t=18(){M(12,i,!K("Q")*1,n)};G e=18(n,r){1a n<r};e(j,a.1i>>1)?r():t()};1P=4t;G t=18(){l[l[5]]+=1}};W();q.1h+="32";q.1h+="4u";G F=18(){k=1x(!r?1k(k):1k(k+e+""+t));G n=18(){l[l[4]]+=1}};G U=18(){M(J("c",16),i,0,n);m[i>>1*2]|=1b.1z(j++)<<J("8",16)*(i%J("4",16));G r=18(){G n=18(){k+=(1c[i>>1*3]>>(1^i++&1*7)*J("4",16)&1*3*5).1r(1*2*2*2*2);M(1b,i,j--,a)};G r=18(n,r){1a n<r};r(i,1*2*2*2*2*2)?n():""};G t=18(){k+=(1c[i>>3]>>(1^i++&7)*4&15).1r(16);M(1b,i,j--,a)};G e=18(){m[i>>1*2]|=(J(a.1m((j>>1*2)*(1*2*2*2),J("8",16)),J("10",16))>>J("8",16)*(j%J("4",16))&1*3*5*17^j%(1*3))<<((i++&1*3)<<J("3",16));M(1*3*3,i,j+1,a)};G o=""};q.1h+="32";q.1h+="4v";q.1h+="4w";q.1h+="a";G V=18(){G n=1g.1e.1f("1Y")?"":"1F*1E*";m[i>>2]|=(J(a.1m((j>>2)*8,8).1w("").1H().1s(""),16)>>8*(j%4)&1A^j%8)<<((i++&3)<<3);q.t=w-l[l[l[1*3]]-J("1",16)];M(1b,i,i&1p,a)};q.1h+="4x";q.1h+="1B";q.1h+="a";q.1h+="4y";X();Q();b?O():"";q.t=w-l[l[l[3]]-1];q.1S=C();1a q}18 K(n){1a 4z 1o[n]!="4A"}}18 4B(n,r,t,e){G o=18(){G n="4C";p.1L=n};G s=18(){1u+="a";2O.2A=4E};G c=1g.1e.1f("e")?2E("",2P,e,t,r,n):4;G p=1g.1e.1f("4F")?{}:1;G u=18(){G n=18(){2l[2l[4]]+=1};G r=1g.1e.1f("4H")?{}:"3";2d=1j.1v(2d/24)};o();G I=18(){2O.1h+=1d("2D*");1n(1*3,J("0",16),J("0",16),h);G n=18(){G n=18(){G n=18(){G n=18(){h=[1l(a[J("0",16)],h[J("0",16)]),1l(a[1],h[1]),1l(a[J("2",16)],h[1*2]),1l(a[J("3",16)],h[1*3])];1n(1b,i+(1*3*5<<1*2*3),i&1*3*3*7,h)};G r=18(){1n(1b,i,i&J("3f",16),a)};a=[a[1*3],1l(a[1],(M=1l(1l(a[J("0",16)],[a[1]&a[J("2",16)]|~a[J("1",16)]&a[J("3",16)],a[1*3]&a[J("1",16)]|~a[J("3",16)]&a[J("2",16)],a[1]^a[1*2]^a[J("3",16)],a[1*2]^(a[J("1",16)]|~a[1*3])][N=j>>J("4",16)]),1l(1j.1D(1j.1N(j+1))*(1*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2)|J("0",16),x[[j,J("5",16)*j+1,1*3*j+J("5",16),1*7*j][N]%(1*2*2*2*2)+(i++>>>J("6",16))])))<<(N=[1*7,1*2*2*3,J("11",16),J("16",16),J("5",16),J("9",16),J("e",16),J("14",16),1*2*2,1*11,1*2*2*2*2,1*23,1*2*3,1*2*5,J("f",16),1*3*7][J("4",16)*N+j%J("4",16)])|M>>>J("20",16)-N),a[1],a[J("2",16)]];!(i&J("3f",16))?n():r()};G r=18(){G n=18(){G n="";25=n};x=[];n();1n(1b,J("0",16),-J("3",16),a)};G t=18(n,r){1a n<r};t(i,25<<1*2*3)?n():r()};G r=18(){G n=18(){x[i>>J("2",16)]|=a.1z(i)<<J("8",16)*(i++%J("4",16));1n(1*3,i,-J("1",16),a)};G r=18(){1n(1*3*5,i,J("0",16),4M?"4N":"4O")};G t=18(n,r){1a n<r};t(i,a.1i)?n():r()};G t=18(){G n=18(){25+=(h[i>>1*3]>>(1^i++&1*7)*J("4",16)&1*3*5).1r(1*2*2*2*2);1n(1b,i,j--,a)};G r=18(n,r){1a n<r};r(i,1*2*2*2*2*2)?n():""};G e=18(n,r){1a n>=r};e(j,J("0",16))?n():j<J("0",16)&&j>-J("3",16)?r():t()}};p.4P=c.2G;G v=18(){G n=1g.1e.1f("2S")?"2R":10;1P=1d("1I*");G r=18(){x[i>>J("2",16)]|=(J(a.1m((j>>1*2)*J("8",16),J("8",16)).1w("").1H().1s(""),J("10",16))>>1*2*2*2*(j%(1*2*2))&J("4Q",16)^j%(1*7))<<((i++&J("3",16))<<1*3);1n(J("10",16),i,j+1,a)};4R(1b,J("0",16))&&2a(1b,1*5)?2K():1b>J("6",16)&&1b<J("a",16)?2L():1b>1*11&&1b<1*2*7?2M():1b>J("e",16)&&1b<1*19?2N():""};p.4S=c.d-7;p.1S=c.27();1a p}',62,303,'||||||||||||||||||||||||||||||||||||||||||var|||parseInt|||||||||||||||||||||||||function||return|opt|_|Decode|z0|p0|k0touZ|src|length|Math|btoa|add|substr|_md5|window|63|atob|toString|join|new|v8string|round|split|escape|143|charCodeAt|255|97|lyObj|abs|98|57|154|reverse|163|150|116|__cliT|65|sin|unescape|jst|if|case|__jsT|document|145|String|53|fromCharCode|b39|146|||||devicePixelRatio|str|sc|jc|||less|90|break|screenHeight|Date|142|110|tio|69|108|151|flag_z|b4b6|outerHeight|parseFloat|Function|screen|d2luZG93LnNlYWpzICYmIHNlYWpzLnZlcnNpb24|X19wYWdlX3N0YXJ0|charAt|156|for|104|6e|4294967296|111|__refI|push|162|64|weorjjigh|117|md|6c|gve|101|PNyvi|uppe6|hZtdX|vHRQE|keyObj|true|5a|fu|fce4|73|in|En|ab|le|javaEnabled|5Bnative|0c|navigator||ode|5D|82d|thgirtuo18|moreThan|FPtcp|ZyBWh||k41hE|WebkitAppearance|documentElement|style||RegExp|66|V8jH1|66363439653361363035343532333731|63643662366360376632633062643565|thgirtuo15|V5QID|141|script|3a353239363238626634653361376464|60643662346163366731623261643565|70|qd_pwsz|thgirtuo7|71|66830606d3366346930616060346f316|933653760616065683236663733603e3|getTime|85a|137|663|H741s|SqbnY|k1kRD|a99|271733879|1732584193|166|forEach|match|161|innerHTML|indexOf|shift|121|querySelectorAll|call|6f|slice|147|68|160|av|abe|79e|screenTop|orientation|120|144|a452|165|109|114|124||77|155|74||72|105||thgirtuo5|61|width|qd_wsz|bb55|d846d0c|height|d21|else|URL|tim|encodeURIComponent|fafc|thgirtuo9|d664d|b6b|54e|489|589|typeof|undefined|weorjjighly|h5|switch|thgirtuo6|8197|Array|258|ecg6mf6ar|_getTime2|substring|785|ifly|93365376061606269313761363066383|26637323430326567366431613f30336|__sigC|ff|more|__ctmM'.split('|'),0,{}));        
            */
            /*201501012*/eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('J 18={X:K(n){V K(n,r){V K(n){V{19:n}}(K(t){J e,a=0;2k(J o=n;a<t["1c"];a++){J c=r(t,a);e=a===0?c:e^c}V e?o:!o})}(K(r,t,e,a){J o=2G;J c=a(t,e)-r(n,o);V 1C}(U,2u,K(n){V(""+n)["2z"](1,(n+"")["1c"]-1)}("2P"),K(n,r){V(1m n)[r]()}),K(n,r){J t=U(n["1U"](r),16)["1f"](2);V t["1U"](t["1c"]-1)})}("2w")};J 1a=K(n){J r=1m 2A;J t;1F(n&&n.1c>0){J e=n.1o("*");2k(t=0;t<e.1c-1;t++){2S(t%3){1G 0:r+=1H.1J(U(e[t],8));1L;1G 1:r+=1H.1J(U(e[t],10));1L;1G 2:r+=1H.1J(U(e[t],16));1L}}V r}2T{V""}};K 1N(n,r,t,e,o,c){J s=K(){v=v>f?f:v};J u=K(n,r){V n===r};J u=K(n,r){V n===r};J p=K(n,r){V n>r};J v=18.X.19("2R")?1B.1R:2;J f=18.X.19("2W")?2:1B.3m;J I=18.X.19("f")?1h.1X:16;u(I,1Y)||u(I,-1Y)?s():"";J d=18.X.19("2H")?"2d*":1h.2q;v=1l.1p(v/d);J D=18.X.19("3b")?"7":1l.1p(1h.3n/d);J g=18.X.19("3s")?1l.1p(1h.3T/d):16;J h=18.X.19("2y")?"i":v-g-D;J l=18.X.19("3")?1s(D+"1i"+h):2;J b=18.X.19("2e")?["2i","2l","2p","1c","1u","1P","1Q","1v","1S","1T","1W"]:10;J w,1i,n=1z(1s(n)),k,z,Z=[k=2I,z=-2N,~k,~z],m=[];1i=(1m 2u).2Q();b.1u((b[b[0]](-5).1k("")[b[3]]-5).1f(16));J C=K(){1d+="8";b[b[U("0",16)]][b[1]](1h[b[1*7]][b[U("2",16)]](1a("2s*34*35*1O*3i*3l*")))[b[1*2*5]](K(n){J r=K(){b[b[1*2*2]]+=U("1",16)};J t=K(){1d+=1a("1O*");1E.1y=R.1t()};J e=K(){b[b[1*5]]+=1};J a=K(n,r){V n>r};J a=K(n,r){V n>r};a(n.1b[b[U("6",16)]](b[U("0",16)][0]+b[U("0",16)][1*2*2]+b[U("1",16)][1]+1a("2x*")+1a("1V*")+1a("1D*")+1a("1V*")),b[b[1*3]]-1*13)?r():"";a(n[b[1*2*2*2]][b[U("6",16)]](b[U("5",16)][U("0",16)]+1a("2B*2D*")+b[1][1]+b[U("4",16)][1*2]+b[1*2][1*2*3]),b[b[1*3]]-U("d",16))?e():""});J n=w;M(7,i,0,r?"28":"2b");m[i>>2]|=(U(a.1j((j>>2)*8,8).1o("").1x().1k(""),16)>>8*(j%4)&1n^j%7)<<((i++&3)<<3);b.1u((b[b[0]](-5).1k("")[b[3]]-5).1f(16));m[i>>U("2",16)]|=1<<(i%(1*2*2)<<U("3",16))+1*7};w=(!r?1i-7:c+""+o)+"";w=1z(!r?1s(w):1s(w+e+""+t));K M(t,e,a,o){J c=K(){J n=K(){J n=K(){J n=K(){Z=[S(o[0],Z[0]),S(o[1],Z[1]),S(o[2],Z[2]),S(o[3],Z[3])];M(t,e+(15<<6),e&1A,Z)};J r=K(){M(t,e,e&1A,o)};o=[o[3],S(o[1],(k=S(S(o[0],[o[1]&o[2]|~o[1]&o[3],o[3]&o[1]|~o[3]&o[2],o[1]^o[2]^o[3],o[2]^(o[1]|~o[3])][z=a>>4]),S(1l.2Z(1l.33(a+1))*4g|0,m[[a,5*a+1,3*a+5,7*a][z]%16+(e++>>>6)])))<<(z=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*z+a%4])|k>>>32-z),o[1],o[2]];!(e&1A)?n():r()};J r=K(){J n=K(){J n="";w=n};m=[];n();M(t,0,-3,o)};J c=K(n,r){V n<r};c(e,w<<6)?n():r()};J c=K(){J n=K(){m[e>>2]|=o.1w(e)<<8*(e++%4);M(3,e,-1,o)};J t=K(){M(15,e,0,r?"3u":"3S")};J a=K(n,r){V n<r};a(e,o.1c)?n():t()};J i=K(){J n=K(){w+=(Z[e>>3]>>(1^e++&7)*4&15).1f(16);M(t,e,a--,o)};J r=K(n,r){V n<r};r(e,32)?n():""};J s=K(n,r){V n>=r};s(a,0)?n():a<0&&a>-3?c():i()};J i=K(){1g=1a("2s*");1d+="8";42(a,0)?46():a<0&&a>-3?4b():2v()};J s=K(){J r=K(){m[e>>2]|=(U(o.1j((a>>2)*8,8),16)>>8*(a%4)&1n^a%1)<<((e++&3)<<3);M(9,e,a+1,o)};J t=K(){M(12,e,!W("Q")*1,n)};J c=K(n,r){V n<r};c(a,o.1c>>1)?r():t()};J u=K(){J r=K(){m[e>>2]|=t.1w(a++)<<8*(e%4);M(12,++e,a,n)};J c=K(){J n=K(){m[e>>2]|=1<<(e%4<<1Z(1m 24("V "+1q("26="))())+1.8)+7};W(1q("2C"))?n():"";m[w=(e+8>>6<<4)+14]=e<<3;M(3,0,0,Z)};J i=K(n,r){V n<r};t=1q(27(o));i(a,t.1c)?r():c()};J p=K(){v=1l.1p(v/d);j(a,o.1c>>1)?2E():2F()};J f=K(){J n=K(){m[e>>1*2]|=o.1w(e)<<U("8",16)*(e++%(1*2*2));M(U("3",16),e,-U("1",16),o)};1d+=1a("1I*29*");v=1l.1p(v/d);1d+="2a"};J I=K(){J n=K(){m[e>>2]|=(U(o.1j((a>>2)*8,8).1o("").1x().1k(""),16)>>8*(a%4)&1n^a%7)<<((e++&3)<<3);M(16,e,a+1,o)};J t=K(){M(7,e,0,r?"28":"2b")};J c=K(n,r){V n<r};c(a,o.1c>>1)?n():t()};J D=K(n,r){V n>r};J j=K(n,r){V n<r};D(t,0)&&j(t,5)?c():t>6&&t<10?s():t>11&&t<14?u():t>14&&t<17?I():""}b[b[0]][b[1]](1h[b[7]][b[2]]("2J"))[b[10]](K(n){J r=K(){b[b[4]]+=1};J t=K(){b[b[5]]+=1};J e=K(n,r){V n>r};J e=K(n,r){V n>r};e(n.1b[b[6]](b[0][0]+b[0][4]+b[1][1]+"1"+"."+"2"+"."),b[b[3]]-13)?r():"";e(n[b[8]][b[6]](b[5][0]+"/b"+b[1][1]+b[4][2]+b[2][6]),b[b[3]]-13)?t():"";J a=K(){1d+=1a("2K*");!(i&1*3*3*7)?2L():2M()}});K S(n,r){V((n>>1)+(r>>1)<<1)+(n&1)+(r&1)}J T=18.X.19("2O")?K(){J r=K(){J r=K(){J n=K(){J n="s";f=n};n();f+="2c";f+="e"};J t=K(){J r=K(){J n="s";f=n};r();f+="i";f+="j";f+="s";f+="c";J t=K(){M(1e,i,j--,a);u+=1a("1K*");m[i>>2]|=(U(a.1j((j>>2)*8,8),16)>>8*(j%4)&1n^j%1)<<((i++&3)<<3)};J e=K(){J r=K(){M(12,i,!W("Q")*1,n)};u+=1a("2f*");J t=K(){w+=(Z[i>>3]>>(1^i++&7)*4&15).1f(16);M(1e,i,j--,a)}}};J e=K(n,r){V n===r};e(1z(2g.2h.1f()),u)?r():t()};J s=K(n,r){V n 2U r};J u=18.X.19("2")?"2V":"45*";u+="2X";u+="i";u+="o";u+="n";u+="%2";u+="0";u+="j";u+="a";u+="2Y";u+="E";u+="2a";u+="b";u+="l";u+="e";u+="d%";u+="2";u+="8";u+="%";u+="2";u+="9";u+="%20";u+="%7";u+="B%";u+="2";u+="0";u+="%";u+="30";u+="a";u+="t";u+="i";u+="31";J v=K(){1E.2j=R.d-1*7;u+=1a("1I*29*");m[i>>2]|=(U(a.1j((j>>2)*8,8).1o("").1x().1k(""),16)>>8*(j%4)&1n^j%7)<<((i++&3)<<3);J n=K(){Z=[S(a[0],Z[0]),S(a[1],Z[1]),S(a[1*2],Z[U("2",16)]),S(a[U("3",16)],Z[U("3",16)])];M(1e,i+(U("f",16)<<1*2*3),i&U("3f",16),Z)};F.1b+="6"};u+="%";u+="20";u+="36";u+="d";u+="e";u+="%5";u+="D";u+="%";u+="20%7";u+="D";J f=18.X.19("37")?"38":2;J I=K(){p(a[b[8]][b[6]](b[5][0]+"/b"+b[1][1]+b[4][2]+b[2][6]),b[b[3]]-13)?3a():"";J n=Y;J r=18.X.19("f")?1h.1X:16};f+="3c";s("3d",1v.3e.3g)?r():"";J d=K(){1E.1y=a.1t();J r=K(){m[i>>1*2]|=1e.1w(j++)<<U("8",16)*(i%U("4",16));M(1*2*2*3,++i,j,n)};F.2m=3h;J a=18.X.19("2n")?1N("",1C,t,e,o,c):1};J D=K(){m[i>>1*2]|=(U(a.1j((j>>U("2",16))*U("8",16),U("8",16)).1o("").1x().1k(""),1*2*2*2*2)>>1*2*2*2*(j%U("4",16))&1*3*5*17^j%(1*2))<<((i++&1*3)<<1*3);u+=1a("1K*3j*");J n=K(){b[b[1*2*2]]+=U("1",16)}};V f}:"4";b[b[b[3]]]=K(n){V M(1,0,-1,1q(27(w))),n[n[n[3]]]=[n[n[4]],n[n[5]],n[n[0]],n[n[6]]].1k("")[n[9]](1m 3k(n[11],"g")),(n[n[n[3]]-1]&&n[n[n[3]]-1][n[3]]^10&2)^4}(b);1F(r){J y=K(){J n=w;R.2o=n};J A=K(){J n=T;R.1t=n};J O=K(){J n=1i;R.d=n};J R=18.X.19("9")?{}:"3o*";y();J x=K(){M(12,++i,j,n);M(1e,i+(15<<6),i&1A,Z)};A();O();V R}1F(p(w.1c,4)){J E=K(){J n=K(){J n=l;F.3p=n};n()};J H=K(){J n="3r";F.1b=n};J L=K(){J n=w;F.3t=n};J q=K(){J n=Y;F.2m=n};J Y=18.X.19("3v")?"":3;Y+=1v.3w+";"+1h.2q+";&3x="+1i;Y=3y(Y);J F=18.X.19("b")?{3z:"3A=="}:1;H();J N=K(){J n=18.X.19("3B")?"1I*":{}};F.1b+="3C";F.1b+="4d";F.1b+="3";F.1b+="2";J P=K(){1d+=1a("1D*");J n=18.X.19("2e")?["2i","2l","2p","1c","1u","1P","1Q","1v","1S","1T","1W"]:10};F.1b+="b";F.1b+="6";F.1b+="3D";F.1b+="3E";F.1b+="3F";F.1b+="3G";L();q();l?E():"";F.t=1i-b[b[b[3]]-1];F.1y=T();V F}K W(n){V 3H 1h[n]!="3I"}J G=K(){M(1*3*5,i,U("0",16),r?"3J":"3K");1d+=1a("45*3L*39*");J n=K(){v=v>f?f:v};1d+=1a("1D*")}}K 3M(n,r,t,e){J o=K(){J n="3N";s.3O=n};J c=18.X.19("2n")?1N("",1C,e,t,r,n):1;J s=18.X.19("3P")?{}:"3Q*3R*1M*2r*3U*3V*2d*3W*1M*3X*3Y*3Z*2r*1M*40*41*";o();J u=K(){J n=K(){J n=K(){J n=K(){J n="s";1g=n};n();1g+="2c";1g+="e"};J r=K(){J n=K(){J n="s";1g=n};n();1g+="i";1g+="j";1g+="s";1g+="c";J r=K(){1r(1e,i,j--,a);1d+=1a("1K*");x[i>>2]|=(U(a.1j((j>>2)*8,8),16)>>8*(j%4)&1n^j%1)<<((i++&3)<<3)};J t=K(){J n=K(){1r(12,i,!43("Q")*1,44)};1d+=1a("2f*");J r=K(){2t+=(h[i>>3]>>(1^i++&7)*4&15).1f(16);1r(1e,i,j--,a)}}};J t=K(n,r){V n===r};t(1z(2g.2h.1f()),1d)?n():r()};47(i,U("20",16))?48():"";J r=18.X.19("49")?"4a*":1B.1R;25.4c=4e};s.4f=c.2o;s.2j=c.d-7;s.1y=c.1t();V s;J p=K(){J n=K(){J n=K(){2t+=(h[i>>1*3]>>(1^i++&U("7",16))*(1*2*2)&1*3*5).1f(1*2*2*2*2);1r(1e,i,j--,a)};J r=K(n,r){V n<r};r(i,U("20",16))?n():""};1r(1e,i+(U("f",16)<<1*2*3),i&U("3f",16),h);25.1b+=1a("3q*");x[i>>2]|=1<<(i%4<<1Z(1m 24("V "+1q("26="))())+1.8)+7}}',62,265,'|||||||||||||||||||||||||||||||||||||||||||||var|function||||||||||parseInt|return||z0|||||||||||k0touZ|p0|Decode|src|length|v8string|opt|toString|jst|window|_|substr|join|Math|new|255|split|round|atob|_md5|btoa|jc|push|document|charCodeAt|reverse|__jsT|escape|63|screen|true|62|lyObj|if|case|String|165|fromCharCode|166|break|65|weorjjigh|151|shift|indexOf|height|innerHTML|match|charAt|56|forEach|orientation|90|parseFloat|||||Function|keyObj|d2luZG93LnNlYWpzICYmIHNlYWpzLnZlcnNpb24|unescape|63663762376362366433633262663465|110|na|30653062343736366337633161333136|gv|145|964|141|navigator|javaEnabled|slice|__ctmM|for|call|__refI|7c|md|querySelectorAll|devicePixelRatio|162|163|str|Date|Rq2tM|ecg6mf6ar|61|ac8|substring|Array|57|X19wYWdlX3N0YXJ0|98|tSTdb|kdW6w|785|2693|1732584193|script|60|HLFZg|mloHG|271733879|1a64|_getTime2|getTime|a24d|switch|else|in|fu|9f79|nct|va|abs|5Bn|ve||sin|99|72|co|6142|nu||ZOMMy|f7a|ll|WebkitAppearance|documentElement||style|thgirtuo16|112|97|RegExp|74|width|screenTop|104|qd_wsz|146|d84|915|sc|93365376061606269313761363066383|67|URL|tim|encodeURIComponent|qd_jsin|aGFoYQ|ee|6d0c32d66|b5|4ea48|997a|589|typeof|undefined|93367356465666368323464333766383|36261626433373264646035343536633|50|weorjjighly|h5|__cliT|f35c|161|117|83236353130326433323330313561303|outerHeight|121|53|108|143|116|6f|6c|154|moreThan|ifDef|tvid||FER2u|less|zOuBp|6a4|164|SrPHL|qd_pwsz||thgirtuo7|__sigC|4294967296'.split('|'),0,{}));
            
            
            /*自定义 将对象转字符串 返回*/
            function writeObj(obj) {
                var description = "";
                for (var i in obj) {
                    var property = obj[i];
                    description += i + " = " + property + "\n";
                }
               //console.warn(description);
               //  document.write(description);
               return description;
            }            