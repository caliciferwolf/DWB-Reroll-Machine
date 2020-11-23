module.exports = {
    name: 'add',
    description: "This is the add command. You use it to add rerolls to a users account",
    execute(message, args) {
        
        if(message.member.roles.cache.has('189959019350196225')){
            message.channel.send('add working!');
            }else if(message.member.roles.cache.has('189958589169926144')){
                message.channel.send('add working!');
           
            }else if(message.member.roles.cache.has('780251906492465173')){
                currency.add(message.author.id, 1);
                message.channel.send('You added x tokens to user!');
    
            }else {
                message.channel.send('You are not authorized to use this command!');
      
      
      
      
            }     
    }
}