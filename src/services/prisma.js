const { PrismaClient } = require('@prisma/client')
const hashPasswordMiddleware = require('../middleware/prisma/hashPassword')

const prisma = new PrismaClient()

prisma.$use(hashPasswordMiddleware)

module.exports = prisma
