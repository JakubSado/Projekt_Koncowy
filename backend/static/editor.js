class Editor {
  constructor(nick, data) {
    this.nick = nick;
    this.data = data;
  }
  
  getGames() {
    const headers = { "Content-Type": "application/json" };

    fetch("/getGames", { method: "post", headers }) // fetch
      .then((response) => response.json())
      .then((response) => {
        // if (response.data.length <= 0) {
        //   location.replace('/waitingRoom')
        // }

        console.log(response.waitingRoomData);
        let ob = response.waitingRoomData;

        ob.sort(function (a, b) {
          return parseFloat(a.id) - parseFloat(b.id);
        });
        
        if (ob.length == 0) {
          console.log("no games");
          this.newGame();
        } else {
          ob = ob[ob.length - 1];
          console.log(ob)

          let lastGame = ob.data;

          console.log(lastGame);

          let numberOfPlayers = Object.keys(lastGame).length;

          let allPlayersReady = 0;

          this.id = ob.id;
          this._id = ob._id;

          if (numberOfPlayers == 2) {
            console.log("2 players");
            this.newGame();
          } else {
          

          

          this.nick = document.getElementById("nick").value;

          let playerName = Object.keys(lastGame)[0]
          let playerNumber = playerName.slice(6,7)

          if(playerNumber == 1){
            playerNumber = 2
          }else{
            playerNumber = 1
          }

          this.data[playerName] = {
            nick: lastGame[playerName].nick,
            player: playerName,
          }


          this.player = "player" + playerNumber;

          this.data[this.player] = {
            nick: this.nick,
            player: this.player
          }   

            this.modifyDatabase();
          }
        }
      });
  }

  newGame() {
    this.nick = document.getElementById("nick").value;
   
    let randomNumber = Math.floor((Math.random() * 2) + 1)

    this.player = "player" + randomNumber;

    this.data[this.player] = {
        nick: this.nick,
        player: this.player
    }
    
    console.log(this.data);

    let body = JSON.stringify(this.data);
    let headers = { "Content-Type": "application/json" };
    // nagłowek czyli typ danych

    fetch("/newGame", { method: "post", body, headers }) // fetch
        .then(response => response.json())
        .then(
            data => {
                this._id = data._id;
                console.log("added new data")
            } // dane odpowiedzi z serwera
        )


  }

  modifyDatabase(){
    
    let body = JSON.stringify({id: this.id, waitingRoomData: this.data, _id: this._id} );
    let headers = { "Content-Type": "application/json" };
    // nagłowek czyli typ danych
    console.log(this.data);
    fetch("/modifyDB", { method: "post", body, headers }) // fetch
        .then(response => response.json())
        .then(
            data => {
                this._id = data._id;
                console.log("modified data");
                console.log(data)
            } // dane odpowiedzi z serwera
        )
  }

  init() {
    let dys = this;
    console.log("init");

    document.getElementById("submitNick").addEventListener("click", function(){
      dys.getGames();
        
    })

  }

  
}

let editor = new Editor("", {});

editor.init();


