const express = require('express');
const DiscoverCoffeeData = require('../models/discoverCoffeeData');
const authenticate = require('../authenticate');
const cors = require('./cors');

const discoverCoffeeDataRouter = express.Router();

discoverCoffeeDataRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    DiscoverCoffeeData.find()
      .then(discoverCoffeeDatas => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(discoverCoffeeDatas);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    DiscoverCoffeeData.create(req.body)
      .then(discoverCoffeeData => {
        console.log('DiscoverCoffeeData Created ', discoverCoffeeData);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(discoverCoffeeData);
      })
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /discoverCoffeeDatas');
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    DiscoverCoffeeData.deleteMany()
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

discoverCoffeeDataRouter.route('/:discoverCoffeeDataId')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    DiscoverCoffeeData.findById(req.params.discoverCoffeeDataId)
      .then(discoverCoffeeData => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(discoverCoffeeData);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /discoverCoffeeDatas/${req.params.discoverCoffeeDataId}`);
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    DiscoverCoffeeData.findByIdAndUpdate(req.params.discoverCoffeeDataId, {
      $set: req.body
    }, { new: true })
      .then(discoverCoffeeData => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(discoverCoffeeData);
      })
      .catch(err => next(err));
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    DiscoverCoffeeData.findByIdAndDelete(req.params.discoverCoffeeDataId)
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

module.exports = discoverCoffeeDataRouter;