let express = require('express');
let app = express();
let morgan = require('morgan');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = "mongodb+srv://flipkartwebsite:flipkartwebsite123@cluster0.w4byv.mongodb.net/?retryWrites=true&w=majority";
let db;

app.use(morgan('common'))
app.get('/',(req,res)=>{
    res.send("Response from flipkartwebsite");

})

app.get('/collectiontype',(req,res)=>{
    db.collection('collectionCategory').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/brandlist',(req,res)=>{
    db.collection('brand').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/imagecollection',(req,res)=>{
    let query = {}
    let collectionId = Number(req.query.collectionId);
    let brandId = Number(req.query.brandId);
    let discountId = Number(req.query.discountId)
    if(collectionId){
        query = {collectionCategory_id:collectionId}
    }else if(brandId){
        query = {brand_id:brandId}
    }else if(discountId){
        query = {discount_id:discountId}
    }else{
        query = {}
    }
    db.collection('imageCollection').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/products',(req,res)=>{
    let query = {}
    let brandId = Number(req.query.brandId);
    if(brandId){
        query = {"brands.brand_id":brandId}
    }else{
        query = {}
    }
    db.collection('product').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


app.get('/filter/:brandId',(req,res) => {
    let query = {}
    let brandId = Number(req.params.brandId);
    let sizeId = Number(req.query.sizeId);
    let genderId = Number(req.query.genderId);
    let occasionId = Number(req.query.occasionId);
    if(sizeId && genderId && occasionId){
        query = {
            "brands.brand_id":brandId,
            size_id:sizeId,
            occasion_Id:occasionId,
            gender_id:genderId
        }
    }
    else if(sizeId){
        query = {
            "brands.brand_id":brandId,
             size_id:sizeId
        }
    }else if(genderId){
        query = {
            "brands.brand_id":brandId,
            gender_id:genderId
        }
    }else if(ocationId){
        query = {
            "brands.brand_id":brandId,
            occasion_Id:occasionId
        }
    } else{
        query = {
            "brands.brand_id":brandId,
        }
    }
    db.collection('product').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })

})

app.get('/details/:id',(req,res)=>{
    let id = Number(req.params.id);
    db.collection('product').find({product_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

MongoClient.connect(mongoUrl, (err,client)=> {
     if(err){console.log("Error While Connecting")}
     else{
         db = client.db('flipkartWebsite');
         app.listen(port, ()=> {
             console.log(`Listening on port ${port}`)
         })
     }
})
