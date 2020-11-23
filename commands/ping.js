module.exports = {
    name: 'ping',
    description: "This is the ping command.",
    execute(message, commandArgs) {
     
        message.channel.send('Pong! The bot is online!')
    }
}