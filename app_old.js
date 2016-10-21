// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

//var appId = process.env.MY_APP_ID || "Missing appId";
//var appSecret = process.env.MY_APP_SECRET || "Missing app secret";

// Setup Restify Server
var server = restify.createServer();

server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));

server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: process.env.MY_APP_ID, appPassword: process.env.MY_APP_SECRET }); 
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', function (session) {
    session.send("Rome is in Romania");
});