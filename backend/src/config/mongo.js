/**
 * Database configuration script file.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import mongoose from 'mongoose'

/**
 * DB connection function.
 *
 */
export const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
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
    const connectionString = process.env.NODE_ENV === 'test'
      ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSPHRASE}${process.env.DB_TEST_CONNECTION_STRING}`
      : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSPHRASE}${process.env.DB_CONNECTION_STRING}`
    await mongoose.connect(connectionString, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }
}

/**
 * DB truncate function.
 */
export const truncateDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection
    const promises = Object.keys(collections).map(collection =>
      mongoose.connection.collection(collection).deleteMany({})
    )
    await Promise.all(promises)
  }
}

/**
 * DB disconnection function.
 */
export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
}
