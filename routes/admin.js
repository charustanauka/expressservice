const express = require('express');
const News = require('../models/news');
const router = express.Router();

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');
    }
    next();
});

/* GET home page. */
router.get('/', (req, res, next) => {
    const data = News.find({}, (err, data) => {
        console.log(data);

        res.render('admin/index', { title: 'Admin page', data });
    });
});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', { title: 'Add news', body: {} });
})

router.post('/news/add', (req, res) => {
    const { title, description } = req.body;

    const newsData = new News({
        title,
        description
    })

    const errors = newsData.validateSync();

    newsData.save((err) => {
        console.log(err);
    })

    res.render('admin/news-form', { title: 'Add news', errors, body: req.body });
})

router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => { })
    res.redirect('/admin');
})

module.exports = router;
