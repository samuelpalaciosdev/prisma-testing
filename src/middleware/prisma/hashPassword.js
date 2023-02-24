// Write a prisma middleware that hash the password of the User model before saving it to the database.
const bcrypt = require('bcryptjs')

const hashPasswordMiddleware = async (params, next) => {
  // Only hash the password if the model is User and the password has not been modified
  if (params.model === 'User' && params.action === 'create') {
    let user = params.args.data
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt) // Hash the password

    user.password = hashedPassword
  }

  // Call the next middleware function or Prisma method
  return next(params)
}

module.exports = hashPasswordMiddleware
