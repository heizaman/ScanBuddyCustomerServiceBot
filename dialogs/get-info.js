var builder = require('botbuilder');


const library = new builder.Library('getInfo');

library.dialog('/', [
    function (session, info) {
        if(info.customername)
        	session.send('Owner: ' + info.customername);
        if(info.company)
        	session.send('Company: ' + info.company);
        if(info.series)
            session.send('Series: ' + info.series);
        if(info.modelno)
        	session.send('Model No.: ' + info.modelno);
        if(info.serialno)
            session.send('Serial No.: ' + info.serialno);
        if(info.warranty)
        	session.send('Warranty: ' + info.warranty);
        if(info.billedon)
            session.send('Bought: ' + info.billedon);
        session.endDialog();
    }
]);


module.exports = library;