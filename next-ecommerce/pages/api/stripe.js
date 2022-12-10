import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.cartItems);
    try {
      const params = {
        //custom props i inserted
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        // cancel_url: "https://localhost:3000",
        shipping_options: [
          { shipping_rate: "shr_1MDRrCDcgxGsGNrZvTiq8n61" },
          { shipping_rate: "shr_1MDRseDcgxGsGNrZJxfTwIV3" },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/rzemcqp6/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: Math.round(item.price * 100),
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.redirect(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
