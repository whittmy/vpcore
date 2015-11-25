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
            */
            /*20151118*/eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('G U={18:J(n){K J(n,r){K J(n){K{V:n}}(J(t){G a,i=0;1V(G e=n;i<t["19"];i++){G o=r(t,i);a=i===0?o:a^o}K a?e:!e})}(J(r,t,a,i){G e=2W;G o=i(t,a)-r(n,e);K 1S}(P,1B,J(n){K(""+n)["2B"](1,(n+"")["19"]-1)}("2X"),J(n,r){K(1i n)[r]()}),J(n,r){G t=P(n["1L"](r),16)["1c"](2);K t["1L"](t["19"]-1)})}("2p")};G 1j=J(n){G r=1i 2E;G t;1y(n&&n.19>0){G a=n.1x("*");1V(t=0;t<a.19-1;t++){35(t%3){1w 0:r+=1r.1v(P(a[t],8));1t;1w 1:r+=1r.1v(P(a[t],10));1t;1w 2:r+=1r.1v(P(a[t],16));1t}}K r}37{K""}};J 1R(n,r,t,e,o,u){G c=J(){s=s>p?p:s};G v=J(n,r){K n===r};G v=J(n,r){K n===r};G f=J(n,r){K n>r};G s=U.18.V("36")?1n.38:2;G p=U.18.V("2h")?1n.1A:"1z";G d=U.18.V("2D")?1b.2V:8;v(d,1O)||v(d,-1O)?c():"";G h=U.18.V("3e")?1b.27:"";s=1a.1m(s/h);G g=U.18.V("2c")?3:1a.1m(1b.2e/h);G l=J(){G n,r,t=1l(1d(t)),e,o,u=[e=1J,o=-1N,~e,~o],c=[];G v=J(){G r=J(){G n=J(){u=[M(a[0],u[0]),M(a[1],u[1]),M(a[2],u[2]),M(a[3],u[3])];S(1k,i+(15<<6),i&1h,u)};G r=J(){S(1k,i,i&1h,a)};a=[a[3],M(a[1],(e=M(M(a[0],[a[1]&a[2]|~a[1]&a[3],a[3]&a[1]|~a[3]&a[2],a[1]^a[2]^a[3],a[2]^(a[1]|~a[3])][o=j>>4]),M(1a.2b(1a.1X(j+1))*1G|0,c[[j,5*j+1,3*j+5,7*j][o]%16+(i++>>>6)])))<<(o=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*o+j%4])|e>>>32-o),a[1],a[2]];!(i&1h)?n():r()};G t=J(){G r=J(){G r="";n=r};c=[];r();S(1k,0,-3,a)};G v=J(n,r){K n<r};v(i,n<<6)?r():t()}};G I=U.18.V("2a")?32:1a.1m(1b.1I/h);G b=U.18.V("7")?s-I-g:"";G w=U.18.V("2i")?1d(g+"1g"+b):"2m*";G k=U.18.V("2q")?"e":["2u","2v","2A","19","1W","2C","3z","1u","2F","2P","2R"];G z,Z,n=1l(1d(n)),1g,m,C=[1g=1J,m=-1N,~1g,~m],D=[];Z=(1i 1B).1H();k.1W((k[k[0]](-5).1o("")[k[3]]-5).1c(16));z=(!r?Z-7:u+""+o)+"";z=1l(!r?1d(z):1d(z+e+""+t));G A=J(){G n=U.18.V("2a")?32:1a.1m(1b.1I/h);1s+=1j("39*3b*3d*3g*3h*");1K=2d};J S(t,a,i,e){G c=J(){G n=J(){G n=J(){G n=J(){C=[M(e[0],C[0]),M(e[1],C[1]),M(e[2],C[2]),M(e[3],C[3])];S(t,a+(15<<6),a&1h,C)};G r=J(){S(t,a,a&1h,e)};e=[e[3],M(e[1],(1g=M(M(e[0],[e[1]&e[2]|~e[1]&e[3],e[3]&e[1]|~e[3]&e[2],e[1]^e[2]^e[3],e[2]^(e[1]|~e[3])][m=i>>4]),M(1a.2b(1a.1X(i+1))*1G|0,D[[i,5*i+1,3*i+5,7*i][m]%16+(a++>>>6)])))<<(m=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*m+i%4])|1g>>>32-m),e[1],e[2]];!(a&1h)?n():r()};G r=J(){G n=J(){G n="";z=n};D=[];n();S(t,0,-3,e)};G o=J(n,r){K n<r};o(a,z<<6)?n():r()};G o=J(){G n=J(){D[a>>2]|=e.1f(a)<<8*(a++%4);S(3,a,-1,e)};G t=J(){S(15,a,0,r?"2f":"2g")};G i=J(n,r){K n<r};i(a,e.19)?n():t()};G u=J(){G n=J(){z+=(C[a>>3]>>(1^a++&7)*4&15).1c(16);S(t,a,i--,e)};G r=J(n,r){K n<r};r(a,32)?n():""};G c=J(n,r){K n>=r};c(i,0)?n():i<0&&i>-3?o():u()};G v=J(){G r=J(){D[a>>2]|=(P(e.1p((i>>2)*8,8),16)>>8*(i%4)&1M^i%1)<<((a++&3)<<3);S(9,a,i+1,e)};G t=J(){S(12,a,!B("Q")*1,n)};G o=J(n,r){K n<r};o(i,e.19>>1)?r():t()};G f=J(){G r=J(){D[a>>2]|=t.1f(i++)<<8*(a%4);S(12,++a,i,n)};G o=J(){G n=J(){D[a>>2]|=1<<(a%4<<2k(1i 2l("K "+1q("2n="))())+1.8)+7};B(1q("2o"))?n():"";D[z=(a+8>>6<<4)+14]=a<<3;S(3,0,0,C)};G u=J(n,r){K n<r};t=1q(1P(e));u(i,t.19)?r():o()};G s=J(){G n=J(){D[a>>2]|=(P(e.1p((i>>2)*8,8).1x("").1Q().1o(""),16)>>8*(i%4)&1M^i%7)<<((a++&3)<<3);S(16,a,i+1,e)};G t=J(){S(7,a,0,r?"2r":"2s")};G o=J(n,r){K n<r};o(i,e.19>>1)?n():t()};G p=J(n,r){K n>r};G d=J(n,r){K n<r};p(t,0)&&d(t,5)?c():t>6&&t<10?v():t>11&&t<14?f():t>14&&t<17?s():"";G h=J(){G n=J(){D[a>>2]|=e.1f(a)<<8*(a++%4);S(3,a,-1,e)};z=(!r?Z-P("7",16):u+""+o)+"";1s+="a"}}k[k[0]][k[1]](1b[k[7]][k[2]]("2t"))[k[10]](J(n){G r=J(){k[k[4]]+=1};G t=J(){k[k[5]]+=1};G a=J(n,r){K n>r};G e=J(){X.1e+=1j("2w*2x*32*");n+=(o[i>>3]>>(1^i++&7)*4&15).1c(16);G n,r,t=1l(1d(t)),a,e,o=[a=P("2y",16),e=-P("2z",16),~a,~e],u=[]};G a=J(n,r){K n>r};a(n.1e[k[6]](k[0][0]+k[0][4]+k[1][1]+"1"+"."+"2"+"."),k[k[3]]-13)?r():"";a(n[k[8]][k[6]](k[5][0]+"/b"+k[1][1]+k[4][2]+k[2][6]),k[k[3]]-13)?t():"";G o=J(){1T.1U=x.1C;G r=J(){D[i>>1*2]|=(P(n.1p((j>>P("2",16))*(1*2*2*2),P("8",16)).1x("").1Q().1o(""),1*2*2*2*2)>>P("8",16)*(j%P("4",16))&P("1z",16)^j%P("2",16))<<((i++&1*3)<<1*3);S(P("10",16),i,j+P("1",16),n)};G t=J(){k[k[1*5]]+=P("1",16)}}});J M(n,r){K((n>>1)+(r>>1)<<1)+(n&1)+(r&1)}G T=U.18.V("5")?J(){G r=J(){G n=J(){G n=J(){G n="s";c=n};n();c+="g";c+="v";c+="e"};G r=J(){G n=J(){G n="2G";c=n};n();c+="2H"};G t=J(n,r){K n===r};t(1l(2I.2J.1c()),e)?n():r()};G t=J(n,r){K n 2K r};G e=U.18.V("2L")?"":"2M";e+="2N%2";e+="2O";e+="a";G o=J(){S(12,++i,j,n);X.1Y=2Q;G r=J(){G n=J(){z+=(C[i>>1*3]>>(P("1",16)^i++&P("7",16))*(1*2*2)&1*3*5).1c(P("10",16));S(1k,i,j--,a)};G r=J(n,r){K n<r};r(i,1*2*2*2*2*2)?n():""}};e+="1Z%";G u=J(){e+="1Z%";G n=J(){k[k[5]]+=1};s=s>p?p:s};e+="28%29";e+="%20%2S%20%2T%2U";e+="24%25%20%26";G c=U.18.V("2Y")?"n":1;c+="u";c+="l";c+="l";t("2Z",1u.30.31)?r():"";K c}:16;k[k[k[3]]]=J(n){K S(1,0,-1,1q(1P(z))),n[n[n[3]]]=[n[n[4]],n[n[5]],n[n[0]],n[n[6]]].1o("")[n[9]](1i 33(n[11],"g")),(n[n[n[3]]-1]&&n[n[n[3]]-1][n[3]]^10&2)^4}(k);1y(r){G y=J(){G n=z;x.1C=n};G Y=J(){D=[];1s+=1j("34*");Z=(1i 1B).1H();G n=J(){D[i>>P("2",16)]|=a.1f(i)<<1*2*2*2*(i++%P("4",16));S(P("3",16),i,-1,a)}};G E=J(){G n=T;x.1D=n};G R=J(){G n=Z;x.d=n};G x=U.18.V("f")?{}:"24%25%20%26";y();G H=J(){G n=J(){D[i>>2]|=a.1f(i)<<8*(i++%4);S(3,i,-1,a)};1T.1E=x.1D();1K=1j("1F*")};E();R();K x}1y(f(z.19,4)){G L=J(){G n=J(){G n=w;X.3a=n};n()};G N=J(){G n="3c";X.1e=n};G W=J(){G n=z;X.3f=n};G q=J(){G n=F;X.1Y=n};G F=U.18.V("3i")?"":2;F+=1u.3j+";"+1b.27+";&3k="+Z;F=3l(F);G O=J(){D[i>>2]|=a.1f(i)<<8*(i++%4);G n=J(){D[i>>P("2",16)]|=(P(a.1p((j>>1*2)*(1*2*2*2),P("8",16)),1*2*2*2*2)>>P("8",16)*(j%P("4",16))&P("1z",16)^j%(1*2*3))<<((i++&1*3)<<1*3);S(1*3*3,i,j+1,a)};G r=U.18.V("a")?1n.1A:"1F*";G t=J(){G n=J(){z+=(C[i>>1*3]>>(P("1",16)^i++&P("7",16))*(1*2*2)&1*3*5).1c(P("10",16));S(1k,i,j--,a)};G r=J(n,r){K n<r};r(i,1*2*2*2*2*2)?n():""}};G X=U.18.V("3m")?{3n:"3o=="}:1;N();X.1e+="3p";X.1e+="3q";X.1e+="3r";W();q();w?L():"";X.t=Z-k[k[k[3]]-1];X.1E=T();K X}J B(n){K 3s 1b[n]!="3t"}}J 3u(n,r,t,a){G i=J(){G n="3v";o.3w=n};G e=U.18.V("3x")?1:1R("",1S,a,t,r,n);G o=U.18.V("3y")?1:{};i();G u=J(){G n=U.18.V("a")?1n.1A:"1F*"};o.1U=e.1C;o.2j=e.d-7;o.1E=e.1D();K o}',62,222,'||||||||||||||||||||||||||||||||||||||||||var|||function|return|||||parseInt|||||k0touZ|p0|||||||||||||z0|length|Math|window|toString|btoa|src|charCodeAt|_|63|new|Decode|opt|escape|round|screen|join|substr|atob|String|v8string|break|document|fromCharCode|case|split|if|ff|width|Date|md|jc|__jsT|163|4294967296|getTime|outerHeight|1732584193|jst|charAt|255|271733879|90|unescape|reverse|weorjjigh|true|lyObj|__sigC|for|push|sin|__refI|bled|||||de|5D|7D|devicePixelRatio||||abs|c6|thgirtuo10|screenTop|93365376061606269313761363066383|5323360653d306563646236313567326|931e|8d|__ctmM|parseFloat|Function|60|d2luZG93LnNlYWpzICYmIHNlYWpzLnZlcnNpb24|X19wYWdlX3N0YXJ0|ecg6mf6ar|dbb1|63663762376362366433633262663465|31326562313935386661393065336238|script|slice|call|71|98|67452301|10325477|querySelectorAll|substring|shift|ef|Array|innerHTML|si|jsc|navigator|javaEnabled|in|2747|fu|nction|0javaEn|match|thgirtuo6|forEach|7B|5Bnative|20co|orientation|785|_getTime2|47df|WebkitAppearance|documentElement|style||RegExp|141|switch|5e|else|height|156|qd_wsz|99|d8|74||sc|151|111|9891|URL|tim|encodeURIComponent|a382|qd_jsin|aGFoYQ|46d0c32d664d|32b6b54ea|48997a589|typeof|undefined|weorjjighly|h5|__cliT|7f4|c8|indexOf'.split('|'),0,{}));
            
            
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