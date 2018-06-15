import Stripe from 'stripe'
import configuration from './configuration'
const stripe = new Stripe(configuration.stripe.secretKey)

const custom = (app) => {
  app.post('/api/stripe/account/get', (req, res, next) => {
    const stripeAccountId = 'acct_1Ccqc6GR5hWTSK5U'

    if (stripeAccountId == null) {
      res.send({
        success: true,
        message: 'Missing stripe account.',
        setupBegan: false
      })
    } else {
      stripe.accounts.retrieve(
        stripeAccountId,
        (err, account) => {
          if (err) {
            res.send({
              success: false,
              message: `Error: ${err.message}`,
              setupBegan: true,
              account: null
            })
          } else {
            res.send({
              success: true,
              message: 'Stripe account.',
              setupBegan: true,
              account: account
            })
          }
        }
      )
    }
  })

  app.post('/api/stripe/account/setup', (req, res, next) => {
    const country = req.body.countryCode
    const email = 'test@test.ca'
    console.log('haha')
    if (
      country !== 'JP' &&
      country !== 'US'
    ) {
      res.send({
        success: false,
        message: 'Error: Invalid country'
      })
    } else {
      stripe.accounts.create({
        type: 'custom',
        country,
        email
      }, (err, account) => {
        if (err) {
          console.log('err', err)
          res.send({
            success: false,
            message: `Error: ${err.message}`
          })
        } else {
          console.log('account', account)

          const { id } = account

          stripe.accounts.update(
            id,
            {
              tos_acceptance: {
                date: Math.floor(Date.now() / 1000),
                ip: req.connection.remoteAddress
              }
            }
          ).then(() => {
            res.send({
              success: true,
              message: 'Account setup has begun.',
              accountId: id
            })
          })
        }
      })
    }
  })
}

export default custom
