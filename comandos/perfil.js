const Jimp = require("jimp"),
  database = require("../database.js"),
  Discord = require('discord.js');

module.exports = {
  task(client, message, suffix) {
    
    if (!['244489368717230090','106915215592923136', '406184197405802497'].includes(message.author.id)) 
    return message.reply('Comando disponível apenas para usuários especiais! `BETA`');
    
    let user =  message.mentions.users.first() ? message.mentions.users.first() : message.author;
    database.Users.findOne({
      "_id": user.id
    }, function(erra, documento) {
      if (documento) {
        Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function(letra) {
          Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function(letra2) {
          Jimp.read("https://cdn.discordapp.com/attachments/413155538755649538/433097929234841602/InvisibleSysop.png", function(erre, img) {
            Jimp.read(`${documento.profile_background}`).then(function(background) {
              Jimp.read("./Emblemas/Level"+documento.level+".png").then(function(emblema) {
              Jimp.read(`${user.avatarURL}`).then(function(avatar) {
                Jimp.read("https://cdn.discordapp.com/attachments/413155538755649538/433336832109969428/Perfil2.png").then(function(perfil) {
                  Jimp.read(`../border/${documento.borderp}.png`).then(function(marco) {
                    Jimp.read("https://i.imgur.com/f55gYrh.png").then(function(mascara) {
                      avatar.resize(276, 265);
                      mascara.resize(276, 265);
                      avatar.mask(mascara, 0, 0);
                      background.resize(677, 556);
                      emblema.resize(75, 79);
                      img.composite(background, 87, 10);
                      img.composite(perfil, 0, 0);
                      img.composite(avatar, 0, 133);
                      img.composite(marco, 0, 133);
                      img.composite(emblema, 25, 15);
                      img.print(letra, 285, 295, `${user.username}`);
                      img.print(letra, 185, 415, `${documento.level}`);
                      img.print(letra, 325, 415, `${Number(documento.xp).toLocaleString()}`);
                      img.print(letra, 566, 370, `${Number(documento.coins).toLocaleString()}`);
                      img.print(letra, 566, 423, `${Number(documento.rubys).toLocaleString()}`);
                      img.print(letra, 54, 525, `${Number(documento.rep).toLocaleString()}`);
                      img.print(letra2, 120, 500, `${documento.bio}`);
                      img.getBuffer(Jimp.MIME_PNG, (erri, buffer) => {
                       message.channel.send(``, new Discord.Attachment(buffer, 'Profile.png'));
                      });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
      } else {
        message.reply("**Você não tem um perfil.** :confused: Use: `sy!register`");
      }
    });
  }
};