const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/hikes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const hikeSchema = new mongoose.Schema({
  hikeName: String,
  rating: String,
  length: String,
  time: String,
  destination: String,
  path: String,
  reviews: [String],
});

const Hike = mongoose.model('Hike', hikeSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if(!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: '/images/' + req.file.filename
  });
});



app.post('/api/hikes', async (req, res) => {
  const hike = new Hike({
    hikeName: req.body.hikeName,
    rating: req.body.rating,
    length:req.body.length,
    time: req.body.time,
    destination: req.body.destination,
    path: req.body.path,
    reviews: req.body.reviews,
  });
  try {
    await hike.save();
    res.send(hike);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/hikes', async (req, res) => {
  try {
    let hikes = await Hike.find();
    res.send(hikes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/hikes/:id', async(req,res) => {
  try {
    await Hike.deleteOne({"_id": req.params.id});
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/hikes/:id', async(req,res) => {
  try {
    await Hike.findOneAndUpdate(
      {"_id":req.params.id},
      {$set: {
        "hikeName": req.body.hikeName,
        "rating": req.body.rating,
        "length":req.body.length,
        "time": req.body.time,
        "destination": req.body.destination,
        "path": req.body.path,
        "reviews": req.body.reviews,
      }});
      res.sendStatus(200);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});




const reviewSchema = new mongoose.Schema({
  hikeName: String,
  userName: String,
  text: String,
});

const Review = mongoose.model('Review', reviewSchema);




app.post('/api/reviews', async (req, res) => {
  const review = new Review({
    hikeName: req.body.hikeName,
    userName: req.body.userName,
    text:req.body.text,
  });
  try {
    await review.save();
    res.send(review);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    let reviews = await Review.find();
    res.send(reviews);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/reviews/:id', async(req,res) => {
  try {
    await Review.deleteOne({"_id": req.params.id});
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/reviews/:id', async(req,res) => {
  try {
    await Review.findOneAndUpdate(
      {"_id":req.params.id},
      {$set: {
        "hikeName": req.body.hikeName,
        "userName": req.body.userName,
        "text":req.body.text,

      }});
      res.sendStatus(200);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3001, () => console.log('Server listening on port 3001!'));
