const prisma = require('../services/prisma')

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany()
  return res.status(200).json({ status: 'success', users })
}

const getSingleUser = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Please provide id' })
  }

  const user = await prisma.user.findUnique({
    where: { id: id },
  })

  return res.status(200).json({ status: 'success', user })
}

const createUser = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Please provide name, email and password' })
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })

  return res.status(201).json({ status: 'success', user })
}

const updateUser = async (req, res) => {
  const {
    params: { id },
    body: { name, email },
  } = req

  if (!name || !email) {
    return res.status(400).json({ status: 'error', message: 'Please provide name and email' })
  }

  const user = await prisma.user.update({
    where: { id: id },
    data: {
      name,
      email,
    },
  })

  return res.status(200).json({ status: 'success', user })
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Please provide id' })
  }

  const user = await prisma.user.delete({
    where: { id: id },
  })

  return res.status(200).json({ status: 'success', user })
}

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser }
