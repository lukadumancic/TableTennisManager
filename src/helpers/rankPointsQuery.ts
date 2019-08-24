import mongoose from 'mongoose';

export default (player: number, playerId?: string) => {
  const query = [
    {
      $match: playerId
        ? {
            _id: mongoose.Types.ObjectId(playerId)
          }
        : {}
    },
    {
      $lookup: {
        from: 'matches',
        localField: '_id',
        foreignField: `playerId${player}`,
        as: 'matches'
      }
    },
    {
      $project: {
        _id: '$_id',
        name: '$name',
        setWonSum: {
          $sum: {
            $map: {
              input: '$matches',
              as: 'match',
              in: {
                $size: {
                  $filter: {
                    input: '$$match.score',
                    as: 'set',
                    cond: {
                      [player === 1 ? '$gte' : '$lte']: [
                        '$$set.points1',
                        '$$set.points2'
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      $sort: {
        setWonSum: -1
      }
    }
  ];
  return query;
};
