import mongoose from "mongoose";

let cached = global.mongoose; // to aviod making multiple connections to mongoDb

if (!cached) {
  // if there is no connection in cache
  cached = global.mongoose = {conn: null, promise: null}; // create cache object
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("NO CONNECTION! KINDLY ADD IN ENV.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // to initiate a new connection to mongoDb
    const opts = {
      bufferCommands: false, // disables mongoose internal command queue until connected
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
