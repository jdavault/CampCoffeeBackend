const express = require('express');
const CoffeeType = require('../models/coffeeType');
const authenticate = require('../authenticate');
const cors = require('./cors');

const coffeeTypeRouter = express.Router();

coffeeTypeRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    CoffeeType.find()
      .then(coffeeTypes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(coffeeTypes);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    CoffeeType.create(req.body)
      .then(coffeeType => {
        console.log('CoffeeType Created ', coffeeType);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(coffeeType);
      })
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /coffeeTypes');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    CoffeeType.deleteMany()
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

coffeeTypeRouter.route('/:coffeeTypeId')
  .options(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    CoffeeType.findById(req.params.coffeeTypeId)
      .then(coffeeType => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(coffeeType);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /coffeeTypes/${req.params.coffeeTypeId}`);
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    CoffeeType.findByIdAndUpdate(req.params.coffeeTypeId, {
      $set: req.body
    }, { new: true })
      .then(coffeeType => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(coffeeType);
      })
      .catch(err => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    CoffeeType.findByIdAndDelete(req.params.coffeeTypeId)
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

module.exports = coffeeTypeRouter;