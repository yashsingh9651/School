import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise : Promise<Stripe | null>;

const getStripePromise = () => {
  const key = process.env.NEXT_PUBLIC_API_KEY || "";
  if (!stripePromise && !!key) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStripePromise;
