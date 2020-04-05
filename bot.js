console.log('the bot is starting');

const five = require('johnny-five');
const Oled = require('oled-js');
const Serialport = require("serialport");

// const Firmata = require("firmata");
// const board = new Firmata(new Serialport("/dev/cu.usbmodem1421"), () => {
//     console.log("This function started");
//     board.pinMode(13,OUTPUT);
//     board.digitalWrite(13,0);
//    console.log("this function ended");

// });
 

var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(13);
  led.off();
});

// function firmReady(){
//     board.on("ready", () => {
//      console.log("This function started");
//      board.pinMode(13,INPUT);
//      board.digitalWrite(13,0);
//     console.log("this function ended");
//     });
// }

//  board.on("ready", async() => {
//     await console.log("This function started");
//     await board.pinMode(13,INPUT);
//     await board.digitalWrite(13,0);
//     console.log("this function ended");
// });

var Twit = require('twit');

var config = require('./config');
console.log(config);
var T = new Twit(config);    
var tweets;
var oldTweets;

var params = {
    q: '#MTAPoliceJayStreet',
    count: 1
}
function gotData(err, data, response) {
    tweets = data.statuses;
    // console.log(data);
    // console.log(tweets);
    for (var i = 0; i < tweets.length; i++){
    console.log(tweets[i].text);
    var led = new five.Led(13);
    led.on();
    // setTimeout(() => {
    //     led.off()
    // },5000)
    }
  }

setInterval(updateTweets,10000)

function updateTweets(){

    // oldTweets = tweets;
    T.get('search/tweets', params, gotData)
    // if(tweets!=oldTweets){

    //     serial.send(brightness = ON)
    // } else{
    //     serial.send(brightness = OFF)
    // }
}
