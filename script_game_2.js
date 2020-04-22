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
  }

  function createPrice(){
    var rand = Math.floor(Math.random() * 90 + 10); 
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
      } else {
        pos++; 
        elem.style.top = pos + "px"; 
      }
    }
  }

  
  function wrongPrice(){
    var elem = document.getElementById("tray");   

    elem.innerHTML = "<br>Không đúng số tiền mất rồi !";
    elem.style.background = 'red';
    elem.style.opacity = '0.8';
    
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos == 150) {
        clearInterval(id);
        resetScreen();
        createPrice();
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

  createPrice();
  buy(wrongPrice);