import Router from 'express-promise-router'
import * as stripe from './stripe'

const router = Router()

router.get('/', stripe.createOAuth)
router.get('/stripeConnected', stripe.connected)

export default router
