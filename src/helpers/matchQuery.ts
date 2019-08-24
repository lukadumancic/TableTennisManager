import mongoose from 'mongoose';

export default (playerId1: string, playerId2: string, id: string) => {
  return [
    {
      $match: id
        ? { _id: mongoose.Types.ObjectId(id) }
        : playerId1 && playerId2
        ? {
            playerId1: mongoose.Types.ObjectId(playerId1),
            playerId2: mongoose.Types.ObjectId(playerId2)
          }
        : {}
    },
    {
      $lookup: {
        from: 'players',
        localField: 'playerId1',
        foreignField: `_id`,
        as: 'player1'
      }
    },
    {
      $lookup: {
        from: 'players',
        localField: 'playerId2',
        foreignField: `_id`,
        as: 'player2'
      }
    },
    {
      $project: {
        player1: {
          $arrayElemAt: ['$player1', 0]
        },
        player2: {
          $arrayElemAt: ['$player2', 0]
        },
        score: '$score'
      }
    }
  ];
};
