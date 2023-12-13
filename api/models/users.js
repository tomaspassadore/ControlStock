const { Connection } = require('./db')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Registrar usuario
exports.signIn = async (username, password) => {
  try {
    const db = Connection.db
    const users = db.collection("users")

    let exists = await users.findOne({ username: username })
    if (exists) return new Error('User already exists')

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(password, salt)

    const user = await users.insertOne({
      username: username,
      password: passwordHashed,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return { message: "User created successfully", data: user }
  } catch (error) {
    throw error
  }
}

// Inicio de sesión
exports.login = async (username, password) => {
  try {
    const db = Connection.db
    const users = db.collection("users")

    let user = await users.findOne({ username: username })

    if (!user) throw ({ message: "Incorrect user", data: null })

    let passwordOk = await bcrypt.compare(password, user.password)
    if (!passwordOk) throw ({ message: "Incorrect user", data: null })

    const id = user._id

    const payload = {
      user_id: user._id,
      user_name: user.username,
    }
    // Creación de token
    const token = jwt.sign(
      payload,
      process.env.JWT_KEY,
      // Expira a las 6 horas
      { expiresIn: 21600 }
    )
    return { message: "Login successfully", data: { token, id } }
  } catch (error) {
    console.log(error)
    throw error
  }
}