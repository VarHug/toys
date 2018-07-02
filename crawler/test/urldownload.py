import urllib.request
import http.cookiejar
url = 'https://baike.baidu.com/item/Python/407313?fr=aladdin'
print('第一种方法')
response1 = urllib.request.urlopen(url)
print(response1.read())

print('第二种方法')
request = urllib.request.Request(url, data=b'some data')
request.add_header('user-agent', 'Mozilla/5.0')
response2 = urllib.request.urlopen(request)
print(response2.read())

print('第三种方法')
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
urllib.request.install_opener(opener)
response3 = urllib.request.urlopen(url)
print(cj)
print(response3.read())
