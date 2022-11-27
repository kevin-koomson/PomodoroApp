/**-------TIMER DATA--------*/
//declarations
const pageMinutes=document.getElementById('minutes');
const pageSeconds=document.getElementById('seconds');
const progressBar=document.querySelector('.progress-bar');
const starter=document.getElementById('start');
const pauser=document.getElementById('pause');
const restarter=document.getElementById('restart');
const resumer=document.getElementById('resume');

const timerData={
    //default values.
    minute: 0,
    second: 10,
    activeColor: 'var(--orange-theme)',
    orangeColor: 'var(--orange-theme)',
    cyanColor: 'var(--cyan-theme)',
    purpleColor: 'var(--purple-theme)',
    canPause: false,
    cycles: {
        secondsStudied: 0,
        minutesStudied: 0,
        sessionsDone: 0,
        cyclesDone:0,
        breakCount: 0
    },
    mode: {
        pomo: true,
        shortB: false,
        longB: false
    },
    shortBreak:{
        minutes:0,
        seconds:5
    },
    longBreak:{
        minutes:0,
        seconds:12
    },
    pausedValue:{
        minutes: 0,
        seconds: 0
    },
    //methods
    pauseMethod(){
        this.pausedValue.minutes=pageMinutes.innerHTML;
        this.pausedValue.seconds=pageSeconds.innerHTML;
        timerData.canPause=true;
        pauser.classList.add('hidden');
        resumer.classList.remove('hidden');
    },
    resumeMethod(){
        timerData.canPause=false;
        resumer.classList.add('hidden');
        pauser.classList.remove('hidden');
        countdown(this.pausedValue.minutes,this.pausedValue.seconds);
        if(this.mode.pomo){
            if(this.cycles.sessionsDone%3==0) timerData.longBreakMode()
            else timerData.shortBreakMode();
        }
    },
    pomoMode(){
        console.log('pomo mode');
        this.mode.pomo=true;
        this.mode.shortB=false;
        this.mode.longB=false;
         document.getElementById('pomodoro-button').classList.add('active');
         document.getElementById('short-break-mode-button').classList.remove('active');
         document.getElementById('long-break-mode-button').classList.remove('active');
         pageMinutes.innerHTML=numDisp(this.minute); pageSeconds.innerHTML=numDisp(this.second);
         starter.classList.remove('hidden');
         shortBreakStart.classList.add('hidden');
         progressBar.style.background='conic-gradient(var(--orange-theme) 360deg,#161932 0deg)';
    },
    shortBreakMode(){
        console.log('short break mode');
        this.mode.pomo=false;
        this.mode.shortB=true;
        this.mode.longB=false;
        document.getElementById('short-break-mode-button').classList.add('active');
        document.getElementById('pomodoro-button').classList.remove('active');
        pageMinutes.innerHTML=numDisp(this.shortBreak.minutes); pageSeconds.innerHTML=numDisp(this.shortBreak.seconds);
        progressBar.style.background='conic-gradient(var(--orange-theme) 360deg,#161932 0deg)';
        shortBreakStart.classList.remove('hidden');
        starter.classList.add('hidden');
        restarter.classList.add('hidden');
    },
    longBreakMode(){
        console.log('long break mode');
        this.mode.pomo=false;
        this.mode.shortB=false;
        this.mode.longB=true;
        document.getElementById('pomodoro-button').classList.remove('active');
        document.getElementById('short-break-mode-button').classList.remove('active');
        document.getElementById('long-break-mode-button').classList.add('active');
        pageMinutes.innerHTML=numDisp(this.longBreak.minutes); pageSeconds.innerHTML=numDisp(this.longBreak.seconds);
        progressBar.style.background='conic-gradient(var(--orange-theme) 360deg,#161932 0deg)';
        longBreakStart.classList.remove('hidden');
        starter.classList.add('hidden');
        restarter.classList.add('hidden');
    },
}
//first run after load
pageMinutes.innerHTML=numDisp(timerData.minute);
pageSeconds.innerHTML=numDisp(timerData.second);

/**----------EVENT HANDLERS----------------- */

//start eventhandler
starter.addEventListener("click",()=>{
    countdown(timerData.minute,timerData.second);
});

//restart event handler
restarter.addEventListener("click",()=>{
    timerData.startMethod();
    restarter.classList.add('hidden');
});

//pause event handler
pauser.addEventListener("click",()=>{
    timerData.pauseMethod();
});

//resume event handler
resumer.addEventListener("click",()=>{
    timerData.resumeMethod(); 
});

//shortBreakStart event listener
const shortBreakStart= document.getElementById('shortBreakStart');
shortBreakStart.addEventListener("click",()=>{
    countdown(timerData.shortBreak.minutes,timerData.shortBreak.seconds);
});

//longBreakStart event listener
const longBreakStart= document.getElementById('longBreakStart');
longBreakStart.addEventListener("click",()=>{
    longBreakStart.classList.add('hidden');
    pauser.classList.remove('hidden');
    countdown(timerData.longBreak.minutes,timerData.longBreak.seconds);
});

/**-----------HELPER FUNCTIONS---------- */

function numDisp(num){
    let s=num.toString();
    if (s.length<2) s='0'+s;
    return s;
}

function countdown(minutes,seconds){
    let min=minutes;
    let secs=seconds;
    let rads=(min*60)+secs;
    let v=rads;
    pauser.classList.remove('hidden'); 
    starter.classList.add('hidden');
    shortBreakStart.classList.add('hidden');
    let ticktock=setInterval(()=>{
            if(!timerData.canPause){
                secs--; 
                v--; if(v<0)v=0;
                if(min>=0) pageMinutes.innerHTML=numDisp(min);
                if(secs>=0) pageSeconds.innerHTML=numDisp(secs);
                if (rads>=0) progressBar.style.background=`conic-gradient(var(--orange-theme) ${(v/rads)*360}deg,#161932 0deg)`;
                if(secs<0){
                    min--;
                    secs=59;
                    if(min<0){
                        clearInterval(ticktock);
                        canPause=false;
                        pauser.classList.add('hidden');
                        if(timerData.mode.pomo){
                            if(timerData.cycles.breakCount>2){
                                timerData.mode.longB=true;
                                timerData.longBreakMode();
                            }
                            else{
                                timerData.mode.shortB=true;
                                timerData.shortBreakMode();
                            }
                        }
                        else if(timerData.mode.shortB){
                           timerData.cycles.breakCount++;
                           console.log(timerData.cycles.breakCount+'breakcount');
                           timerData.pomoMode();
                        }
                        else if(timerData.mode.longB){
                            timerData.pomoMode();
                        }
                    }
                }
            }
            else clearInterval(ticktock);
        },1000);
}
