/*var textElem= document.getElementById('text');

var shootType=Math.random() < 0.5 ? 2:3;

if (shootType===2){
    if(Math.random()<0.5){
        textElem.innerHTML='컴퓨터가 2점슛을 성공시켰습니다!';
    } else{
        textElem.innerHTML='컴퓨터가 2점슛을 실패했습니다.';
    }
} else{
    if(Math.random()<0.33){
        textElem.innerHTML='컴퓨터가 3점슛을 성공시켰습니다!';
    } else{
        textElem.innerHTML='컴퓨터가 3점슛을 실패했습니다.';
    }
}

function onComputerShoot(){
    var computer.score=0;
    var textElem = document.getElementById('text');
    var shootType=Math.random() <0.5?2:3;

    if (shootType===2){
        if(Math.random()<0.5){
            textElem.innerHTML='컴퓨터가 2점슛을 성공시켰습니다!';

            computer.score+=2;

            var computer.scoreElem=document.getElementById('computer-score');
            computer.scoreElem.innerHTML=computer.score;
        } else{
            textElem.innerHTML='컴퓨터가 2점슛을 실패했습니다.';
        }
    }
}

//다시시작
*/

var computer = {
    score:0,
    Percent2:0.5,
    Percent3:0.33
};

var user = {
    score:0,
    Percent2:0.5,
    Percent3:0.33
};

var game={
    isComputerTurn:true,
    shotsLeft: 7
};

function showText(s){
    //var textElem=document.getElementById('text');
    //textElem.innerHTML=s;
    var $textElem=$('#text');
    $textElem.fadeOut(400,function(){
        $textElem.html(s);
        $textElem.fadeIn(100);
    });
    
}

function updateComputerScore(score){
    computer.score+=score;
    //var scoreElem=document.getElementById('computer-score');
    //computer.scoreElem.innerHTML=computer.score
    var $comScoreElem=$('#computer-score');
    $comScoreElem.animateNumber({
        number:computer.score
    });
}

function updateUserScore(score){
    user.score+=score;
    //var scoreElem=document.getElementById('user-score');
    //user.scoreElem.innerHTML=user.score;
    var $userScoreElem= $('#user-score');
    $userScoreElem.animateNumber({
        number:user.score
    });
}

function disabledComputerButtons(flag){
    /*var computerButtons=document.getElementsByClassName('btn-computer');
    for (var i = 0; i<computerButtons.length; i++){
        computerButtons[i].disabled=flag; */
    $('.btn-computer').prop('disabled',flag);
}

function disabledUserButtons(flag){
    /*var userButtons=document.getElementsByClassName('btn-user');
    for (var i = 0; i<userButtons.length; i++){
        userButtons[i].disabled=flag; */
    $('.btn-user').prop('disabled',flag);
}

function updateAI(){
    var diff=user.score-computer.score;

    if(diff>=10){
        computer.Percent2=0.7;
        computer.Percent3=0.43;
    } else if(diff>=6){
        computer.Percent2=0.6;
        computer.Percent3=0.38;
    } else if(diff<= -10){
        computer.Percent2=0.3;
        computer.Percent3=0.23;
    } else if(diff<= -6){
        computer.Percent2=0.4;
        computer.Percent3=0.28;
    }
}

function onComputerShoot(){

    if (!game.isComputerTurn){
        return;
    }

    updateAI();

    var shootType=Math.random() <0.5?2:3;
     
    /*if (shootType===2){
        if (Math.random()<computer.Percent2){
            showText('컴퓨터가 2점슛을 성공했습니다!');
            updateComputerScore(2);
        }else{
            showText('컴퓨터가 2점슛을 실패했습니다.');
        }
    }else{
        if (Math.random()<computer.Percent3){
            showText('컴퓨터가 3점슛을 성공했습니다!');
            updateComputerScore(3);
        } else{
            showText('컴퓨터가 3점슛을 실패했습니다.');
        }
    }*/

    if (Math.random()<computer['Percent'+shootType]){
        showText('computer succeeded: '+shootType);
        updateComputerScore(shootType);
    } else {
        showText('computer failed: '+shootType);
    }

    game.isComputerTurn=false;

    disabledComputerButtons(true);
    disabledUserButtons(false);
  
}

function onUserShoot(shootType){
    
    if (game.isComputerTurn){
        return;
    }

    /*if (shootType===2){
        if (Math.random()<user.Percent2){
            showText('2점슛이 성공했습니다!');
            updateUserScore.score(2);
        } else{
            showText('2점슛이 실패했습니다.');
        }
    }else{
        if (Math.random()<user.Percent3){
            showText('3점슛이 성공했습니다!'); 
            updateUserScore.score(3);
        }else{
            showText('3점슛이 실패했습니다.');
        }
    }*/

    if(Math.random()<user['Percent'+shootType]){
        showText('succeeded: '+shootType);
        updateUserScore(shootType);
    } else{
        showText('failed: '+shootType);
    }

    game.isComputerTurn=true;

    disabledComputerButtons(false);
    disabledUserButtons(true);

    game.shotsLeft--;

    //var shotsLeftElem=document.getElementById('shots-left');
    //shotsLeftElem.innerHTML=shotsLeft;
    var $shotsLeftELem= $('#shots-left');
    $shotsLeftELem.html(game.shotsLeft);

    if (game.shotsLeft===0){
        if(user.score>computer.score)
            showText('you won!');
        else if(user.score===computer.score)
            showText('draw');
        else if(user.score<computer.score)
            showText('you lost!');

        disabledComputerButtons(true);
        disabledUserButtons(true);
    }
}

//DOMContentLoaded 이벤트처럼 쓰이는 편의함수. DOMContentLoaded 이벤트가 발생했을 때 실행시켜줌. 
$(function() {

    showText(3);
    setTimeout(function() {

         showText(2);
         setTimeout(function(){

              showText(1);
              setTimeout(function(){

                   showText('starting with computer!');
                    disabledComputerButtons(false);
             },1000);
        },1000);
    } , 1000);

});