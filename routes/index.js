var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */

router.get('/articles', (req,res,next)=>{
  Article.findAll()
  .then( results => {
    res.set('Content-Type', 'application/json')
    res.json(results)
  })
  .catch(next);


})

router.get('/articles/:id', (req,res,next)=>{
  Article.findOne({
    where: { id: req.params.id }
  })
  .then (found => {
    if(found){
      res.json(found);
    }else{
      res.sendStatus(404);
    }
  })
  .catch(next);
})

router.post('/articles', (req,res,next)=>{
  Article.create({
    title: req.body.title,
    content: req.body.content
  })
  .then( (article)=> {
    res.send({ message: 'Created successfully', article })
  })
  .catch(next)
})

router.put('/articles/:id', (req,res,next)=>{
  Article.findById(req.params.id)
  .then( found=> {
    found.title = req.body.title;
    return found.save()
  })
  .then( foundSaved => {
    var obj ={
      message: 'Updated successfully',
      article: foundSaved
    }
    res.send(obj)
  })
  .catch(next)
})

router.use((err,req,res,next)=>{
  res.sendStatus(500).send(err.message);
})

module.exports = router;
