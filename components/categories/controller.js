
const categoryService = require('./service');

exports.getCategories = async () => {
    const data = await categoryService.getCategories();
    return data;
}

exports.getById = async (id) => {
    let category = await categoryService.getById(id);
    category = {
        _id: category._id,
        name: category.name,
        description: category.description
    }
    return category;
}

exports.insert = async (body) => {
    await categoryService.insert(body);
}

exports.update = async (id, category) => {
    await categoryService.update(id, category);
}

exports.delete = async (id) => {
    await categoryService.delete(id);
}
