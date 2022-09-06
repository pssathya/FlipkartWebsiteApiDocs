let express = require('express');
let app = express();
let morgan = require('morgan');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 7800;
let cors = require('cors');
let bodyParser = require('body-parser');
let DbName = process.env.DbName;
const db=require('./db');

app.use(morgan('common'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const AuthController = require('./controller/authController');
app.use('/api/auth',AuthController);

app.get('/', (req, res) => {
    res.send("Hii from Express - Flipkart Website");
});

MongoClient.connect(mongoUri, (err, client) => {
    if (err) {
        console.log("Error While Connecting");
    }
    else {
        db = client.db(DbName);
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    }
});

app.get('/products', (req, res) => {
    db.collection('ColFlipkart').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});