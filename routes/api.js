var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');
const productController = require('../components/products/controller');
const jwt = require('jsonwebtoken');
const authentication = require('../middle/authentication');


/**
 * page: login
 * http://localhost:3000/api/register
 * method: post
 */
router.post('/register', async function (req, res, next) {
    // xử lý login
    // đọc email, password từ body
    const { email, password, confirm_password } = req.body;
    // kiểm tra email, password
    const result = await userController.register(email, password, confirm_password);
    if (result) {
        res.json({ status: true })
    } else {
        // nếu sai: vẫn ở trang login
        res.json({ status: false })
    }
});


/**
 * page: login
 * http://localhost:3000/dang-nhap
 * method: post
 */
router.post('/login', async function (req, res, next) {
    const { email, password } = req.body;
    const result = await userController.login(email, password);
    if (result) {
        const token = jwt.sign({ _id: result._id, email: result.email }, 'myKey');
        res.json({ status: true, result, token })
    } else {
        // nếu sai: vẫn ở trang login
        res.json({ status: false })
    }
});



/**
* page: product
* http://localhost:3000/san-pham
* method: get
* detail: get list products
* author: Chấn Nguyễn
* date: 17th March 2022 11:05
*/
router.get('/api/products', [authentication.checkToken], async function (req, res, next) {
    // lấy danh sách sản phẩm
    const products = await productController.getProducts();
    res.json(products);
})

router.get('/api/products/:id/detail', [authentication.checkToken], async function (req, res, next) {
    // lấy danh sách sản phẩm
    const { id } = req.params;
    const product = await productController.getById(id);
    res.json(product);
})



module.exports = router;