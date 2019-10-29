import scrapy
from pymongo import MongoClient

class JobSpider(scrapy.Spider):
   name = "jobs"

   def start_requests(self):
      url_start = 'https://stackoverflow.com/jobs?r=true&ms=Junior&mxs=MidLevel&ss=1&sort=p'
      urls = []
      urls.append(url_start)

      # only concerned with first 10 pages of results
      for i in range(2, 11):
         urls.append(url_start + '&pg=' + str(i))

      self.log(urls)

      for url in urls:
         yield scrapy.Request(url=url, callback=self.parse)

   def parse(self, response):
      client = MongoClient()
      db = client.Jobs
      collection = db.listings
      
      for row in response.css('body div.container div.snippet-hidden div.main-columns div div.js-search-results div.listResults div'):
         href = row.css('div.-job-summary div.-title h2 a::attr(href)').get()
         try:
            href = 'http://www.stackoverflow.com' + href
         except:
            href = ''

         collection.insert_one( {
            'title': row.css('div.-job-summary div.-title h2 a::text').get(),
            'href': href,
            'tags': row.css('div.-job-summary div.-tags a::text').getall(),
            'perks': self.remove_whitespace(row.css('div.-job-summary div.-perks span::text').getall())
         } )

   def remove_whitespace(self, lst):
      temp = [x.replace(" ", "") for x in lst]
      temp = [x.replace("\n", "") for x in temp]
      temp = [x.replace("\r", "") for x in temp]
      return([x.replace("|", " | ") for x in temp])
