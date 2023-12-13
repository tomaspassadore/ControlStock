const { ObjectId } = require('mongodb')
const { Connection } = require('./db')

const addCategory = async (user_id, name, description) => {
  try {
    const db = Connection.db
    const CATEGORIES = db.collection("categories")

    const exists = await CATEGORIES.findOne({ name: name, user_id: user_id })
    if (exists) throw ({ message: "Category already exists", data: null })
    const category = await CATEGORIES.insertOne({ user_id: user_id, name: name, description: description })
    if (!category) throw ({ message: "Error creating category", data: null })
    return { message: "Category created successfully", data: category }
  } catch (error) {
    throw error
  }
}

const getCategories = async (user_id) => {
  try {
    const db = Connection.db
    const CATEGORIES = db.collection("categories")
    const categories = await CATEGORIES.find({ user_id: user_id }).toArray()
    if (categories.length === 0) return { message: "Categories not found", data: null }
    console.log(`Cantidad de categorias: ${categories.length}`)
    return { message: "Categories found", data: categories }
  } catch (error) {
    throw error
  }
}

const getCategoryByName = async (user_id, name) => {
  try {
    const db = Connection.db
    const CATEGORIES = db.collection("categories")

    const category = await CATEGORIES.find({ user_id: user_id, name: name }).toArray()
    if (category.length === 0) throw ({ message: "Category not found", data: null })
    return { message: "Category found", data: category }
  } catch (error) {
    throw error
  }
}

const getCategoryById = async (id) => {
  try {
    const db = Connection.db
    const CATEGORIES = db.collection("categories")

    const category = await CATEGORIES.findOne({ _id: new ObjectId(id) })
    if (!category) throw ({ message: "Category not found", data: null })
    return { message: "Category found", data: category }
  } catch (error) {
    throw error
  }
}

const updateCategory = async (user_id, name, newName, newDescription) => {
  try {
    const db = Connection.db
    const CATEGORIES = db.collection("categories")

    const updatedCategory = await CATEGORIES.findOneAndUpdate(
      {
        user_id: user_id,
        name: name
      },
      {
        $set: {
          name: newName,
          description: newDescription
        }
      },
      { returnNewDocument: true }
    )
    if (!updatedCategory) throw ({ message: "Error updating the category", data: null })
    return { message: "Category updated successfully", data: updatedCategory }
  } catch (error) {
    throw error
  }
}

const deleteCategory = async (user_id, name) => {
  try {
    const db = Connection.db
    const CATEGORIES = db.collection("categories")

    const category = await CATEGORIES.findOneAndDelete({ user_id: user_id, name: name })
    if (!category) throw ({ message: "Category not found", data: null })
    return { message: "Category deleted successfully", data: null }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getCategories,
  getCategoryByName,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
}