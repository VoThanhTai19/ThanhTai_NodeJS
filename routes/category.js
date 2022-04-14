var express = require('express');
var router = express.Router();

const categoryController = require('../components/categories/controller');

const authentication = require('../middle/authentication'); 

router.get('/', [authentication.checkLogin], async function (req, res, next) {
  const data = await categoryController.getCategories();
  res.render('categories', { categories: data }); 
});

router.post('/', [authentication.checkLogin], async function (req, res, next) {
  let { body } = req;
  await categoryController.insert(body);
  res.redirect('/danh-muc');
})

router.get('/insert', [authentication.checkLogin], async function (req, res, next){
  res.render('category_insert');
});

router.get('/:id/edit', [authentication.checkLogin], async function (req, res, next){
  const { id } = req.params;
  const category = await categoryController.getById(id);
  console.log(category);
  res.render('category', { category: category });
});


module.exports = router;