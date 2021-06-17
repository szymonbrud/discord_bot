const Discord = require('discord.js');
const { indexOf } = require('ffmpeg-static');
const ytdl = require('ytdl-core');
const dotenv = require('dotenv').config();

// Create an instance of a Discord client

// const discord = new Discord();
// const client = discord.Client();

const client = new Discord.Client();

const queue = new Map();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */

client.login(process.env.KEY);

client.on('ready', (e) => {
  console.log('I am ready!');

  const channel = client.channels.cache.get('831128755635617806');
  // channel.send("hello");
  // console.log(client.channels.cache.get("831128755635617806"));
  // console.log("after");
});

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

client.on('message', async (message) => {
  if (message.content === 'play') {
    message.delete();
    const songInfo = await ytdl.getInfo(
      'https://youtube.com/playlist?list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS'
    );
    // const songInfo = await ytdl.getInfo(
    //   "https://www.youtube.com/watch?v=t4O1LLk6qlY&ab_channel=SBMLabel"
    // );
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };
    const serverQueue = { songs: [] };
    serverQueue.songs.push(song);
    // console.log(serverQueue.songs);
    const voiceChannel = message.member.voice.channel;

    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };
    // Setting the queue using our contract
    // queue.set(message.guild.id, queueContruct);
    // Pushing the song to our songs array
    queueContruct.songs.push(song);
    queue.set(message.guild.id, queueContruct);

    try {
      // Here we try to join the voicechat and save our connection into our object.

      console.log('want to start play');
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      // Calling the play function to start a song
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      // Printing the error message if the bot fails to join the voicechat
      console.log(err);
      // queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  }
});

client.on('message', (message) => {
  const [command, ...nick] = message.content.split(' ');

  // let nickToKick = "";

  console.log(nick);

  console.log(nick.toString());

  var nickToKick = nick.toString().replace(/,/g, ' ');

  // const nickToKick = nick.toString.map((letter) =>
  //   letter === "," ? " " : letter
  // );

  // nick2 = [];

  // nick.forEach((e) => nick2.push(e));

  // nick2.forEach((e) => (nickToKick = nickToKick + " " + e));

  // const [ah, ...two] = nickToKick;

  // // nickToKick = two.toString();
  // nickToKick = "";

  // two.forEach((e) => (nickToKick = e));

  console.log('FINISHED!');
  console.log(nickToKick);

  if (command === null || nickToKick === null) null;

  if (command === 'obudz') {
    message.delete();
    const voiceChannels = [];
    let currentChannel = null;
    let userKicked = null;

    // currentChannel = message.channel;

    message.guild.members.cache.forEach((e) => {
      if (
        (e.nickname && e.nickname.toLowerCase() === nickToKick.toLowerCase()) ||
        (e.displayName &&
          e.displayName.toLowerCase() === nickToKick.toLowerCase())
      ) {
        userKicked = e;
      }

      // if (
      //   e.displayName.toLowerCase() === nickToKick.toLowerCase() ||
      //   e.nickname.toLowerCase() === nickToKick.toLowerCase()
      // ) {
      //   userKicked = e;
      // }
    });

    message.guild.channels.cache.forEach((e) => {
      e.members.forEach((user) => {
        if (
          (user.nickname &&
            user.nickname.toLowerCase() === nickToKick.toLowerCase()) ||
          (user.displayName &&
            user.displayName.toLowerCase() === nickToKick.toLowerCase())
        ) {
          currentChannel = e;
        }
      });
    });

    if (userKicked === null) return;

    message.guild.channels.cache.forEach((e) => {
      if (
        e.type === 'voice' &&
        e.name !== message.channel.name &&
        e.members.size === 0
      ) {
        setTimeout(() => {
          userKicked.voice.setChannel(e);
        }, 20);
      }
    });

    setTimeout(() => {
      console.log(currentChannel);
      userKicked.voice.setChannel(currentChannel);
    }, 1000);
  }
});

const musicLibrary = [
  {
    name: 'patointeligencja',
    link: 'https://www.youtube.com/watch?v=wTAibxp37vE&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=2&ab_channel=SBMLabel',
  },
  {
    name: 'biblioteka trap',
    link: 'https://www.youtube.com/watch?v=vXTpoukGFIs&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=3&ab_channel=SBMStarter',
  },
  {
    name: 'piszę to na matmie',
    link: 'https://www.youtube.com/watch?v=YlY71g3kzDU&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=5&ab_channel=SBMLabel',
  },
  {
    name: 'Drift',
    link: 'https://www.youtube.com/watch?v=lNl-AXEktAY&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=4&ab_channel=SBMLabel',
  },
  {
    name: 'Wino Sangrita',
    link: 'https://www.youtube.com/watch?v=cd8A6VNLZ7k&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=6&ab_channel=SBMLabel',
  },
  {
    name: 'Homo Ludens',
    link: 'https://www.youtube.com/watch?v=jdxINVwI_po&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=7&ab_channel=SBMLabel',
  },
  {
    name: 'Żółte flamastry i grube katechetki',
    link: 'https://www.youtube.com/watch?v=tXKh6P10vSY&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=8&ab_channel=SBMLabel',
  },
  {
    name: 'Cafe PRL',
    link: 'https://www.youtube.com/watch?v=TjuBl7hnO6U&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=9&ab_channel=SBMLabel',
  },
  {
    name: 'Tango',
    link: 'https://www.youtube.com/watch?v=FAVLJyljrpI&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=10&ab_channel=SBMLabel',
  },
  {
    name: 'GOMBAO 33',
    link: 'https://www.youtube.com/watch?v=NXnIdVUMsWo&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=11&ab_channel=SBMLabel',
  },
  {
    name: 'Konkubinat',
    link: 'https://www.youtube.com/watch?v=GJEylqoVquc&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=12&ab_channel=SBMLabel',
  },
  {
    name: 'Nero',
    link: 'https://www.youtube.com/watch?v=rEziOlg30fw&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=13&ab_channel=SBMLabel',
  },
  {
    name: 'Lezore',
    link: 'https://www.youtube.com/watch?v=g7Y2lJaT4-Q&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=14&ab_channel=SBMLabel',
  },
  {
    name: 'Patoreakcja',
    link: 'https://www.youtube.com/watch?v=t4O1LLk6qlY&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=36&ab_channel=SBMLabel',
  },
  {
    name: 'Sam sobie jadę',
    link: 'https://www.youtube.com/watch?v=My2lHk5HGvA&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=41&ab_channel=SBMStarter',
  },
  {
    name: 'Schodki',
    link: 'https://www.youtube.com/watch?v=AjrtRgZdzgU&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=31&ab_channel=SBMLabel',
  },
  {
    name: 'Prawy do Lewego',
    link: 'https://www.youtube.com/watch?v=wV9mdnvelVE&list=PLf1fjSmVppF-7lnNxse8kgY-HDedzCrvS&index=30&ab_channel=SBMLabel',
  },
  {
    name: 'ASPARTAM',
    link: 'https://www.youtube.com/watch?v=suFt6lPb3i8&ab_channel=QueQuality',
  },
];

client.on('message', async (message) => {
  const textSeparated = message.content.split(' ');
  if (textSeparated[0] === 'mata') {
    message.delete();

    textSeparated.shift();

    const accuracy = [];

    musicLibrary.forEach((music) => {
      let res = 0;

      textSeparated.forEach((textItem) => {
        if (music.name.toLowerCase().search(textItem.toLowerCase()) !== -1) {
          res += 1;
        }
      });

      accuracy.push(res);
    });

    const thePlayListNumber = Math.max(...accuracy);
    const findIndex = accuracy.findIndex((e) => e === thePlayListNumber);

    const songInfo = await ytdl.getInfo(musicLibrary[findIndex].link);
    // const songInfo = await ytdl.getInfo(
    //   "https://www.youtube.com/watch?v=t4O1LLk6qlY&ab_channel=SBMLabel"
    // );
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };
    const serverQueue = { songs: [] };
    serverQueue.songs.push(song);
    // console.log(serverQueue.songs);
    const voiceChannel = message.member.voice.channel;

    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };
    // Setting the queue using our contract
    // queue.set(message.guild.id, queueContruct);
    // Pushing the song to our songs array
    queueContruct.songs.push(song);
    queue.set(message.guild.id, queueContruct);

    try {
      // Here we try to join the voicechat and save our connection into our object.

      console.log('want to start play');
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      // Calling the play function to start a song
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      // Printing the error message if the bot fails to join the voicechat
      console.log(err);
      // queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  }
});

// client.on("message", (message) => {
//   if (message.author.username === "SuEZaR") {
//     message.member.voice.kick();
//   }
// });

client.on('message', (message) => {
  if (message.content === 'Udyr' || message.content === 'udyr') {
    message.delete();
    message.channel.send(
      'https://cdn.discordapp.com/attachments/728066040650530924/831622749940219954/udyrPrzemianaLVL100.png'
    );
  }
  if (message.content === 'Hermanos' || message.content === 'hermanos') {
    message.delete();
    message.channel.send(
      'https://cdn.discordapp.com/attachments/728066040650530924/831623950173077554/background.png'
    );
  }
});

client.on('message', (message) => {
  if (message.content === 'live') {
    message.guild.channels.cache.find((chanel) => {
      if (chanel.name === 'Kanał') {
        chanel.setName('LIVE');
      }
    });
  }
});

const axios = require('axios');

// 1. Stworzy nowy kanał,
// 2. przeniesie tam wszyskich,
// 3. zagra barkę
// 4. przeniesie wszyskich na kanały na których byli
// 5. wusunie kanał

// axios.get('https://picsum.photos/200/300').then((e) => {
//   bot.user.setAvatar(e.data);
// });

let listOfAllMembers = [];
let chanelToDelete = null;
let botMata = null;
let lastNickNameBot = '';

function play2(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    console.log('skończyło się');
    listOfAllMembers.forEach((listElement) => {
      listElement.member.voice.setChannel(listElement.prevChannel);
    });
    setTimeout(() => {
      chanelToDelete.delete();
      botMata.setNickname(lastNickNameBot);
    }, 3000);

    // tutaj wykonać kod odnośnie usuwania barki
    return;
  }
  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift();
      play2(guild, serverQueue.songs[0]);
    })
    .on('error', (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

client.on('message', async (message) => {
  if (message.content === 'barka') {
    message.delete();
    listOfAllMembers = [];
    const bot = message.guild.members.cache.find(
      (e) => e.id === '831127979878121482'
    );

    lastNickNameBot = bot.nickname;

    bot.setNickname('Barka');

    botMata = bot;

    // bot.user.setAvatar('https://i.ibb.co/Hp3dDLL/images.jpg');
    const barkaChanel = await message.guild.channels.create(
      'Czas na barke!!!',
      {
        type: 'voice',
      }
    );

    chanelToDelete = barkaChanel;

    barkaChanel.guild.members.cache.forEach((e) => {
      listOfAllMembers.push({
        member: e,
        prevChannel: e.voice.channel,
      });
      console.log(e.displayName);
      e.voice.setChannel(barkaChanel);
    });

    const songInfo = await ytdl.getInfo(
      'https://www.youtube.com/watch?v=0qzLRlQFFQ4&t=38s&ab_channel=VerbumDei'
    );
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };
    const serverQueue = { songs: [] };
    serverQueue.songs.push(song);
    const voiceChannel = message.member.voice.channel;
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };
    queueContruct.songs.push(song);
    queue.set(message.guild.id, queueContruct);
    try {
      console.log('want to start play');
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play2(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      return message.channel.send(err);
    }
  }
});

let usersKickedFromServer = [];

client.on('message', (message) => {
  const [command, userId] = message.content.split(' ');

  if (command === '-nie_wbija') {
    message.delete();

    if (!userId) {
      message.channel.send('Podaj ID użytkownika po spacji');
      return;
    }

    if (message.member.id === '318266342224560139') {
      usersKickedFromServer.push(userId);
    }
  } else if (command === '-wbija') {
    if (!userId) {
      message.channel.send('Podaj ID użytkownika po spacji');
      return;
    }

    if (message.member.id === '318266342224560139') {
      const findById = usersKickedFromServer.indexOf(userId);
      if (findById) {
        usersKickedFromServer.splice(findById, 1);
      }
    }
  }
});

client.on('voiceStateUpdate', (event) => {
  if (usersKickedFromServer.includes(event.member.id)) {
    event.kick();
  }
});

// Create an event listener for messages
// client.on("message", (message) => {
//   // If the message is "ping"
//   if (message.content === "ping") {
//     // Send "pong" to the same channel
//     message.channel.send("pong");
//   }
// });

// client.on('')

// Log our bot in using the token from https://discord.com/developers/applications

const queuePrivate = new Map();

function play3(guild, song) {
  const serverQueue = queuePrivate.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queuePrivate.delete(guild.id);
    console.log('skończyło się');
    listOfAllMembers.forEach((listElement) => {
      listElement.member.voice.setChannel(listElement.prevChannel);
    });
    setTimeout(() => {
      chanelToDelete.delete();
      botMata.setNickname(lastNickNameBot);
    }, 3000);

    // tutaj wykonać kod odnośnie usuwania barki
    return;
  }
  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift();
      play3(guild, serverQueue.songs[0]);
    })
    .on('error', (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

client.on('message', async (message) => {
  if (message.content === '/pmata') {
    message.delete();

    // ---------------------------------

    const songInfo = await ytdl.getInfo(
      'https://www.youtube.com/watch?v=8VMs4s1hgyA&ab_channel=QualityBass'
    );
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };
    const serverQueue = { songs: [] };
    serverQueue.songs.push(song);
    const voiceChannel = message.member.voice.channel;
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };
    queueContruct.songs.push(song);
    queuePrivate.set(message.guild.id, queueContruct);
    try {
      console.log('want to start play');
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play3(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      return message.channel.send(err);
    }
  }
});
