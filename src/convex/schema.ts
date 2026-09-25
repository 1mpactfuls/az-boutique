import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),

      role: v.optional(roleValidator),
    }).index("email", ["email"]), // index for the email. do not remove or modify

    orders: defineTable({
      orderNumber: v.string(),
      userId: v.optional(v.id("users")),
      email: v.string(),
      status: v.union(
        v.literal("pending"),
        v.literal("paid"),
        v.literal("cancelled"),
      ),
      items: v.array(
        v.object({
          slug: v.string(),
          name: v.string(),
          size: v.string(),
          priceCents: v.number(),
          quantity: v.number(),
        }),
      ),
      subtotalCents: v.number(),
      shippingCents: v.number(),
      totalCents: v.number(),
      currency: v.literal("usd"),
      shippingAddress: v.object({
        fullName: v.string(),
        line1: v.string(),
        line2: v.optional(v.string()),
        city: v.string(),
        state: v.optional(v.string()),
        postalCode: v.string(),
        country: v.string(),
        phone: v.optional(v.string()),
      }),
      eventDate: v.optional(v.string()),
      notes: v.optional(v.string()),
    })
      .index("by_user", ["userId"])
      .index("by_order_number", ["orderNumber"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
