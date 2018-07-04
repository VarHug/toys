import scrapy, re, io, sys
# 改变默认输出编码
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')
from douban.items import DoubanItem

class DoubanSpider(scrapy.Spider):
  # 爬虫名
  name = 'douban_spider'
  # 允许的域名
  allowed_domains = ["movie.douban.com"]
  # 入口的url
  start_urls = [
      "https://movie.douban.com/top250"
  ]

  # 默认解析方法
  def parse(self, response):
    print(response.request.headers['User-Agent'])
    # 当前页数据
    movie_list = response.xpath("//div[@class='article']//ol[@class='grid_view']/li")

    for movie in movie_list:
      douban_item = DoubanItem()
      # 电影序号
      douban_item['serial_number'] = movie.xpath(".//div[@class='item']//em/text()").extract_first()

      # 电影中文名
      douban_item['movie_name_main'] = movie.xpath(".//div[@class='info']/div[@class='hd']/a/span[@class='title'][1]/text()").extract_first()

      # 电影英文名
      movie_name_sub = movie.xpath(".//div[@class='info']/div[@class='hd']/a/span[@class='title'][2]/text()").extract_first()
      if movie_name_sub:
        douban_item['movie_name_sub'] = re.sub(r'\xa0/\xa0', '', movie_name_sub)
      else:
        douban_item['movie_name_sub'] = ''

      # 电影其他名称
      movie_name_other = movie.xpath(".//div[@class='info']/div[@class='hd']/a/span[@class='other']/text()").extract_first()
      if movie_name_other:
        douban_item['movie_name_other'] = re.sub(r'\xa0/\xa0', '', movie_name_other)
      else:
        douban_item['movie_name_other'] = ''
      
      # 电影介绍信息
      content = movie.xpath(".//div[@class='info']/div[@class='bd']/p[1]/text()").extract()
      actor = content[0].strip()
      douban_item['actor'] = re.sub(r'\xa0', '', actor)
      date = content[1].strip()
      douban_item['date'] = re.sub(r'\xa0', '', date)

      # 电影星级
      douban_item['star'] = movie.xpath(".//div[@class='info']/div[@class='bd']/div[@class='star']/span[@class='rating_num']/text()").extract_first()

      # 电影评论数
      rate_num = movie.xpath(".//div[@class='info']/div[@class='bd']/div[@class='star']/span[4]/text()").extract_first()
      douban_item['rate_num'] = re.sub(r'\D', '', rate_num)

      # 电影描述
      douban_item['desc'] = movie.xpath(".//div[@class='info']/div[@class='bd']/p[@class='quote']/span/text()").extract_first()

      yield douban_item

    # 解析下一页
    next_link = response.xpath("//div[@class='article']/div[@class='paginator']/span[@class='next']/link/@href").extract()
    if next_link:
      next_link = next_link[0]
      yield scrapy.Request('https://movie.douban.com/top250' + next_link, callback=self.parse)

# scrapy crawl douban_spider

