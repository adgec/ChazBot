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


/*CONSOLE
var builder = require('botbuilder');
var connector = new builder.ConsoleConnector().listen(); //connect to console for chat
var bot = new builder.UniversalBot(connector);
*/
//Initial root dialog
bot.dialog('/', [
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('%s, Rome is in Romania', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.send('Hello %s! That is a great name!', session.userData.name);
        builder.Prompts.text(session, 'How can I help?')
        //session.endDialog();
    },
    function (session,results){
        session.endDialog();
    }
]);