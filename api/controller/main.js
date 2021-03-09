const main = (req, res) => {
    
    var PublicGcal = require('./helper/googlefetch')
        
        // https://calendar.google.com/calendar/u/0/r?cid=qrohj3qr45o45a4enu1i686kro@group.calendar.google.com
   API_key = 'AIzaSyBU2cBOzrFlAzAe_vhaS4iIF5MOXj-zvZY'
   calendarID = 'qrohj3qr45o45a4enu1i686kro@group.calendar.google.com';

    var gcal = new PublicGcal({API_key: API_key, calendarId: calendarID});

    gcal.getEvents(function (error, result) {
    // result is now array of events
        console.log(error,result)
        res.send(error,result)
    });
    res.json('ok')
}

module.exports = {
    main
}