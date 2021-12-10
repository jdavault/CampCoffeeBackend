const express = require('express');
const CoffeeCategoryAccess = require('../models/coffeeCategory');
const authenticate = require('../authenticate');
const cors = require('./cors');

const coffeeCategoryRouter = express.Router();

coffeeCategoryRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    CoffeeCategoryAccess.find()
      .then(coffeeCategorys => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(coffeeCategorys);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    CoffeeCategoryAccess.create(req.body)
      .then(coffeeCategory => {
        console.log('CoffeeCategory Created ', coffeeCategory);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(coffeeCategory);
      })
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /coffeeCategorys');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    CoffeeCategoryAccess.deleteMany()
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

coffeeCategoryRouter.route('/:coffeeCategoryId')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    CoffeeCategoryAccess.findById(req.params.coffeeCategoryId)
      .then(coffeeCategory => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(coffeeCategory);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /coffeeCategorys/${req.params.coffeeCategoryId}`);
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    CoffeeCategoryAccess.findByIdAndUpdate(req.params.coffeeCategoryId, {
      $set: req.body
    }, { new: true })
      .then(coffeeCategory => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(coffeeCategory);
      })
      .catch(err => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    CoffeeCategoryAccess.findByIdAndDelete(req.params.coffeeCategoryId)
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

module.exports = coffeeCategoryRouter;