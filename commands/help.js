module.exports = {
    name: 'help',
    description: "Embed test!",
    execute(message, commandArgs, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#23dd17')
        .setTitle('So you need help traveler?')
        .setImage('https://static.wikia.nocookie.net/criticalrole/images/1/10/BlackSalander_-_The_Traveler.jpg/revision/latest?cb=20180824205702')
        //This image was sourced from https://twitter.com/BlackSalander/status/1031952265593217024, I do not own this content, all rights reserved.
        .setDescription('Glad you came to the right place, let me guide you!')
        .addFields(

            {name: 'Reroll', value: 'Syntax: `-buy reroll,rr` This command is used to reroll your epic.'},
            {name: 'Add', value: 'Syntax: `-add [number] @user` This command is for admins and staff to add rerolls to your account'},
            {name: 'Bal', value: 'Syntax: `-bal (@user)` This command will show you how many rerolls you currently have.'},
            {name: 'Ping', value: 'Syntax: `-ping` This command is to test the bot and make sure it is online.'}
            
        )
        
         .setFooter(`Farewell ${message.author.tag}, and good luck on your adventures!`, message.author.displayAvatarURL);
        message.channel.send(newEmbed);
    }
}