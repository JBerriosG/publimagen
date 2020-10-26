const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productsRoutes = require('./products/products.routes');


//Middlewares
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
const app = express();
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

//CORS
app.use(cors());


//init routes
const router = express.Router();
app.use('/api', router);
productsRoutes(router);



app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => console.log(`Server is running on ${app.get('port')}`));