const Discord = require('discord.js');

const client = new Discord.Client();
const {Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const prefix = '-';

Reflect.defineProperty(currency, 'add', {
	/* eslint-disable-next-line func-name-matching */
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	/* eslint-disable-next-line func-name-matching */
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

const fs = require('fs');
const help = require('./commands/help');
const add = require('./commands/add');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => currency.set(b.user_id, b));
    client.user.setPresence({ activity: { name: ' -help', type:"LISTENING"} })
    console.log('I am alive!');

});

client.on('message', async message =>{
    if (message.author.bot) return;

	if (!message.content.startsWith(prefix)) return;
	const input = message.content.slice(prefix.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);


 if(command === 'ping'){
    client.commands.get('ping').execute(message, commandArgs);
 } else if (command === 'you'){
     message.channel.send('yes, you');
 } else if (command ==='add'){

    if(message.member.roles.cache.has('189959019350196225')){
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user before giving them tokens!');}
        const taggedUser = message.mentions.users.first();
       
    
        
        const amount = parseInt(commandArgs[0]);

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        }
        currency.add(message.mentions.users.first().id, amount);
        message.channel.send(`${taggedUser.username} recieved their tokens!`);
    

        }else if(message.member.roles.cache.has('189958589169926144')){
            if (!message.mentions.users.size) {
                return message.reply('you need to tag a user before giving them tokens!');}
            const taggedUser = message.mentions.users.first();
           
        
            
            const amount = parseInt(commandArgs[0]);

            if (isNaN(amount)) {
                return message.reply('that doesn\'t seem to be a valid number.');
            }
            currency.add(message.mentions.users.first().id, amount);
            message.channel.send(`${taggedUser.username} recieved their tokens!`);
        

        }else if(message.member.roles.cache.has('780251906492465173')){
             
            
                // grab the "first" mentioned user from the message
                // this will return a `User` object, just like `message.author`
                if (!message.mentions.users.size) {
                    return message.reply('you need to tag a user before giving them tokens!');}
                const taggedUser = message.mentions.users.first();
               
            
                
                const amount = parseInt(commandArgs[0]);

                if (isNaN(amount)) {
                    return message.reply('that doesn\'t seem to be a valid number.');
                }
                currency.add(message.mentions.users.first().id, amount);
                message.channel.send(`${taggedUser.username} recieved their tokens!`);
            

            
        }else {
            message.channel.send('You are not authorized to use this command! <a:rip:780422015664259122> You rolled a natural 1 Deception check!');
        } 
  
 }else if (command === 'buy'){
     
    const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
if (!item) return message.channel.send(`That item doesn't exist.`);
if (item.cost > currency.getBalance(message.author.id)) {
	return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
}

const user = await Users.findOne({ where: { user_id: message.author.id } });
currency.add(message.author.id, -item.cost);
await user.addItem(item);

message.channel.send(`You've purchased one reroll, good luck!.`);
 }else if (command === 'help'){
        client.commands.get('help').execute(message, commandArgs, Discord);
 }else if (command === 'bal'){
    const target = message.mentions.users.first() || message.author;
return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)} epic item reroll tokens`);

	} else if (command === 'transfer') {
        const currentAmount = currency.getBalance(message.author.id);
        const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
        const transferTarget = message.mentions.users.first();
        
        if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
        if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
        if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);
        
        currency.add(message.author.id, -transferAmount);
        currency.add(transferTarget.id, transferAmount);
        
        return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
   
        }

 //this is where I will add more bot commands by using else if command like above



     
 
});




client.login('NzgwMjMwOTIwODcxNDc3MjY4.X7sEqw.Ahoiexmu9JvvX-hrIif6Ce4wV4Y');

