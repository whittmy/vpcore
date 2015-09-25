from tornado_fetcher34 import Fetcher
import time

# create a fetcher
fetcher=Fetcher(
  user_agent='phantomjs', # user agent
  phantomjs_proxy='http://localhost:12306', # phantomjs url
  pool_size=100, # max httpclient num
  async=False,
  has_body=False,
  has_head=False
  )
# fetch html after rendering javascript from url
# tm = str(time.time())
# rt = fetcher.phantomjs_fetch("http://127.0.0.1/iqiyi.html", js_url='http://127.0.0.1/iqiyi.js', js_url_callback='function() { var l = window.weorjjigh("347655300");  return writeObj(l);}')
rt = fetcher.phantomjs_fetch("./module/iqiyi/iqiyi.html", js_url="./iqiyi.js", js_url_callback='function() { var l = window.weorjjigh("347655300");  return writeObj(l);}')
print(rt)
# or execute additional javascript after rendering end, which must be a function
# fetcher.phantomjs_fetch(url, js_script='setTimeout("function(){window.scrollTo(0,100000)}", 1000)')
