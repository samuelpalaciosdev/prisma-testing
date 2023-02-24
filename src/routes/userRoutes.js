const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser)

module.exports = router
