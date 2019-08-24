import mongoose from 'mongoose';

export default async (playerId: number): Promise<any> => {
  const Player = mongoose.model('players');
  try {
    const player = await Player.findOne({ _id: playerId });
    if (player) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
