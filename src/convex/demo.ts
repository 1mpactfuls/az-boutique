/**
 * Demo-mode helpers for the public GitHub Pages deployment.
 *
 * The main app (this same code) talks to the live Convex deployment, but on
 * a public demo we don't want real sign-ups to hit the production `orders`
 * table or receive real OTP emails. These queries power a small banner so
 * visitors know what's real vs demo.
 */
import { query } from "./_generated/server";

export const catalogInfo = query({
  args: {},
  handler: async () => {
    return {
      boutique: "AZ Boutique",
      founder: "Ayesha Zahid",
      currency: "USD",
      shipping: {
        provider: "DHL Express",
        flatCents: 6500,
        freeOverCents: 250000,
      },
    };
  },
});
