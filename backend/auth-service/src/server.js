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

import { router } from './routes/router.js'

/**
 * Main function of the authentication service.
 */
const main = async () => {
  // Creates an express application.
  const app = express()
  app.use(helmet())
  app.use(logger('dev'))
  app.use(express.json())

  const PORT = process.env.PORT || 5050

  // Error handler.
  app.use(function (err, req, res, next) {
    // 404 Not Found.
    if (err.status === 404) {
      return res
        .status(404)
    } else {
      return res.status(500)
    }
  })

  // Register routes.
  app.use('/api/v1/auth/', router)

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
