/**
 * controller: xử lý data, trung gian gọi vào service
 */

const productService = require('./service');

const date = require('../../utils/date');

exports.getProducts = async () => {
    let data = await productService.getProducts();
    data = data.map(item => {
        item = {_id: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                description: item.description,
                category_id: item.category_id,
                released: date.format(item.released)}
        return item;
    })
    return data;
}

exports.getById = async (id) => {
    let product = await productService.getById(id);
    product = {_id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        description: product.description,
        category_id: product.category_id,
        released: date.format(product.released)}
    return product;
}

exports.insert = async (body) => {
    await productService.insert(body);             
}

exports.delete = async (id) => {
    await productService.delete(id);
}

exports.update = async (id, product) => {
    await productService.update(id, product);
}