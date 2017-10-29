var builder = require('botbuilder');
var restify = require('restify');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});


// Create chat bot
var connector = new builder.ChatConnector({
    appId: /*process.env.MICROSOFT_APP_ID*/'4608417b-65bb-4f50-8648-19ed2962f403',
    appPassword: /*process.env.MICROSOFT_APP_PASSWORD*/'pfghBJCXF26+~%prpDB780*'
});


//Global Option Variables
const ExitOption = 'Exit';
const RegisterComplaintOption = 'Register Complaint';
const GetInfoOption = 'Get info related to this product';
const GetHelpOption = 'Get help for this product';


//Variables
var info = {
    serialno: "44356454",
    customername:"Aman",
    waranty:"1 year + 2 years extended",
    billedon:"2017-10-29 12:26:05",
    company:"Dell",
    series:"XPS",
    modelno:"XPS L502X"

};


var bot = new builder.UniversalBot(connector, [
    function (session) {
    	builder.Prompts.choice(session,
            'Hi! How may i help you?',
            [GetHelpOption, GetInfoOption, RegisterComplaintOption, ExitOption],
            { listStyle: builder.ListStyle.button }
        );
    },
    function (session, result) {
        if (result.response) {
            switch (result.response.entity) {
                case GetHelpOption:
                    session.beginDialog('getHelp:/');
                    break;
                case GetInfoOption:
                    session.beginDialog('getInfo:/', info);
                    break;
                case RegisterComplaintOption:
                    var result = session.beginDialog('registerComplaint:/');
                    break;
                case ExitOption:
                    session.endDialog('Thank You');
                    break;
                default:
            		session.send(`I am sorry but I didn't understand that. I need you to select one of the options below.`);
                    session.reset();
            }
        } else {
            session.send(`I am sorry but I didn't understand that. I need you to select one of the options below.`);
        	session.reset();
        }
    },
    function (session, result) {
        if (result.complaint) {
        	session.send('Your complaint is : ' + result.complaint);
            session.endDialog('Our customer care executive will contact you soon. Thank You!');
        }
    }
]);


//Sub-Dialogs
bot.library(require('./dialogs/register-complaint'));
bot.library(require('./dialogs/get-info'));
bot.library(require('./dialogs/get-help'));


server.post('/api/messages', connector.listen());