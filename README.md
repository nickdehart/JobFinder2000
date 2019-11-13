# Job Finder 2000

Several small projects in one repository.

- A scrapy project to crawl StackOverflow.com/jobs and get relevent information on openings, then store it in MongoDB.
- A React frontend to see what is new and view the data on what I have already applied to compared to what is still available.
- A Node.js server to retrieve data from MongoDB.

![alt text](./example.gif)

The frontend was created with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `scrapy crawl jobs`
then
### `scrapy crawl cover_letter`
to get data.

or

### `cd ui/`
### `yarn dev`

Runs the frontend app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`
Runs the Jest testing suite for the React components.<br>
