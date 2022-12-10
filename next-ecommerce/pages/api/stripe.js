const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        //custom props i inserted
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billling_adress_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1MDRrCDcgxGsGNrZvTiq8n61" },
          { shipping_rate: "shr_1MDRseDcgxGsGNrZJxfTwIV3" },
        ],
        line_items: req.body.cartItems.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/rzemcqp6/production/"
            )
            .replace("-webp", ".webp");
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
