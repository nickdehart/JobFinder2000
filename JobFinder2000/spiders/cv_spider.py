import scrapy
from string import Template
from pymongo import MongoClient

class CVSpider(scrapy.Spider):
   name = "cover_letter"

   def start_requests(self):

      self.client = MongoClient()
      self.db = self.client.Jobs
      self.collection = self.db.listings
      urls = []

      for job in self.collection.find({'href': {'$ne': ''}, 'cv': {'$exists': False}}):
         urls.append(job['href'])

      for url in urls:
         yield scrapy.Request(url=url, callback=self.parse)


   def parse(self, response):

      about = {}
      remote = {}
      description = {}
      company = response.css('body div.container div.snippet-hidden header.job-details--header div.grid--cell div a::text').get()
      position = response.css('body div.container div.snippet-hidden header.job-details--header div.grid--cell h1 a::text').get()

      for section in response.css('body div.container div.snippet-hidden div.main-columns div.job-details--content div.nav-content section'):
         try:
            section_name = section.css('h2::text').get()
         except Exception as e:
            return
         if 'About' in section_name:
            about = self.about_section(section)
         if 'Remote' in section_name:
            remote = self.remote_section(section)
         if 'Job description' in section_name:
            description = self.description_section(section)

      cv = self.generate_cv(description, company, position)

      self.collection.update_one( { 'jobId': response.url.split('/')[-2] }, {
         '$set': {
            'about': about,
            'remote': remote,
            'description': description,
            'cv': cv
         }
      } )

   def about_section(self, section):
      about = {}
      for column in section.css('div.job-details--about div'):
         for row in column.css('div.mb8'):
            vals = row.css('span::text').getall()
            about[vals[0].replace(':', '').replace(' ', '_').strip('_')] = vals[1]

      return about

   def remote_section(self, section):
      remote = {}
      for column in section.css('div.job-details--about div div.mb8'):
         vals = column.css('span::text').getall()
         remote[vals[0].replace(':', '').replace(' ', '_').strip('_')] = vals[1]

      return remote

   def description_section(self, section):
      desc = {}
      headings = section.css('div p strong::text').getall()
      desc['descriptions'] = section.css('div p::text').getall()

      ul_tags = section.css('div ul')
      num_lists = len(ul_tags)
      headings = headings[(len(headings) - num_lists):]

      for index, ul in enumerate(ul_tags):
         try:
            heading = headings[index].lower()
         except:
            heading = 'heading' + str(index)
         if 'respons' in heading:
            heading = 'responsibilities'
         elif 'require' in heading or 'qualific' in heading:
            heading = 'requirements'

         desc[heading] = ul.css('li::text').getall()

      return desc

   def generate_cv(self, desc, company, position):
      cv_begin = Template("Dear $company,\n\n" +
         "I was thrilled to see your listing for a $position. I’m mostly a Python and Javascript\n" +
         "developer with a few years of experience providing solutions to clients ranging from simple\n" +
         "front-ends to more in-depth technological upgrades and full stack overhauls. I’d love to put\n" +
         "my skills to work for your organization.\n\n" +
         "In reference to your requirements in the job description, I have:\n")
      
      cv_begin = cv_begin.substitute(company=company, position=position)

      cv_middle = ""
      if 'requirements' in desc:
         for bullet in desc['requirements']:
            cv_middle += "- " + bullet + "\n"
         
      cv_end = ("\nI’d appreciate the opportunity to discuss the position and your needs for the role. Please\n" + 
         "contact me at your convenience and let me know how I can help you.\n\nBest,\nNicholas DeHart")

      return cv_begin + cv_middle + cv_end
