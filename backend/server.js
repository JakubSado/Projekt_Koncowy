//zmienne, stałe

var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

var Datastore = require('nedb');

var db = new Datastore({
    filename: 'games.db',
    autoload: true
});
var id = 0;

//funkcje na serwerze obsługujace konkretne adresy w przeglądarce
var path = require("path");
app.use(express.static('static'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/startingScreen.html"));
})

app.get("/waitingRoom", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/waitingRoom.html"));

})

app.post("/getGames", function (req, res) {

    db.find({}, function (err, docs) {
        let games = JSON.stringify({ "waitingRoomData": docs });
        res.end(games)
    });
})

app.post("/newGame", function (req, res) {

    console.log("newGame");

    let game = {
        id: id,
        data: req.body
    }
    id++;

    db.insert(game, function (err, newDoc) {
        game._id = newDoc._id;
        res.end(JSON.stringify(game));
    })

})

app.post("/modifyDB", function (req, res) {


    let game = req.body;

    console.log(req.body)

    db.update({ _id: req.body._id }, { $set: { data: req.body.waitingRoomData } }, function (err, numReplaced) {
        console.log("replaced---->" + numReplaced);
        res.end(JSON.stringify(game))
    });

})




//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})