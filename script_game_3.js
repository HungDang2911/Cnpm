
var curLevel = 0;
var level = 4;
var failTimes = 0;
var curBall = level;
function start(callback){
    document.getElementById("start-scr").addEventListener('click',callback);
}
function showPlayScr(){
    document.getElementById("play-scr").style.display = 'block';
    document.getElementById("start-scr").style.display = 'none';
}



function createRandomNumber(){
    var rand = Math.floor(Math.random() * 90 + 10); 
    if( rand % 10 == 0){
        rand ++;
    }
    document.getElementById("number").innerHTML = rand;
}
function check(callback1){
    document.getElementById("check-btn").addEventListener('click',callback1);
}
function moveBall(scoreBallNum){
    document.getElementById("scoreBallNum").style.marginLeft +=400;
}

function compare(){

    var blank1 = document.getElementById("blank-1").value;
    var blank2 = document.getElementById("blank-2").value;
    var num = document.getElementById("number").innerHTML;

    if(blank1 == "" || blank2 ==""){
        document.getElementById("inform").innerHTML = "Hãy điền đủ <br> số";
    }else if( blank1 % 10 != 0 || blank2  == 0 || blank1<=9 ){
        document.getElementById("inform").innerHTML = "Số không hợp <br> lệ";
    }else{
        document.getElementById("inform").innerHTML = "Hãy điền số <br>vào chỗ trống ";
        blank1 = Number(blank1);
        blank2 = Number(blank2);
        num = Number(num);
        if ( num == blank1 + blank2){
            if(curBall != level){
                var tempBall = curBall + 1;
                document.getElementById("score-ball-"+ curBall).style.marginRight= "-280px";
            }
            document.getElementById("score-ball-"+ curBall).style.marginLeft= "280px";
            curLevel ++;
            curBall--;
            createRandomNumber();   
            document.getElementById('blank-1').value = '';
            document.getElementById('blank-2').value = '';  
             
        if(curLevel == level ){
            document.getElementById("play-scr").style.display ='none';
            document.getElementById("ending-scr").style.display = 'block';
            document.getElementById("ending-text").innerHTML = "Bạn đã qua màn với "+ failTimes +" lần sai";
        }
        }else {
            document.getElementById("inform").innerHTML = "Tiếc quá <br> Sai mất rồi ";
            failTimes ++;
        } 
    }    
}

   
    start(showPlayScr);
    createRandomNumber();
    check(compare);
    