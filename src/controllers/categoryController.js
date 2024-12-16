const Category = require('../models/categoryModels');

// Create Category
const createCategory = async (request, h) => {
  try {
    const { name, description } = request.payload;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    return h.response({ message: 'Category created successfully', data: newCategory }).code(201);
  } catch (err) {
    return h.response({ message: 'Error creating category', error: err.message }).code(500);
  }
};

// Get all Categories
const getCategories = async (request, h) => {
  try {
    const categories = await Category.find();
    return h.response({ data: categories }).code(200);
  } catch (err) {
    return h.response({ message: 'Error fetching categories', error: err.message }).code(500);
  }
};

// Get Category by ID
const getCategoryById = async (request, h) => {
  try {
    const category = await Category.findById(request.params.id);
    if (!category) {
      return h.response({ message: 'Category not found' }).code(404);
    }
    return h.response({ data: category }).code(200);
  } catch (err) {
    return h.response({ message: 'Error fetching category', error: err.message }).code(500);
  }
};

// Update Category
const updateCategory = async (request, h) => {
  try {
    const category = await Category.findByIdAndUpdate(request.params.id, request.payload, { new: true });
    if (!category) {
      return h.response({ message: 'Category not found' }).code(404);
    }
    return h.response({ message: 'Category updated successfully', data: category }).code(200);
  } catch (err) {
    return h.response({ message: 'Error updating category', error: err.message }).code(500);
  }
};

// Delete Category
const deleteCategory = async (request, h) => {
  try {
    const category = await Category.findByIdAndDelete(request.params.id);
    if (!category) {
      return h.response({ message: 'Category not found' }).code(404);
    }
    return h.response({ message: 'Category deleted successfully' }).code(200);
  } catch (err) {
    return h.response({ message: 'Error deleting category', error: err.message }).code(500);
  }
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
