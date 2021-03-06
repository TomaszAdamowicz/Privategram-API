# Privategram REST API 1.0.0

Api for private instagram. I've made it, when my son was born, to share his pictures with closest friends and family members without exposing them to social aps like facebook, instargram etc.

Project is still in development. 

## Getting Started

To run the API locally, you need mongoDB (https://www.mongodb.com/) and node.js and NPM installed (https://nodejs.org/en/download/package-manager/)

Declare variables for cors url, JWT Token secret and mongoDB connection in ```.env``` file.

```
git clone https://github.com/TomaszAdamowicz/Privategram-API.git
npm i
npm start

```
## Built With

* [express](https://expressjs.com/)
* [bcrypt](https://www.npmjs.com/package/bcrypt) 
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [jimp](https://www.npmjs.com/package/jimp)
* [multer](https://www.npmjs.com/package/multer)

## Authors

* **Tomasz Adamowicz** - *Initial work* - (https://github.com/TomaszAdamowicz)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
