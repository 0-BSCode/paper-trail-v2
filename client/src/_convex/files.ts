import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const generateUploadUrl = mutation({
  args: {
    // ...
  },
  handler: async (ctx) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...

    // Return an upload URL
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveDocumentFile = mutation({
  // You can customize these as you like
  args: { storageId: v.string(), documentId: v.string(), userId: v.string(), format: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...

    // Save the storageId to the database using `insert`
    await ctx.db.insert('documentFiles', {
      storageId: args.storageId,
      documentId: args.documentId,
      userId: args.userId,
      name: args.name,
      format: args.format,
    });
  },
});

export const getFilesByDocumentId = query({
  args: { documentId: v.string() },
  handler: async (ctx, args) => {
    const documentFiles = await ctx.db
      .query('documentFiles')
      .filter((q) => q.eq(q.field('documentId'), args.documentId))
      .collect();
    return await Promise.all(
      documentFiles.map(async (documentFile) => ({
        ...documentFile,
        // If the documentFile is an "image" its `body` is a `StorageId`
        url: await ctx.storage.getUrl(documentFile.storageId),
        metadata: await ctx.storage.getMetadata(documentFile.storageId),
      })),
    );
  },
});

export const deleteFileById = mutation({
  args: { documentFileId: v.id('documentFiles') },
  handler: async (ctx, args) => {
    const documentFile = await ctx.db.get(args.documentFileId);

    if (documentFile) {
      await ctx.storage.delete(documentFile.storageId);
      await ctx.db.delete(args.documentFileId);
    }
  },
});

export const deleteFilesOfDocument = mutation({
  args: { documentId: v.string() },
  handler: async (ctx, args) => {
    const documentFiles = await ctx.db
      .query('documentFiles')
      .filter((q) => q.eq(q.field('documentId'), args.documentId))
      .collect();

    if (documentFiles) {
      for (const documentFile of documentFiles) {
        await ctx.storage.delete(documentFile.storageId);
        await ctx.db.delete(documentFile._id);
      }
    }
  },
});
