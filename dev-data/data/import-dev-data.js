const fs = require('fs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Tour = require('./../../models/tourModel.js')
// config
dotenv.config({
  path: './config.env'
})

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection successfully')
  })

// read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

// import data into db
const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data succesfully loaded!')
  } catch (err) {
    console.log(err)
  }
}
// delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('data succesfully deleted')
  } catch (err) {
    console.log(err)
  }
}
if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}

console.log(process.argv)
