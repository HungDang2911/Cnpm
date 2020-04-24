
var level = 9;
var curLevel = 0 ;
var sum = 0;
var curPrice ;
var failTimes = 0;

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    if(data == 'one-coin'){
      sum += 1;
    }else{
      sum += 10;
    }

  }

  function start(callback){
    document.getElementById("start-btn").addEventListener('click',callback);
  }
  
  function play(){
    document.getElementById("loading-bar").style.display = 'block';
    setTimeout(function(){
      document.getElementById("play-scr").style.display = 'block';
      document.getElementById("start-scr").style.display = 'none';
    }, 3000);
  }

  function createPrice(){
    var rand = Math.floor(Math.random() * 90 + 10); 
    curPrice = rand;
    document.getElementById("price").innerHTML = "Giá: <br>"  + rand + "$";
  }

  function buy(callback){
    document.getElementById("buy-btn").addEventListener('click',callback);
  }

  function rightPrice(){
    var elem = document.getElementById("tray");   
    elem.innerHTML = "<br>Đã nhận tiền !";
    elem.style.opacity = '0.7';
    elem.style.background = 'white';
    var pos = 0;
    var id = setInterval(frame, 3);
    function frame() {
      if (pos == 300) {
        clearInterval(id);
        resetScreen();
        createPrice();
        sum = 0;
        curLevel++;
        checkEndGame();
        addPoint(curLevel);
        buy(checkPrice);
        
      } else {
        pos++; 
        elem.style.top = pos + "px"; 
      }
    }
  }

  function addPoint(level){
    var curPointSection = "point-section-" + level
    document.getElementById(curPointSection).style.background = 'blue';
  }
  
  function wrongPrice(){
    var elem = document.getElementById("tray");   

    elem.innerHTML = "<br>Không đúng số tiền mất rồi !";
    elem.style.background = 'red';
    elem.style.opacity = '0.8';
    
    var pos = 100;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos == 200) {
        clearInterval(id);
        resetScreen();
        createPrice();
        sum = 0;
        buy(checkPrice);
        failTimes ++;
        addPoint(curLevel);
      } else {
        pos++; 
        elem.style.top = pos + "px"; 
      }
    }
  }

  function resetScreen(){
    var container = document.getElementById("play-scr");
    container.innerHTML= html;
}                
    var html;
    window.onload = function(){
	  html = document.getElementById('play-scr').innerHTML;
};     

  function checkPrice(){
    if( sum == curPrice ){
      rightPrice();
    }else{
      wrongPrice();
    }
  }

  function checkEndGame(){
    if (curLevel == level){
      endGame();
    }
  }

  function endGame(){
    document.getElementById("play-scr").style.display = 'none';
    document.getElementById("ending-message").innerHTML ="Chúc mừng bạn đã hoàn thành màn chơi với "+ failTimes +" lần sai !";
    document.getElementById("ending-scr").style.display = 'block';
  }

  start(play);
  createPrice();
  buy(checkPrice);
  