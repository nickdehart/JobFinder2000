import scrapy
import re
import requests
from datetime import datetime
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
            jobId = href.split('/')[-2]
         except:
            href = ''
            jobId = ''

         previous = collection.find_one({'jobId': jobId})

         if jobId and not previous:
            try:
               res = requests.get('https://stackoverflow.com/jobs/apply/' + jobId)
            except Exception as e:
               self.log(e)

            try:
               collection.insert_one( {
                  'jobId': jobId,
                  'title': row.css('div.-job-summary div.-title h2 a::text').get(),
                  'href': href,
                  'tags': row.css('div.-job-summary div.-tags a::text').getall(),
                  'perks': self.remove_whitespace(row.css('div.-job-summary div.-perks span::text').getall()),
                  'timestamp': datetime.now(),
                  'applied': False,
                  'external': True if res.status_code == 404 else False
               } )
            except Exception as e:
               self.log(e)

   def remove_whitespace(self, lst):
      temp = [x.replace(" ", "") for x in lst]
      temp = [x.replace("\n", "") for x in temp]
      temp = [x.replace("\r", "") for x in temp]
      return([x.replace("|", " | ") for x in temp])

   def check_tags(self, tags):
      my_tags = [
         "python",                          
         "django",                          
         "python3",                         
         "data-science",                    
         "machine-learning",                
         "javascript",                      
         "reactjs",                         
         "angular",                         
         "node.js",                         
         "redux",                           
         "objective-c",                     
         "swift",                           
         "xcode",                           
         "typescript",                      
         "vue.js",                          
         "c++",                             
         "bigdata",                         
         "data-ingestion",                  
         "elasticsearch",                   
         "c",                               
         "analytics",                       
         "react",                           
         "opencv",                          
         "angularjs",                       
         "next.js",                         
         "ember.js",                        
         "nodejs",                          
         "pandas",   
      ]
         
      return any(x in my_tags for x in tags )

   def check_salary(self, perks):
      matches = []
      for perk in perks:
         matches.extend(re.findall('\d{2,3}', perk))
      return True if (all(int(x) > 50 for x in matches)) else False

