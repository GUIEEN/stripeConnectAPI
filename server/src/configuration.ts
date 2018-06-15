import dotenv from 'dotenv'

switch (process.env.NODE_ENV) {
  case 'production':
    dotenv.config({
      path: 'production.env'
    })
    break
  case 'test':
    dotenv.config({
      path: 'test.env'
    })
    break
  default:
    dotenv.config()
}

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  baseURL: process.env.BASE_URL || 'http://localhost:3001',
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'elided',
    secretKey: process.env.STRIPE_SECRET_KEY || 'elided',
    clientID: process.env.STRIPE_CLIENT_ID || 'elided'
  }
}
