// services/userService.js
import mongoose from 'mongoose';
import { IInfluencer } from '@/models/influencer.model';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const getInfluencerById = async (id: string): Promise<IInfluencer | null> => {
  await connectDB();
  const Influencer = mongoose.models.influencer;
  if (!Influencer) {
    throw new Error('Influencer model not found');
  }
  return Influencer.findById(id);
};

export const getInfluencersByIds = async (ids: string[]): Promise<IInfluencer[]> => {
  await connectDB();
  const Influencer = mongoose.models.influencer;
  if (!Influencer) {
    throw new Error('Influencer model not found');
  }
  return Influencer.find({ _id: { $in: ids } });
};
