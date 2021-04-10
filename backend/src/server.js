/**
 * Main script file for the laser-pa-landet backend.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import cors from 'cors'
import createError from 'http-errors'

import { router } from './routes/router.js'

/**
 * Main function of the authentication service.
 */
const main = async () => {
  // Creates an express application.
  const app = express()
  app.use(helmet())
  app.use(cors())
  app.use(logger('dev'))
  app.use(express.json())

  const PORT = process.env.PORT || 5050

  // Register routes.
  app.use('/api/v1/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    // 404 Not Found.
    if (err.status === 404) {
      return res.status(err.status).send('Oops!\nNothing here...')
    }
    if (err.status < 500) {
      return res.status(err.status).json({
        status: err.status,
        message: err.message
      })
    }
    return res.status(500).send()
  })

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
