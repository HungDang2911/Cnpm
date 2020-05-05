
const level = 9;
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
  
  function dropInTray(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let tray = document.getElementById('tray');
    tray.appendChild(document.getElementById(data));
  }

  function dropInOneDiv(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let div1 = document.getElementById('one-coin-col')
  
    if(data == 'one-coin-1' || data == 'one-coin-2' || data == 'one-coin-3'||data == 'one-coin-4' ||data == 'one-coin-5'|data == 'one-coin-6'
      || data == 'one-coin-7' || data == 'one-coin-8'|| data == 'one-coin-9' ){
        div1.appendChild(document.getElementById(data));
    } 
  }

  function dropInTenDiv(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let div10 = document.getElementById('ten-coin-col');
  
    if(data == 'ten-coin-1' || data == 'ten-coin-2' || data == 'ten-coin-3'||data == 'ten-coin-4' ||data == 'ten-coin-5'|data == 'ten-coin-6'
      || data == 'ten-coin-7' || data == 'ten-coin-8'|| data == 'ten-coin-9' ){
        div10.appendChild(document.getElementById(data));
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
    let rand = Math.floor(Math.random() * 90 + 10); 
    curPrice = rand;
    document.getElementById("price").innerHTML = "Giá: <br>"  + rand + "$";
  }

  function buy(callback){
    document.getElementById("buy-btn").addEventListener('click',callback);
  }

  function rightPrice(){
    let elem = document.getElementById("tray");   
    elem.innerHTML = "<br>Đã nhận tiền !";
    elem.style.opacity = '0.7';
    elem.style.background = 'white';
    let pos = 0;
    let id = setInterval(frame, 3);
    function frame() {
      if (pos == 300) {
        clearInterval(id);
        clearScreen();
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

  function wrongPrice(){
    let elem = document.getElementById("tray");   

    elem.innerHTML = "<br>Không đúng số tiền mất rồi !";
    elem.style.background = 'red';
    elem.style.opacity = '0.8';
    
    let pos = 100;
    let id = setInterval(frame, 10);
    function frame() {
      if (pos == 200) {
        clearInterval(id);
        clearScreen();
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
  
  function addPoint(level){
    let curPointSection = "point-section-" + level
    document.getElementById(curPointSection).style.background = 'blue';
  }

  function clearScreen(){
    let container = document.getElementById("play-scr");
    container.innerHTML= html;
  }                
    var html;
    window.onload = function(){
	  html = document.getElementById('play-scr').innerHTML;
  };     

  function checkPrice(){
    let tenCoinRemain = document.getElementById("ten-coin-col").childElementCount;
    let oneCoinRemain = document.getElementById("one-coin-col").childElementCount;
    sum = (9-tenCoinRemain)*10 + (9-oneCoinRemain) ;

    if( sum == curPrice ){
      rightPrice();
    }else{
      wrongPrice();
    }
  }

  function checkEndGame(){
    if (curLevel == level){
      document.getElementById("play-scr").style.display = 'none';
      document.getElementById("loading-bar").style.display = 'none';
      document.getElementById("ending-message").innerHTML ="Chúc mừng bạn đã hoàn thành màn chơi với "+ failTimes +" lần sai !";
      document.getElementById("ending-scr").style.display = 'block';
    }
  }

  function launchGame(){
    start(play);
    createPrice();
    buy(checkPrice);
  }

  launchGame();

  