var builder = require('botbuilder');


const library = new builder.Library('getHelp');


var TouchPad = 'TouchPad not working';
var Speed = 'Laptop slowing down';
var LaptopToTV = 'Cant connect to TV';
var ExitHelp = 'Exit';

library.dialog('/', [
    function (session) {
        builder.Prompts.choice(session,
            'What problem are you facing?',
            [Speed, LaptopToTV, TouchPad, ExitHelp],
            { listStyle: builder.ListStyle.button }
        );
    },
    function (session, result) {
        if (result.response) {
            switch (result.response.entity) {
                case TouchPad:
                    session.send(`You can try the following steps. If they don't work, please register a complaint.`);
                        session.send(`1. Please install the latest driver using Dell Driver Utility.`);
                        session.send(`2. Please try restarting your laptop.`);
                        session.endDialog('Thank You');
                    break;
                case Speed:
                    session.send(`You can try the following steps. If they don't work, please register a complaint.`);
                    session.send(`1. Please stop any useless apps using task manager.`);
                    session.send(`2. Please clean the temporary files folder.`);
                    session.endDialog('Thank You');
                    break;
                case LaptopToTV:
                    session.send(`You can try the following steps. If they don't work, please register a complaint.`);
                    session.send(`1. Please make sure your HDMI cable is tightly connected.`);
                    session.send(`2. Please make sure your TV is compatible for the connection.`);
                    session.endDialog('Thank You');
                    break;
                case ExitHelp:
                    session.endDialog('Exited Help');
                    break;
                default:
                    session.send(`I am sorry but I didn't understand that. I need you to select one of the options below.`);
                    session.reset();
            }
        } else {
            session.send(`I am sorry but I didn't understand that. I need you to select one of the options below.`);
            session.reset();
        }
    }
]).cancelAction('cancel', null, { matches: /^cancel/i });


module.exports = library;