# smart-contract-reader-heroku

## Prerequisites
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org) 6.9.4+
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/) 2.0.0+
- [Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

## Setup
- `$ cd <parent_directory>`
- Put `credentials.js` file here
- `$ git clone https://github.com/santiment/smart-contract-reader-heroku.git`
- `$ cd smart-contract-reader-heroku`
- `$ npm install`
- `$ gem install foreman`
- `$ heroku login`
- `$ heroku open`

## Making changes
- Make changes to the code
- `$ git add .`
- `$ git commit -m "<Commit name>"`
- `$ git push heroku master`
- `$ heroku open`

## Scaling dynos
- `$ cd <project_dir>`
- `$ heroku ps:scale web=X` where X is a number of dynos