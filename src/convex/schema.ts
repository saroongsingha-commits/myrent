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

// Booking lifecycle (DATA_MODEL.md §4). Transitions are enforced server-side.
export const bookingStatusValidator = v.union(
  v.literal("pending"),
  v.literal("confirmed"),
  v.literal("active"),
  v.literal("completed"),
  v.literal("cancelled"),
  v.literal("rejected"),
);
export type BookingStatus = Infer<typeof bookingStatusValidator>;

// Customer reviews: posted by users, published only after moderation.
export const reviewStatusValidator = v.union(
  v.literal("pending"),
  v.literal("approved"),
  v.literal("hidden"),
);
export type ReviewStatus = Infer<typeof reviewStatusValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Booking / schedule records created from the motor detail page.
    bookings: defineTable({
      code: v.string(), // RKL-YYYYMMDD-XXXX
      motorId: v.string(),
      motorName: v.string(),
      userId: v.string(),
      customerName: v.string(),
      phone: v.string(),
      email: v.optional(v.string()),
      startDate: v.string(), // YYYY-MM-DD
      endDate: v.string(), // YYYY-MM-DD
      startTime: v.string(), // HH:mm
      endTime: v.string(), // HH:mm
      durationDays: v.number(),
      total: v.number(), // IDR, dihitung ulang di server
      notes: v.optional(v.string()),
      status: bookingStatusValidator,
      createdAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_motor", ["motorId"])
      .index("by_status", ["status"]),

    // Ulasan pelanggan: ditulis pengguna, tampil publik setelah disetujui admin.
    reviews: defineTable({
      userId: v.string(),
      authorName: v.string(),
      motorId: v.optional(v.string()),
      rating: v.number(), // 1..5
      body: v.string(),
      status: reviewStatusValidator,
      createdAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_status", ["status"]),

    // add other tables here

    // tableName: defineTable({
    //   ...
    //   // table fields
    // }).index("by_field", ["field"])
  },
  {
    schemaValidation: false,
  },
);

export default schema;
