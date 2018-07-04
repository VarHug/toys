# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
from douban.settings import mongo_host, mongo_port, mongo_db_name, mongo_db_collection

class DoubanPipeline(object):
    def __init__(self):
        host = mongo_host
        port = mongo_port
        dbName = mongo_db_name
        collectionName = mongo_db_collection
        client = pymongo.MongoClient(host=host, port=port)
        database = client[dbName]
        self.post = database[collectionName]

    def process_item(self, item, spider):
        # item: yield douban_item
        data = dict(item)
        self.post.insert(data)
        return item
