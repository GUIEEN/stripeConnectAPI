import Stripe from 'stripe'
import configuration from './configuration'
import Express from 'express'
import axios from 'axios'

const stripe = new Stripe(configuration.stripe.secretKey)

export const createOAuth: Express.RequestHandler = async (req, res) => {
  const authorize_url = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${configuration.stripe.clientID}&scope=read_write
  `
  return res.render('home', { authorize_url })
}

export const connected: Express.RequestHandler = async (req, res) => {

  if (req.query.error) {
    const { error, error_description} = req.query
    return res.render('redirectPage', { error, error_description })
  }

  const { scope, code } = req.query

  const response = await axios({
    method: 'post',
    url: 'https://connect.stripe.com/oauth/token',
    data: {
      client_secret: configuration.stripe.secretKey,
      code,
      grant_type: 'authorization_code'
    }
  });

  // response.data.stripe_user_id
  // Need to Store the stripe_user_id in your database

  // const customer = await stripe.customers.create(
  //   {email: 'person_A@example.edu'},
  //   {stripe_account: response.data.stripe_user_id}
  // )

  // const account = await stripe.accounts.create({
  //   type: 'custom',
  //   country: 'US',
  //   email: 'bob@example.com'
  // })


  // await stripe.accounts.update(
  //   account.id,
  //   {
  //     tos_acceptance: {
  //       date: Math.floor(Date.now() / 1000),
  //       ip: req.connection.remoteAddress
  //     }
  //   }
  // )

  // const bkAccount = await stripe.accounts.createExternalAccount(
  //   account.id,
  //   {external_account: "btok_9CUYdoUSROb2yg"}
  // )

  // const customers = await stripe.accounts.retrieve(response.data.stripe_user_id)

  return res.render('redirectPage', { response })
}
