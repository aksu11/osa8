if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const secret = process.env.SECRET
let mongoUrl = process.env.MONGODB_URI

module.exports = {mongoUrl, secret}