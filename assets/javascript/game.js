var wordGuessGame = {
        wordsToPick: {
            cow: {
                picture: "cow.jpg",
                sound: "moo",
                preview: "https://files.fm/down.php?i=ggq52wrsz",
            },
            pig: {
                picture: "",
                sound: "oink",
                preview: "",
            },
            duck: {
                picture: "",
                sound: "Quack",
                preview: "",
            }
        },
        //variables that set the state of our word guess game

        wordInPlay = null,
        lettersOfTheWord = [],
        matchedLetters = [],
        guessedLetters = [],
        guessesLeft = 0,
        totalGuesses = 0,
        letterGuessed = null,
        wins = 0,

        //setupgame method runs when page first loads

        setupGame: function () {
            //pick a random word
            var objKeys = Object.keys(this.wordsToPick);
            this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

            //split the word into individual letters

            this.lettersOfTheWord = this.wordInPlay.split("");
            this.rebuildWordView();

            //sets the number of guesses and renders them to html

            this.processUpdateTotalGuesses();

        },

        //fuction runs when user presses a letter 

        updatePage: function (letter) {
            //if the user has no guesses left restart the page
            if (this.guessesLeft === 0) {
                this.restartGame();
            } else {
                //check for incorrect guesses
                this.updateGuesses(letter);
                //check for correct guesses
                this.updateMatchedLetters(letter);
                //rebuild the view of the word. unguessed letters ar '_'
                this.rebuildWordView();
                //if the user wins restart the game
                if (this.updateWins() === true) {
                    this.restartGame();
                }
            }
        },

        //this function runs when the user guesses a wrong letter they have not guessed before
        updateGuesses: function (letter) {
            //if the letters are not in the array
            if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
                //add letter to the array
                this.guessedLetters.push(letter);
                //decrease guesses by 1 
                this.guessesLeft--;
                //update guesses left and letters displayed
                document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
                document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(", ");
            }
        },

        // This function sets the initial guesses the user gets.
        processUpdateTotalGuesses: function () {
            // The user will get more guesses the longer the word is.
            this.totalGuesses = this.lettersOfTheWord.length + 5;
            this.guessesLeft = this.totalGuesses;

            // Render the guesses left to the page.
            document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
        },

        //this function runs if the user makes a successful guess

        updateMatchedLetters: function (letter) {
            for (var i = 0; i < this.lettersOfTheWord.length; i++) {
                if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                    this.matchedLetters.push();
                }
            }
        },
        //this functions builds the display of the words being guessed
        rebuildWordView: function(){
            //start with an empty string
            var wordView = "";

            for (var i = 0; i < this.lettersOfTheWord.length; i++){
                //if the correct letter was guessed display the letter
                if(this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1){
                    wordView += this.lettersOfTheWord[i];
                }
                //if the letter was not correct display '_' instead
                else {
                    wordView += "&nbsp;_&nbsp;";
                }
            }
            //update the page to show current results

           document.querySelector("#current-word").innerHTML = wordView;
        },

        //function that resets all the variables

        restartGame: function(){
            document.querySelector("#guessed-letters").innerHTML = "";
            this.wordInPlay = null;
            this.lettersOfTheWord = [];
            this.matchedLetters = [],
            this.guessedLetters = [],
            this.guessesLeft = 0,
            this.totalGuesses = 0,
            this.letterGuessed = null,
            this.setupGame();
            this.rebuildWordView();

        },
        //function to see wins

        updateWins: function(){
            var win;
            //if you havent matched any letters we set win to false

            if (this.matchedLetters.length === 0){
                win = false;
            }else{
                win = true;
            }
            for (var i = 0; i < this.lettersOfTheWord.length; i++){
                if(this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === 1){
                    win = false;
                }
            }
            if(win){
                //increase wins
                this.wins = this.wins + 1;

                //update wins on the page

                document.querySelector("#wins").innerHTML = this.wins;

                //update the animal name and sound

                document.querySelector("#music").innerHTML = this.wordsToPick[this.wordInPlay].sound + " is " + this.wordInPlay;
            }
        }

    },