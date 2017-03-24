'use strict';

const { camelizeKeys, decamelizeKeys } = require('humps');
const boom = require('boom');
const knex = require('../../knex');
const router = require('express').Router();

router.get('/:id', (req, res, next) => {
  console.log('inside of /users');
  const id = req.params.id;
  console.log(id);

  knex('users')
    .where('id', id)
    .first()
    .then((user) => {
      if (!user) {
        throw boom.create(404, 'No user found');
      }

      res.send(camelizeKeys(user));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;