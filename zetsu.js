/*const { Client } = require('discord.js');

const client = new Client();

client.on("message", async (message) => {
  let args = message.content.substring(1).trim().split(" ");
  args = args.splice(1);

  if(message.author.id !== "991350001475256320") return;

  if(message.content.startsWith(".eval")){
    function clean(text) {
      if (typeof text !== "string") text = require("util").inspect(text, { depth: 0 });
      text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }

    if (!args[0]) return message.channel.send("`[EVAL]:` Çalışmaktayım merak etme...");
    const code = args.join(" ");

    try {
      const result = clean(await eval(code));
      if (result.includes(client.token)) return message.channel.send("```T0K3N```");
      message.channel.send(`\`\`\`js\n${result}\`\`\``)
    } catch (err) {
      message.channel.send(`\`\`\`js\n${err}\`\`\``)
    }
  }
  if(message.content.startsWith(".info")){
    const check = message.mentions.users;
    if(check.length <= 0) return message.channel.send("`[INFO]:` Bi kişiye reply atmalısın.");
    if(check.length > 1) return message.channel.send("`[INFO]:` Şuanlık sadece bir kişinin infosunu bulabiliyorum fazlasını etiketleyemezsin.")

    const member = message.mentions.users.first();
    if(!member.lastMessage) return message.channel.send("`[INFO]:` Kişi ile tam etkileşime geçemiyorum muhtemelen aktif değil yada engellendim.")

    message.channel.send("`[INFO]:` Bilgilerin hepsi JSON olarak kaydedildi. Kanala yansıtmak isterseniz 10 saniye içinde `Evet` yazınız.").then((message) => {
      message.channel.awaitMessages((mes) => mes.author.id == "991350001475256320", { time: 10000, max: 1, errors: ['time']}).then((collected) => {
        const answer = collected.first();
        if(answer == "Hayır") return message.channel.send("`[INFO]:` İşlem iptal edildi. Bilgilere JSON üzerinden ulaşabilirsiniz.")
        if(answer == "Evet") return message.channel.send("`[INFO]:` Bilgiler DM kutusuna iletildi.")
      });
    });
  }
});

client.login("OTkxMzUwMDAxNDc1MjU2MzIw.GIXZ7t.wSZVFStXIc6LhxB1EsGrGh4__dciCvCwFN6cUo")
  .then(() => console.log('Çalıştım'))
  .catch(() => console.log('olmadı'))
*/


const { Client, WebhookClient, Collection } = require("discord.js");
const data = require("./conf.json");
const fs = require("fs");

const client = new Client();
require("discord-reply");

client.on("ready", async () => {
  console.log(`> [SYSTEM]: Hesap aktif edildi.`);

  setInterval(() => hunt(), 30000);
  setInterval(() => gamble(), 20000);
  setInterval(() => lucky(), 300000);
});

let lastChannel;

client.on("message", async (message) => {
  if(!data.userID.includes(message.author.id) || !data.prefix.some((x) => message.content.startsWith(x))) return;
  let args = message.content.substring(1).trim().split(" ");
  let command = args[0].toLowerCase();
  args = args.splice(1);

  if(command == 'eval'){
    if(!args[0]) return message.channel.send(`\`>\` Çalışmaktayım, emirlerini bekliyorum...`);

    function clean(text) {
      if (typeof text !== "string") text = require("util").inspect(text, { depth: 0 });
      text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }

    const code = args.join(" ");

    try {
      const result = clean(await eval(code));
      if (result.includes(client.token)) return message.channel.send("```T0K3N```")
      else return message.channel.send(`\`\`\`js\n${result}\`\`\``)
    } catch (err) {
      message.channel.send(`\`\`\`js\n${err}\`\`\``)
    }
  }

  if(command == 'owoboot'){
    if(args[0] == 'stop'){
      message.channel.send("`>` OwO Boot durduruldu.").then(m => m.delete({ timeout: 10000}));
      hunt = async () => {}
      gamble = async () => {}
      lucky = async () => {}
    }else{
      lastChannel = message.channel.id
      message.channel.send("`>` OwO Boot aktif edildi.").then(m => m.delete({ timeout: 10000}));
      hunt = async () => {
        const channelID = message.channel.id;
        client.channels.get(channelID).send('owo hunt')
        setTimeout(() => { client.channels.get(channelID).send('owo sell all') }, 2233);
      }

      gamble = async () => {
        const channelID = message.channel.id;
        client.channels.get(channelID).send('owo s 30')
        client.channels.get(channelID).send('owo cf 30')
      }

      lucky = async () => {
        const channelID = message.channel.id;
        client.channels.get(channelID).send('owo pray')
      }
    }
  }

  if(command == 'info'){
    return message.channel.send("Komut hazır değil")
    const check = message.mentions.users;
    if(!check) return message.channel.send(`\`>\` **[INFO]:** En az bir kullanıcı etiketlemelisin.`).then(m => m.delete({ timeout: 10000}));
    if(check.length > 1){

    }else{
      const member = check.first();
      if(member.lastMessage) return message.channel.send(`\`>\` **[INFO]:** Bu kullanıcıya erişimi engelleniyor ya da kişi aktif değil.`).then(m => m.delete({ timeout: 10000}));

      const info = {
        name: member.username,
        disc: member.discriminator,
        avatar: member.avatarURL,

      }
    }
  }
});

client.on('message', async (message) => {
  if(message.author.id !== "408785106942164992" || !message.channel.tydmpe == 'dm') return;

  if(message.content.includes('Beep Boop.')){
    hunt = async () => {}
    gamble = async () => {}
    lucky = async () => {}
  }
  if(message.content.includes('verified')){
    if(!lastChannel) return message.channel.send('`>` Son kanal bulunamadı.')
    hunt = async () => {
      client.channels.get(lastChannel).send('owo hunt')
      setTimeout(() => { client.channels.get(lastChannel).send('owo sell all') }, 2233);
    }

    gamble = async () => {
      client.channels.get(lastChannel).send('owo s 30')
      client.channels.get(lastChannel).send('owo cf 30')
    }

    lucky = async () => {
      client.channels.get(lastChannel).send('owo pray')
    }
  }

});

client.login(data.token).then(() => console.log("> [SYSTEM]: Bot tokene bağlandı.")).catch(() => console.log("> [SYSTEM]: Bot hata aldı."))

async function hunt(){}
async function gamble(){}
async function lucky(){}