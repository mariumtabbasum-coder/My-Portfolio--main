export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️ No MONGODB_URI found in environment. Running with local in-memory fallback.');
    return;
  }
  try {
    const mongoose = await import('mongoose');
    await mongoose.default.connect(uri);
    console.log('✅ Connected to MongoDB successfully.');
  } catch (err) {
    console.warn('⚠️ MongoDB connection failed. Running with in-memory store.', (err as Error).message);
  }
}
