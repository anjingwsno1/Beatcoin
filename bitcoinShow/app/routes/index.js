var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user.controller.js');
var history_controller = require('../controllers/history.controller.js');
var newsCrawler_controller = require('../controllers/newsCrawler.controller.js');
var currency_controller = require('../controllers/currency.controller.js');

/* GET home page. */
router.get('/', newsCrawler_controller.bug);
router.get('/profile', user_controller.get);



router.get('/currency', currency_controller.initial);
router.get('/history', history_controller.update);
router.get('/prediction', history_controller.predict);
module.exports = router;
router.post('/signup', user_controller.signUp);
router.post('/login', user_controller.login);
router.post('/edit', user_controller.edit);
router.get('/logout', user_controller.logout);
router.get('/newsCrawler', newsCrawler_controller.bug);
