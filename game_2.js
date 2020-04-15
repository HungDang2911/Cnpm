


class game {
    constructor(){
        var curPrice = 0;
        this.showSum(curPrice);
        this.showPrice();
        this.onClickPriceButton(curPrice,this.showSum);
        this.onClickSkipButton();
        this.onClickCheckButton(curPrice,this.checker);
    }
   
        onClickCheckButton(curPrice,callback){
            document.getElementById("checkbutton").addEventListener('click',function() {
               callback(curPrice);
        });
        }


        onClickSkipButton(){
            document.getElementById("skip").addEventListener('click',function() {
                var g =  new game();
                document.getElementById("pin1").src = "images/red.png";

                document.getElementById("skip").innerHTML = "Het luot bo qua" ;
                var att = document.createAttribute("class");       
                att.value = "disabled";
                document.getElementById("skip").setAttributeNode(att);
            });
        }

     
        showPrice(){
            var rd = Math.floor(Math.random() * 100); 
            document.getElementById("price").innerHTML = rd + "$";
        }
   
        showSum(curPrice) {
            document.getElementById("sum").innerHTML = "Tong tien: " + curPrice + "$";
        }
    

        onClickPriceButton(curPrice, callback){
            document.getElementById("bt10").addEventListener('click',function(){
               curPrice += 10;
               callback(curPrice); 
            } );
            document.getElementById("bt5").addEventListener('click',function(){
                curPrice += 5;
                callback(curPrice); 
             } );
            document.getElementById("bt2").addEventListener('click',function(){
                curPrice += 2;
                callback(curPrice); 
             } );
            document.getElementById("bt1").addEventListener('click',function(){
                curPrice += 1;
                callback(curPrice); 
             } );
        }

        checker(curPrice){
            if( (curPrice + "$") ==  document.getElementById("price").innerHTML ){
                document.getElementById("sum").innerHTML = "Chinh xac !";
            }else{
                document.getElementById("sum").innerHTML = "Sai !";
                document.getElementById("pin2").src = "images/red.png";
            }
        }
        
      
      
  
}
var g =  new game();