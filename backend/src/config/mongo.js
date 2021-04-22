/**
 * Database configuration script file.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Creates a connection to the database.
 *
 * @returns {Promise} If the connection is successful.
 */
export const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('Database connection is open...'))
  mongoose.connection.on('error', error => console.log(`Database connection error has occurred: ${error}`))
  mongoose.connection.on('disconnected', () => console.log('Database is disconnected...'))

  // Closing the connection.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database connection is about to close due to application termination.')
      process.exit(0)
    })
  })

  // Connect to database.
  return await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSPHRASE}${process.env.DB_CONNECTION_STRING}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

/**
 * Creates a connection to the test database.
 *
 * @returns {Promise} If the connection is successful.
 */
export const connectTestDB = async () => {
  mongoose.connection.on('connected', () => console.log('Database connection is open...'))
  mongoose.connection.on('error', error => console.log(`Database connection error has occurred: ${error}`))
  mongoose.connection.on('disconnected', () => console.log('Database is disconnected...'))

  // Closing the connection.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database connection is about to close due to application termination.')
      process.exit(0)
    })
  })

  // Connect to database.
  return await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSPHRASE}${process.env.DB_TEST_CONNECTION_STRING}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}
