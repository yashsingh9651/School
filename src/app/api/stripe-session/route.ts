import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
const key: string = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key, { apiVersion: "2023-08-16" });

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        billing_address_collection: "auto",
        line_items: [  
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: body.studentName,
              },
              unit_amount: body.amount * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.get("origin")}/success`,
        cancel_url: `${req.headers.get("origin")}/canceled`,
      });
      return NextResponse.json({ session });
    } catch (err: any) {
      return NextResponse.json(err.message);
    }
  } else {
    return NextResponse.json("Method Not Allowed Only Post Request is Allowed");
  }
}
