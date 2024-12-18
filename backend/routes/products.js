const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// @route   GET /api/products
// @desc    Get all products with filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error('Get Products Error:', err.message);
    res.status(500).json({ 
      message: 'Server error while fetching products',
      error: err.message 
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Get Product Error:', err.message);
    res.status(500).json({ 
      message: 'Server error while fetching product',
      error: err.message 
    });
  }
});

// @route   POST /api/products
// @desc    Create a product (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to create products' });
    }

    const { name, description, price, category, imageUrl, stockQuantity } = req.body;

    // Validate input
    if (!name || !description || !price || !category) {
      return res.status(400).json({ msg: 'Missing required product fields' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stockQuantity: stockQuantity || 0
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Product Creation Error:', err.message);
    res.status(500).json({ 
      message: 'Server error while creating product',
      error: err.message 
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to update products' });
    }

    const { name, description, price, category, imageUrl, stockQuantity } = req.body;

    // Find the product
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (imageUrl) product.imageUrl = imageUrl;
    if (stockQuantity !== undefined) product.stockQuantity = stockQuantity;

    // Save updated product
    await product.save();
    res.json(product);
  } catch (err) {
    console.error('Product Update Error:', err.message);
    res.status(500).json({ 
      message: 'Server error while updating product',
      error: err.message 
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to delete products' });
    }

    // Find the product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Remove product
    await product.remove();
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error('Product Deletion Error:', err.message);
    res.status(500).json({ 
      message: 'Server error while deleting product',
      error: err.message 
    });
  }
});

module.exports = router;