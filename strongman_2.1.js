/*  A reworked strongman_2.0.js
    which should be more elegant and follow the recomendations in
    https://developer.mozilla.org/en-US/docs/Games/Anatomy
    i.e. base the main game loop on the "window.requestAnimationFrame(function)" method
    which syncs the game timing with the browsers redraw cicle. See
    http://www.w3.org/TR/animation-timing/#requestAnimationFrame */

// _N_E_W_

// Game function
;(function() {
    document.getElementById('reset').addEventListener('click', resetGame, false);
    window.addEventListener('load', gameInitialize, false);

    // Pseudo-global Variables
    // Definiton of Animation Switch Levels 
    var powerLevelFactor = {
        hold: 3/4,
        push: 2/4,
        lift: 1/4
    };

    var roundCounter = document.getElementById('roundcount');
    roundCounter.defaultValue = 0;
    roundCounter.value = 0;
    
    var powerMeter = document.getElementById('powermeter');
    powerMeter.defaultValue = 0;
    powerMeter.maxValue = 100;
    powerMeter.lastValue = 0;
    
    var countDown = document.getElementById('countdown');
    countDown.defaultValue = 300;
    countDown.value = countDown.defaultValue;
    
    var spaceKey = document.getElementById('space');
    
    // Canvas
    var ctx = document.getElementById("weightliftCanvas").getContext("2d");
    var longPic = new Image();
    longPic.src = 'pics/laaang.jpg';
    var imgNr = 0;
    var iFrame = 0;
    var imgFrameNr = iFrame % 7;
    var tLast = 0;
    
    var tNow = window.performance.now();
    var gameActive = false;

    // Animation Loop
    function gameLoop(tStart) { 
        var stopLoop = window.requestAnimationFrame( gameLoop );
        var x = -600 * imgFrameNr + imgNr * 4200;
        
        if (tStart > (tLast + 150)) {  
            ctx.drawImage(longPic, x, 0);
            iFrame++;
            tLast = tNow;
        }    

        if (gameActive) {       // check for interactive mode             
            if (tStart > (tLast + 100)){ // 10 Hz
                countDown.value--;
                if ( countDown.value <= 0 ) {   // End Round
                    window.cancelAnimationFrame( stopLoop );
                    powerMeter.lastValue = powerMeter.value;
                    gameStateSelector("hold");
                    resetStats();
                    outputMessage("Round" + roundCounter.value + " - Final Power Level: "+powerMeter.lastValue);
                    window.setTimeout(gameStateSelector("initial"), 2000);
                } else {    
                    powerLoss(powerMeter.value, powerMeter.maxValue );
                }
            }
        }
    } // End Loop
    

    function powerUp() { 
        powerMeter.value++; 
    }

    // Ready State
    function gameStateSelector(param) {
        switch (param){
            case "play":
                gameOn();
                break;
            case "hold":
                gameHold();
                break;
            case "initial":
                gameInitialize();
                break;
        }
    }

    function gameInitialize() {
        document.getElementById('space').addEventListener('keypress', function(){if (spaceCheck) { gameStateSelector("play") } }, false);  
        document.getElementById('space').addEventListener('click', function(){ gameStateSelector("play") }, false);
        document.getElementById('space').innerHTML = "Click to Start!";
        if (document.getElementById('space').className !== 'button'){document.getElementById('space').className = 'button'}
    }

    // Active state 
    function gameOn() {
        document.getElementById('space').removeEventListener('keypress', function(){if (spaceCheck) { gameStateSelector("play") } }, false);   
        document.getElementById('space').removeEventListener('click', function(){ gameStateSelector("play") }, false);
        document.getElementById('space').addEventListener('keypress', function(){if (spaceCheck) {powerUp} }, false);
        document.getElementById('space').addEventListener('click', powerUp, false);
        document.getElementById('space').innerHTML = "Click Space!";
        roundCounter.value++;  
        gameActive = true;
    }

    // Hold state
    function gameHold() {
        document.getElementById('space').removeEventListener('keypress', function(){if (spaceCheck) {powerUp} }, false);
        document.getElementById('space').removeEventListener('click', powerUp, false);
        document.getElementById('space').innerHTML = "Hold your horses....";
        document.getElementById('space').className += ' deactivated';
        gameActive = false;
    }


    // Interrupt condition
    // if ( iFrame > 10) {
    //     
    // };
    
    // End of Main
    
    
    //  Resets
    function resetStats() {
        countDown.value = countDown.defaultValue;
        powerMeter.value = powerMeter.defaultValue;
    }

    function resetGame() {
        outputMessage("Finished in round "+ roundCounter.value);
        roundCounter.value = roundCounter.defaultValue;
        resetStats();
        gameHold();   
        countDown.value = countDown.defaultValue;
    }

    // Logs to footer List
    function logStuff(entry) {
        var logList = document.getElementById('log');
        var logEntry = document.createElement('li');
        logList.appendChild(logEntry);
        logEntry.innerHTML = entry;
    }

    // Logs to user message field
    function outputMessage(entry) {
        var msgField = document.getElementById('messages');
        var msgEntry = document.createElement('li');
        msgNumber = msgField.children.length;
        if (msgNumber > 4 ) {
            msgField.removeChild(msgField.firstElementChild);
        }
        msgField.appendChild(msgEntry);
        msgEntry.innerHTML = entry;
    }

    // PowerDown
    function powerLoss(power, max){
        var lift = max * powerLevelFactor.lift;
        var push = max * powerLevelFactor.push;
        var hold = max * powerLevelFactor.hold; 
        var random = Math.random() * 10;
        if (power > hold) {
            imgNr = 3;
            if (random > 4) {
                powerMeter.value -= 1;  
            }
        } else if (power > push) {
            imgNr = 2;
            if (random > 6) {
                powerMeter.value -= 1;  
            }
        } else if (power > lift) {
            imgNr = 1 ;
            if (random > 8) {
                powerMeter.value -= 1;  
            }  
        } else {
            imgNr = 0;
            if (random > 9) {
                powerMeter.value -= 1;  
            }
        }
    }

    // Checks if Spacebar was pressed
    function spaceCheck(kevent) {
        var key = kevent.which || event.keyCode;
        if (key === 32){
            return true;
        } else {
            return false;
        }
    }

    // Start Loop
    gameLoop(tNow);

}());   // End of Main


// Cancel next call for the Main loop, interrupting it:
// window.cancelAnimationFrame( MyGame.stopMain );


// Draw Canvas

// --- doas not work with anmated gifs! 
// --- use long comic strip like images that can be selectively presented

/* 
}  */

// _End_of_file_