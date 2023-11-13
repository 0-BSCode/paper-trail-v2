import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  documentFiles: defineTable({
    storageId: v.string(),
    documentId: v.string(),
    userId: v.string(),
    format: v.string(),
    name: v.string(),
  }),
});
