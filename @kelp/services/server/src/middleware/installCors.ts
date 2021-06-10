import cors from 'cors'
import { Express } from 'express'

/**
 * Install cors
 * @param app
 */
export default function installPostGraphile(app: Express) {
  // The error handler must be before any other error middleware and after all controllers

  const corsOptions = {
    origin: '*',
  }
  app.options('*', cors(corsOptions)) // include before other routes
  app.use(cors(corsOptions))
}
