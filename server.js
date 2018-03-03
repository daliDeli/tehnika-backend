//https://mysterious-crag-26867.herokuapp.com/ | https://git.heroku.com/mysterious-crag-26867.git

var express = require("express"),
path = require('path'),
formidable = require('formidable'),
fs = require('fs'),
multer = require('multer'),
bodyParser = require('body-parser'),
mysql = require('mysql'),
slug = require('slug'),
app = express();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var Storage = multer.diskStorage({
   destination: function (req, file, callback) {
       callback(null, "../frontend/public/assets/img/upload");
   },
   filename: function (req, file, callback) {
       callback(null, Date.now() + file.originalname);
   }
});
var upload = multer({ storage: Storage }).array("files", 3);

 var db = mysql.createConnection({
  host: "5.9.14.30",
  user: "carsijat_user",
  password: "dado_carsija_123",
  database: "carsijat_db"
});

// var db = mysql.createConnection({
//    host: "localhost",
//    user: "dalibor",
//    password: "dado",
//    database: "tehnikatestdb"
//  });

// var db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "tehnikatestDb"
//   });

// headers- omogucava CORS
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header(
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept"
   );
   next();
});

// get metode 

/*
   forma za testiranje
*/
app.get('/upload', (req, res)=> {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
   res.write('<input type="file" name="files"><br>');
   res.write('<input type="text" name="id"><br>');    
   res.write('<input type="submit">');
   res.write('</form>');
   return res.end();
});
// vraca sve kategorije ako ne prosledis parametar 
// parametri: category => id kategorije
app.get("/api/products",(req,res)=>{
   // console.log(req.query.category);
   // return res.end(req.query);
   var queryString = '';
   if(req.query.category == undefined){
       queryString = "SELECT * FROM tehnikaall";
   }else{
       queryString = `SELECT * FROM tehnikaAll where kategorije_id = ${req.query.category}`   ;        
   }
   // return res.end(queryString);
   db.query(queryString, (error, rows, fields)=>{
       if(error){
           res.status(400);
           return res.send(error.message);
       }else{           
           return res.send(JSON.stringify(rows));
       }
   });   
   //return res.end(req.query.category);
});
// vraca sve kategorije
app.get('/api/category', (req, res)=> {
   db.query("select * from kategorije", (error, rows, fields) => {
       if(!error){                        
           res.send(rows);
           return res.end();
       }
       res.status(400);
       return res.end(error.message);
   });
});
// vraca proizvod sa odredjenim id-em
app.get('/api/product/single', (req, res) => {
   db.query("SELECT * FROM tehnikaAll where id = " + req.query.id + " ", (error, rows, fileds) => {
       res.send(rows[0]);
   });
});
// post medote


//kreira proizvod
app.post('/api/product/create', (req, res) => {
   console.log(`${req.body.files}`);
   // return res.end();    
   db.query(`insert into proizvodi (naziv, opis, cijena, kategorije_id, slug, slika) 
   values ('${req.body.naziv}' , '${req.body.opis}' , '${req.body.cijena}' , ${req.body.kategorija},
    '${slug(req.body.naziv)}', '` + req.body.files + `')`,
(error, rows, fields) => {
   if(error){
       res.status(400);
       console.log(error.message);            
       return res.end("error");
   }   
   return res.end("success");
});
});
// uploduje fajl u folder images (ako nema napraviti rucno) i upipsuje u bazu
// potrebno proslijediti i id artikla na koji se slika odnosi
// preporucujem da pogledas dropzone.js
app.post('/api/fileupload', (req, res) => {
   var path = '';
   upload(req, res, function (err) {      
       return res.send(req.files);
   });
});

// kreira kategoriju
app.post('/api/category/create', (req, res) => {
   db.query(`insert into kategorije (naziv, slug) values ('${req.body.naziv}', '${slug(req.body.naziv)}')`,
   (error, rows, fields) => {
       if(error){
           res.status(400);
           return res.end(error.message);
       }
       return res.end("success");
   });
});

// delete
// kategorije
app.delete('/api/category/delete/:categoryID', (req, res) => {
   // return res.end(req.body.id);??
   db.query(`delete from kategorije where id = ${req.params.categoryID}`, (error, rows, fields) => {
       if(error){
           res.status(400);
           return res.end(error.message);
       }
       return res.end('success');
   });
});

// proizvodi
app.post('/api/products/delete', (req, res) => {
   console.log(req.body.productID);
   db.query(`delete from proizvodi where id= ${req.body.productID}`, (error, rows, fields) => {
       if(error){
           res.status(400);
           return res.end(error.message);
       }

       return res.end('success');
   });
});
// brisanje svih proizvoda i kategorije na osnovu id kategorije
app.delete('api/categories/with-products/delete/:categoryID', (req, res) => {
   db.query(`delete from proizvodi where kategorije_id = ${req.params.categoryID}`, (error, rows, fields) => {
       if(error) {
           return res.end(error.body);
       }
       db.query(`delete from kategorije where id = ${req.params.categoryID}`, (error, rows, fields) => {
           if(error){
               res.status(400);
               return res.end(error.message);
           }
           return res.end('success');
       });
   });
});

// update

//proizvoda 
app.put('/api/products/update', (req, res) => {

  db.query(`update proizvodi set naziv = '${req.body.naziv}', opis = '${req.body.opis}', cijena = '${req.body.cijena}',
   kategorije_id = ${req.body.kategorija}, slug = '${slug(req.body.naziv)}' where id = ${req.body.id}`,
   (error, rows, fields) => {
       if(error) {
           res.status(400);
           return res.end(error.message);
       }
       return res.end('success');
   }); 
}); 

// kategorija 
app.put('/api/category/update', (req, res) => {
   db.query(`update kategorije set naziv = '${req.body.naziv}', slug = '${slug(req.body.naziv)}' where id = ${req.body.naziv}`,
       (error, rows, fields)=>{
           if(error){
               res.status(400);
               return res.end(error.message);
           }
           return res.end('success');
       });
});

//Heroku promjene 1. dynamic port binding
const PORT = process.env.PORT || 3300;

app.listen(PORT);