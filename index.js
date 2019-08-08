var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    // Add a 'data' event handler to this instance of socket
    // set timeout
    var tid = setTimeout(mycode, 2000);
    var i = 0;
    var TMCDate=['#1 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 '#2 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 '#3 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 '#4 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 '#5 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 'Spare                                         short\n',
                 '#1 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 '#2 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 '#3 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 '#4 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 '#5 STD ROLLING FORCE (WS+BENDER)    ton       short\n',
                 'Spare                                         short\n',
                 '#1 STD ROLLING SPEED                10-퉙pm   short\n',
                 '#2 STD ROLLING SPEED                10-퉙pm   short\n',
                 '#3 STD ROLLING SPEED                10-퉙pm   short\n',
                 '#4 STD ROLLING SPEED                10-퉙pm   short\n',
                 '#5 STD ROLLING SPEED                10-퉙pm   short\n',
                 'Spare                                         short\n',
                 '#1 STD IMR SHIFT (UC ?)              ?        short\n',
                 '#2 STD IMR SHIFT (UC ?)              ?        short\n',
                 '#3 STD IMR SHIFT (UC ?)              ?        short\n',
                 '#4 STD IMR SHIFT (UC ?)              ?        short\n',
                 '#5 STD IMR SHIFT (UC ?)              ?        short\n',
                 '#1 STD IMR BENDER                    %        short\n',
                 '#2 STD IMR BENDER                    %        short\n',
                 '#3 STD IMR BENDER                    %        short\n',
                 '#4 STD IMR BENDER                    %        short\n',
                 '#5 STD IMR BENDER                    %        short\n',
                 '#6 STD IMR BENDER                    %        short\n',
                 'Spare                                         short\n',
                 'AFTER #5 STD (X-RAY 5D1, 5D2)        -        short\n',
                 'STD ROLL GAP (WS)                    10-?     short\n',
                 'STD ROLL GAP (WS)                    10-?     short\n',
                 '#3 STD ROLL GAP (WS)                 10-?     short\n',
                 '#4 STD ROLL GAP (WS)                 10-?     short\n',
                 '#5 STD ROLL GAP (WS)                 10-?     short\n']
   
    function mycode() {
        if(i<TMCDate.length){
            sock.write(TMCDate[i]);
        }else{
            i=0;
        }
        tid = setTimeout(mycode, 2000); // repeat myself
        i++;
    }

    function abortTimer() { // to be called when you want to stop the timer
        clearTimeout(tid);
    }
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
    });
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
