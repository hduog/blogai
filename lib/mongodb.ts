import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
declare global {
  var _mongoCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

// 👇 Create or reuse cache
let cached = globalThis._mongoCache;

if (!cached) {
  cached = globalThis._mongoCache = {
    conn: null,
    promise: null,
  };
}

async function connectToDatabase() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => mongoose);
  }

  cached!.conn = await (cached?.promise ??
    Promise.reject(new Error("Cached promise is undefined")));
  return cached?.conn;
}

export { connectToDatabase };
