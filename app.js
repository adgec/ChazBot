
// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder');

var appId = process.env.MY_APP_ID || "Missing appId";
var appSecret = process.env.MY_APP_SECRET || "Missing app secret";

//Create bot and dialogs
var bot = new builder.BotConnectorBot
({appId: process.env.MY_APP_ID, appSecret: process.env.MY_APP_SECRET});
bot.add('/', new builder.SimpleDialog( function(session){
    session.send('Hello World Again!');
}));

// Setup Restify Server
var server = restify.createServer();
server.post('api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});
