const mongoose = require('mongoose')

// 透過mongoose連線到MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得連線狀況
const db = mongoose.connection
db.on('error', () => console.log('MongoDB connection error'))
db.once('open', () => console.log('MongoDB connected'))

// 輸出
module.exports = db