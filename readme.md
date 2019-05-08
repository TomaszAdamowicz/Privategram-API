# Privategram REST API 1.0.0

Api for private instagram. Initialy made when my son was born, to share his pictures with closest friends and family members without exposing them to sociall aps like facebook, instargram etc.

Project is still in development. 

## Getting Started

To run the API locally, you need mongoDB (https://www.mongodb.com/) and node.js and NPM installed (https://nodejs.org/en/download/package-manager/)

In ``` settings/mongoDB.js ``` you need to fill mongoDB credentials
In ``` settings/jwt.js ``` you set JWT secret
In ``` settings/hostUrl.js ``` you set url needed to create paths to files you will be adding to database.

```
git clone 
cd Privategram API
npm start

```
## Built With

* [express](https://expressjs.com/)
* [bcrypt](https://www.npmjs.com/package/bcrypt) 
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [jimp](https://www.npmjs.com/package/jimp)
* [multer](https://www.npmjs.com/package/multer)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Tomasz Adamowicz** - *Initial work* - (https://github.com/TomaszAdamowicz)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

