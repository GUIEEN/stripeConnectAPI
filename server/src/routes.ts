import Router from 'express-promise-router'
import * as stripe from './stripeCustom'

const router = Router()

router.get('/', stripe.createOAuth)
router.get('/stripeConnected', stripe.connected)

export default router
