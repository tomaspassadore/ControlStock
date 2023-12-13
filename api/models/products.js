const { ObjectId } = require('mongodb')
const { Connection } = require('./db')

const addProduct = async (user_id, name, description, brand, amount, category) => {
  try {
    const db = Connection.db
    const PRODUCTS = db.collection("products")
    const CATEGORIES = db.collection("categories")
    const cat = await CATEGORIES.findOne({ user_id: user_id, name: category })
    if (!cat) throw ({ message: "La categoria seleccionada no existe. Por favor, cree la categoria", data: null })
    const exists = await PRODUCTS.findOne({ user_id: user_id, name: name })
    if (exists) throw ({ message: "Ya existe un producto con ese nombre", data: null })
    const product = await PRODUCTS.insertOne({
      user_id: user_id, name, description, brand, amount, category
    })
    if (!product) throw ({ message: "Error creating product", data: null })
    return { message: "Product created successfully", data: product }
  } catch (error) {
    throw error
  }
}

const getProducts = async (user_id) => {
  try {
    const db = Connection.db
    const PRODUCTS = db.collection("products")
    const products = await PRODUCTS.find({ user_id: user_id }).toArray()
    if (products.length === 0) return { message: "There are no products", data: null }
    return { message: "Products found", data: products }
  } catch (error) {
    throw error
  }
}

const getProductById = async (id) => {
  try {
    const db = Connection.db
    const PRODUCTS = db.collection("products")

    const oid = new ObjectId(id)
    const product = await PRODUCTS.findOne({ _id: oid })
    if (!product) throw ({ message: "Product not found ", data: null })
    return { message: "Product found successfully", data: product }
  } catch (error) {
    throw error
  }
}

const getProductByName = async (user_id, name) => {
  try {
    const db = Connection.db
    const PRODUCTS = db.collection("products")
    const product = await PRODUCTS.find({ user_id: user_id, name: name }).toArray()
    if (!product) throw ({ message: "Product not found ", data: null })
    return { message: "Product found successfully", data: product }
  } catch (error) {
    throw error
  }
}

const updateProduct = async (user_id, name, newName, newDescription, newBrand, newAmount, newCategory) => {
  try {
    const db = Connection.db
    const PRODUCTS = db.collection("products")

    const productUpdated = await PRODUCTS.findOneAndUpdate(
      {
        user_id: user_id,
        name: name
      },
      {
        $set: {
          name: newName,
          description: newDescription,
          brand: newBrand,
          amount: newAmount,
          category: newCategory
        }
      })
    if (!productUpdated) throw ({ message: "Error updating product", data: null })
    return { message: "Product updated successfully", data: null }
  } catch (error) {
    throw error
  }
}
const updateStock = async (user_id, name, amount) => {
  try {
    const db = Connection.db
    const PRODUCTS = db.collection("products")

    const productUpdated = await PRODUCTS.findOneAndUpdate(
      {
        user_id: user_id,
        name: name
      },
      { $inc: { amount: amount } }
    )
    if (!productUpdated) throw ({ message: "Error updating stock", data: null })
    return { message: "Stock updated successfully", data: null }
  } catch (error) {
    throw error
  }
}

const deleteProduct = async (user_id, name) => {
  try {
    const db = Connection.db
    const PRODUCTS = db.collection("products")
    const product = await PRODUCTS.findOneAndDelete({ user_id: user_id, name: name })
    if (!product) throw ({ message: "Product not found", data: null })
    return { message: "Product deleted successfully", data: null }
  } catch (error) {
    throw error
  }
}

module.exports = {
  addProduct,
  getProductById,
  getProductByName,
  updateProduct,
  getProducts,
  deleteProduct,
  updateStock
}