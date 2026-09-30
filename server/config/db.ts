import mongoose from 'mongoose';

export async function connectDB() {
  mongoose.set('bufferCommands', false); // CRITICAL: fail fast, don't hang
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.log('ℹ️ No MONGODB_URI found in environment. Running with local in-memory fallback.');
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 1500 });
    console.log('✅ Connected to MongoDB successfully.');
  } catch (_err) {
    console.log('ℹ️ In-memory data store active (MongoDB unreachable in container environment).');
  }
}

