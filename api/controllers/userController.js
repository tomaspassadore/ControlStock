const log = require("../lib/log")
const User = require("../models/users")

exports.signIn = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.signIn(username, password)
    res.status(200).send(user)
  } catch (error) {
    log.error("UserController", error)
    return res.status(500).send({ message: error, data: null })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(500).send('Username and password are required')
  try {
    const data = await User.login(username, password)
    res.status(200).send(data)
  } catch (error) {
    log.error("UserController", error)
    return res.status(500).send(error)
  }
}