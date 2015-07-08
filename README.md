# Strongman
## A simple JS game for practice
JavaScript is the programming language of choice for this little practice project, as it does not require a server to run and seems well suited to create interactive effects based on recent html5 without too much effort.
The aim of the game is to help the strongman lift the barbell.
The *game mechanics* are extremely simple:
The game is in pause mode until started. 
When started a count down is activated during which the user has to push the button as often as possible.
This charges the power meter which in turn activates a grphical feedback, when passing a cetain threashold.
Neither the graphics nor the code are finished. 
## v1 
worked by selectively displaying animated gifs and timing the game via the `setTimeOut()` function.
## v2 
* selectively display parts of a jpg containing all the animation frames in a `<canvas>` element. Using this html5 element opens vast possibilites that `<img>` cannot provide
* is timed via the `window.requestAnimationFrame()` method and a conditional to provide intervalls of target time. 
---
_It is fun to see ones first code grow =)_
