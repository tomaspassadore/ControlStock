const products = require("../models/products")
const log = require("../lib/log")

exports.getProducts = async (req, res) => {
  try {
    const user_id = req.body.user_id
    const response = await products.getProducts(user_id)

    return res.status(200).send(response)
  } catch (error) {
    log.error("ProductController", error)
    return res.status(500).send(error)
  }
}
exports.addProduct = async (req, res) => {
  const { user_id, name, description, brand, amount, category } = req.body
  try {
    const response = await products.addProduct(user_id, name, description, brand, amount, category)
    return res.status(200).send(response)
  } catch (error) {
    log.error("ProductController", error)
    return res.status(500).send(error)
  }
}

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id
    const response = await products.getProductById(id)
    return res.status(200).send(response)
  } catch (error) {
    log.error("ProductController", error)
    return res.status(500).send(error)
  }
}

exports.getProductByName = async (req, res) => {
  try {
    const { user_id, name } = req.body
    const response = await products.getProductByName(user_id, name)
    return res.status(200).send(response)
  } catch (error) {
    log.error("ProductController", error)
    return res.status(500).send(error)
  }
}

exports.updateProduct = async (req, res) => {
  const { user_id, name, newName, newDescription, newBrand, newAmount, newCategory } = req.body
  try {
    const response = await products.updateProduct(user_id, name, newName, newDescription, newBrand, newAmount, newCategory)
    return res.status(200).send(response)
  } catch (error) {
    log.error("ProductController", error)
    return res.status(500).send(error)
  }
}

exports.updateStock = async (req, res) => {
  const { user_id, name, amount } = req.body
  try {
    const response = await products.updateStock(user_id, name, amount)
    return res.status(200).send(response)
  } catch (error) {
    log.error("ProductController", error)
    return res.status(500).send(error)
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { user_id, name } = req.body
    const response = await products.deleteProduct(user_id, name)
    return res.status(200).send(response)
  } catch (error) {
    log.error("ProductController", error)
    return res.status(500).send(error)
  }
}