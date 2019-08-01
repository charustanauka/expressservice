const express = require('express');
const router = express.Router();
const News = require('../models/news');


/* GET home page. */
router.get('/', (req, res, next) => {

    const search = req.query.search || '';
    let sort = req.query.sort || -1;

    if (sort !== -1 || sort !== 1) {
        sort = -1;
    }

    const findNews = News
        .find({ title: new RegExp(search, 'i') })
        .sort({ created: sort })
        .select('_id, title, description');

    findNews.exec((err, data) => {
        res.json(data);
    })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    const findNews = News
        .findById(id);

    findNews.exec((err, data) => {
        res.json(data);
    })
});

module.exports = router;
