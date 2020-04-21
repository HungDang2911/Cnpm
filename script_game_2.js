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
    document.getElementById("price").innerHTML = "Giá tiền: <br>"  + rand + "$";
  }

  function buy(callback){
    document.getElementById("buy-btn").addEventListener('click',callback);
  }


  createPrice();