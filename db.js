let dotenv = require('dotenv');
dotenv.config();
let mongoUri = process.env.MongoLiveUri;
let mongoose = require('mongoose');
mongoose.connect(mongoUri);