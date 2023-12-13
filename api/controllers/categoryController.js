const category = require("../models/categories")
const log = require("../lib/log")

exports.addCategory = async (req, res) => {
  try {
    const { user_id, name, description } = req.body
    const response = await category.addCategory(user_id, name, description)
    return res.status(200).send(response)
  } catch (error) {
    log.error("CategoryController", error)
    return res.status(500).send(error)
  }
}

exports.getCategories = async (req, res) => {
  try {
    const user_id = req.body.user_id
    const response = await category.getCategories(user_id)
    return res.status(200).send(response)
  } catch (error) {
    log.error("CategoryController", error)
    return res.status(500).send(error)
  }
}

exports.getCategoryByName = async (req, res) => {
  try {
    const { user_id, name } = req.body
    const response = await category.getCategoryByName(user_id, name)
    return res.status(200).send(response)
  } catch (error) {
    log.error("CategoryController", error)
    return res.status(500).send(error)
  }
}

exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id
    const response = await category.getCategoryById(id)
    return res.status(200).send(response)
  } catch (error) {
    log.error("CategoryController", error)
    return res.status(500).send(error)
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const { user_id, name, newName, newDescription } = req.body
    const response = await category.updateCategory(user_id, name, newName, newDescription)
    return res.status(200).send(response)
  } catch (error) {
    log.error("CategoryController", error)
    return res.status(500).send(error)
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const { user_id, name } = req.body
    const response = await category.deleteCategory(user_id, name)
    return res.status(200).send(response)
  } catch (error) {
    log.error("CategoryController", error)
    return res.status(500).send(error)
  }
}