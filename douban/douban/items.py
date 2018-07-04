# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class DoubanItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    # 电影序号
    serial_number = scrapy.Field()
    # 电影名称
    movie_name_main = scrapy.Field()
    movie_name_sub = scrapy.Field()
    movie_name_other = scrapy.Field()
    # 电影介绍
    actor = scrapy.Field()
    date = scrapy.Field()
    # 电影星级
    star = scrapy.Field()
    # 电影评论数
    rate_num = scrapy.Field()
    # 电影描述
    desc = scrapy.Field()
