const express = require('express');
const LearnMoreDataAccess = require('../models/learnMoreData');
const authenticate = require('../authenticate');
const cors = require('./cors');

const learnMoreDataRouter = express.Router();

learnMoreDataRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    LearnMoreDataAccess.find()
      .then(learnMoreDatas => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(learnMoreDatas);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    LearnMoreDataAccess.create(req.body)
      .then(learnMoreData => {
        console.log('LearnMoreData Created ', learnMoreData);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(learnMoreData);
      })
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /learnMoreDatas');
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    LearnMoreDataAccess.deleteMany()
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

learnMoreDataRouter.route('/:learnMoreDataId')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    LearnMoreDataAccess.findById(req.params.learnMoreDataId)
      .then(learnMoreData => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(learnMoreData);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /learnMoreDatas/${req.params.learnMoreDataId}`);
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    LearnMoreDataAccess.findByIdAndUpdate(req.params.learnMoreDataId, {
      $set: req.body
    }, { new: true })
      .then(learnMoreData => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(learnMoreData);
      })
      .catch(err => next(err));
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    LearnMoreDataAccess.findByIdAndDelete(req.params.learnMoreDataId)
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

module.exports = learnMoreDataRouter;