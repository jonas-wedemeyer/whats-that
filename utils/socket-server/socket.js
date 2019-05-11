let numPlayers = 1;
const ioConfig = io => {
  io.on('connect', client => {
    console.log('Client connected', client.id);
    client.on('message', message => {
      console.log('SHANSHANSHANSHAN', message)
      switch (message.type) {
        case 'createGame': 
          io.emit('message', {
            type: 'gameCreated', 
            payload: {
              playerName: 'Connected!!!',
              gameKey: 'Added player',
              playerAvatar: message.payload.player.playerAvatar
            }
          });
          break;
        case 'joinRoom':
          io.emit('message', {
            type: 'joined',
            payload: {
              playerName: 'Added player',
              gameKey: 'Added player',
              playerAvatar: message.payload.player.playerAvatar
            }
          });
          break;
        case 'additionalPlayer':
          io.emit('messageServer', {
            type: 'newPlayer',
            payload: {
              Players: [
                {
                  player_id: 'fm4cNa0eWqYrX3kCAAAH',
                  name: 'Jon Snow',
                  avatar_url:
                    'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Serious&skinColor=Yellow'
                },
                {
                  player_id: 'LPgkOd-i2HmdkWP_AAAD',
                  name: 'Daeneris Snow',
                  avatar_url:
                    'https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Prescription02&hairColor=Brown&facialHairType=Blank&facialHairColor=Blonde&clotheType=ShirtVNeck&clotheColor=PastelGreen&eyeType=Hearts&eyebrowType=RaisedExcitedNatural&mouthType=Twinkle&skinColor=Light'
                }
              ]
            }
          });
          break;
        case 'startGame':
          io.emit('messageServer', {
            type: 'startGame',
            payload: {
              word: 'orange',
              roundNumber: 1,
              totalRoundNumber: 5,
              remainingTime: 20,
              countDownTime: 3
            }
          });
          break;
        case 'drawing':
          io.emit('messageServer', {
            type: 'drawing',
            payload: {
              guess: 'basketball'
            }
          });
          break;
        case 'playerWin':
          io.emit('messageServer', {
            type: 'playerWin',
            payload: {
              player_id: 'LPgkOd-i2HmdkWP_AAAD'
            }
          });
          break;
        case 'endRound':
          io.emit('messageServer', {
            type: 'endRound',
            payload: endRound
          });
          break;
        case 'endGame':
          io.emit('messageServer', {
            type: 'endGame',
            payload: endGame
          });
          break;
        case 'noPlayers':
          io.emit('messageServer', {
            type: 'noPlayers',
            payload: { error: 'Num of players does not meet the minimum' }
          });
          break;
      }
    });

    client.on('disconnect', () => {
      console.log('Client is disconnected!');
    });
  });
}

//   io.of('/doggy').on('connect', client => {
//     console.log('Client connected to Doggy with id: ', client.id);
//     client.emit('con', {
//       type: 'CREATED',
//       payload: {
//         key: 'doggy'
//       }
//     });
//   });
// };

// const endGame = [
//   { player_id: 'fm4cNa0eWqYrX3kCAAAH',
//     draws:[
//       [
//         [
//           [611,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//           [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//           [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//         ]
//       ],
//       [
//         [
//           [611,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//           [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//           [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//         ]
//       ],
//       [
//         [
//           [611,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//           [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//           [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//         ]
//       ],
//       [
//         [
//           [611,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//           [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//           [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//         ]
//       ],
//       [
//         [
//           [611,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//           [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//           [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//         ]
//       ]
//     ]
//   },
//   { player_id: 'LPgkOd-i2HmdkWP_AAAD',
//   draws:[
//     [
//       [
//         [612,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//         [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//         [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//       ]
//     ],
//     [
//       [
//         [612,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//         [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//         [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//       ]
//     ],
//     [
//       [
//         [612,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//         [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//         [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//       ]
//     ],
//     [
//       [
//         [612,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//         [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//         [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//       ]
//     ],
//     [
//       [
//         [612,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//         [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//         [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//       ]
//     ]
//   ]
// },
// ]

// const endRound = [
//   { 
//     player_id: 'fm4cNa0eWqYrX3kCAAAH',
//     draws:[
//       [
//         [611,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//         [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//         [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//       ]
//     ]
//   },
//   { 
//     player_id: 'LPgkOd-i2HmdkWP_AAAD',
//     draws:[
//       [
//         [612,610,610,610,612,613,614,617,619,627,633,638,649,658,668,678,694,706,717,729,751,766,779,802,818,831,846,866,881,896,909,925,935,942,949,953,953,953,953,952,951,946,942,937,928,922,915,907,892,882,872,855,843,829,816,797,780,765,751,739,731,721,720],
//         [243,234,223,217,209,200,194,189,183,176,170,165,156,152,148,143,141,139,138,135,132,130,128,126,126,126,128,130,134,136,138,141,143,147,152,160,165,172,178,183,189,199,204,211,218,223,225,228,231,234,234,234,232,229,226,218,216,214,213,211,211,211,211],
//         [0,24,38,46,54,62,70,79,86,94,100,108,116,124,132,140,148,156,162,170,179,186,197,202,212,218,223,231,239,248,255,263,271,279,287,301,310,318,326,334,342,354,358,363,371,379,388,395,404,413,418,426,434,442,450,458,466,474,480,488,497,513,669]
//       ]
//     ]
//   }
// ]

module.exports = ioConfig;