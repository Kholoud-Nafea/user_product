import asyncHandler from 'express-async-handler';

const stripe = (process.env.STRIPE_KEY)

const stripePayment = asyncHandler(async (req,res) => {
   stripe.changes.create(
      {
         source: req.body.token,
         currency: "usd"
      },
      (stripeErr, strioeRes) => {
         if(stripeErr) {
            res.status(500).json(stripeErr);
         } else {
            res.status(200).json(strioeRes)
         }
      }
   )
})

export {stripePayment}