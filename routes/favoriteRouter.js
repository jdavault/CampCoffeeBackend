const express = require('express');
const Favorite = require('../models/favorites');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
  .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .populate('user')
      .populate('campsites')
      .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
      })
      .catch(err => next(err));
  })

  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          req.body.forEach(c => {
            if (!favorite.campsites.includes(c._id))
              favorite.campsites.push(c._id)
          })
          favorite.save()
            .then(favorite => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            }).catch(err => {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/plain');
              res.end(`unable to save ${err.message}`)
            })
        } else {
          Favorite.create({ user: req.user._id })
            .then(favorite => {
              req.body.forEach(fav => {
                if (!favorite.campsites.includes(fav._id)) {
                  favorite.campsites.push(fav._id)
                }
              })
              favorite.save()
                .then(favorite => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(favorite);
                })
                .catch(err => next(err));
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({ user: req.user._id })
      .then(response => {
        if (response) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
        } else {
          res.setHeader('Content-Type', 'application/plain');
          res.end('You do not have any favorites to delete.')
        }
      })
      .catch(err => next(err));
  });

favoriteRouter.route('/:campsiteId')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /partners');
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOne({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          if (!favorite.campsites.includes(req.params.campsiteId)) {
            favorite.campsites.push(req.params.campsiteId)
            favorite.save().then(favorite => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            })
          }
          else {
            res.setHeader('Content-Type', 'application/plain');
            res.end('That campsite is already in the list of favorites!')
          }
        } else {
          Favorite.create({ user: req.user._id, campsites: [req.params.campsiteId] })
            .then(favorite => {
              console.log('Partner Created ', favorite);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            })
            .catch(err => next(err));
        }
      })
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          const updatedCampsites = favorite.campsites.filter(camp => camp._id !== req.params.campsiteId)
          favorite.campsites = updatedCampsites;
          favorite.save()
            .then(favorite => {
              console.log('Partner Created ', favorite);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            }).catch(err => next(err));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end("There are no favorites to delete")
        }
      })
      .catch(err => next(err));
  });

module.exports = favoriteRouter;