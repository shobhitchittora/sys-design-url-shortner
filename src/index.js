const express = require('express');
const Url = require('url');
const Joi = require('joi');
const App = express();
const Store = require('./store');
const md5 = require('md5');

App.set('PORT', process.env.PORT || 8080);

const schema = Joi.object().keys({
  url: Joi.string().required(),
});

App.get('/api/shorten', function (req, res) {
  const parsedURL = Url.parse(req.url, true);

  if (Joi.validate(parsedURL.query, schema).error === null) {
    const { url } = parsedURL.query;
    const hash = md5(url);
    Store.add(url, hash);
    res.json({ shortUrl: url, hash });
  } else {
    res.send("Invalid or no url param passed");
  }

});

App.get('/api/:hash', function (req, res) {
  if (req.params.hash) {
    const { value, error } = Store.find(req.params.hash);
    if (error) {
      res.send(error)

    } else {
      res.redirect(value)
    }
  }
});

App.listen(App.get('PORT'), function () {
  console.log(`Server running on ${App.get('PORT')}`);
});
