var $start = document.querySelector("#start")
var $game = document.querySelector("#game")
var $time = document.querySelector("#time")
var $timeheader = document.querySelector( "#time-header")
var $resultheader = document.querySelector ("#result-header")
var $result = document.querySelector("#result")
var isStGame = false
var $gametime = document.querySelector("#game-time")

var score = 0

$start.addEventListener("click", stgame)
$game.addEventListener("click", cl)
$gametime.addEventListener("input", timeGame)

function timeGame() {
var time= +$gametime.value
$time.textContent= time.toFixed(1)
show($timeheader)
hide($resultheader)}

function stgame(){
    timeGame()
    $gametime.setAttribute("disabled", true)
    isStGame= true
    $game.style.backgroundColor = "#fff"
    hide($start)
    

    var interval = setInterval (function(){
        var time = $time.textContent
        // console.log("interval", $time.textContent )
        if (time<=0){
            clearInterval(interval)
            endGame()
        }
        else
        $time.textContent= (time - 0.1).toFixed(1)
    }, 100)


    renderBox()
}
function setGameScore () {
    $result.textContent = score.toString()

}

function hide($el){
    $el.classList.add ("hide")
}

function show($el){
    $el.classList.remove ("hide")
}

function endGame(){
    $gametime.removeAttribute("disabled")
    isStGame= false
    setGameScore()
    show($start)
    $game.innerHTML= ""
    $game.style.backgroundColor= "#ccc"
    hide($timeheader)
    show($resultheader)


}

function cl(event){
    if (!isStGame){
        return
    }
   
    if (event.target.dataset.box){
        score++
        renderBox()

    }   
}
   

function renderBox(){

    $game.innerHTML=""
    var box = document.createElement("div")
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize

    box.style.height= box.style.width= boxSize + "px"
    box.style.position= "absolute"
    box.style.backgroundColor = "#000"
    box.style.top = getRandom(0, maxTop)+ "px"
    box.style.left = getRandom(0,maxLeft)+ "px"
    box.style.cursor = "pointer"
    box.setAttribute("data-box", "true")

    $game.insertAdjacentElement("afterbegin", box)

}

 function getRandom(min, max){
     return Math.floor(Math.random() * (max-min)+min)
 }