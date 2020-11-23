module.exports = {
    name: 'bal',
    description: "This is the bal command. The user will use this command to check their reroll balance.",
    execute(message, args) {
        const target = message.mentions.users.first() || message.author;
return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);

    }
}