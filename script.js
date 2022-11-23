/**
 * game plan
 * first lets test conic graient changeablility - done
 * write code for pomo app. 
 * we have munites, seconds, a pause/resume and a restart button
 * create an object to store pretedermined ad changeavle value for minutes and secods
 * settings icon is part two
 */
let pageMinutes=document.getElementById('minutes');
let pageSeconds=document.getElementById('seconds');
let progressBar=document.querySelector('progress-bar');
const timerData={
    minute: 24,
    second: 60,
    activeColor: 'var(--orange-theme)',
    orangeColor: 'var(--orange-theme)',
    cyanColor: 'var(--cyan-theme)',
    purpleColor: 'var(--purple-theme)',
    pausedTime:{
        minutes: 0,
        seconds: 0
    },
    countdown(){
        let min=this.minute;
        let secs=this.second;
        let ticktock=setInterval(()=>{
            secs--
            if(secs<0){
                min--;
                secs=59;
                if(min<0){
                    clearInterval(ticktock);
                    this.isRunning=false;
                }
            }
            
            pageMinutes.innerHTML=numDisp(min);
            pageSeconds.innerHTML=numDisp(secs);
            
        },1000);
    },
    isRunning: false,
}
let starter=document.getElementById('start');
let pauser=document.getElementById('pause');
let restarter=document.getElementById('restarter');
starter.addEventListener("click",()=>{
    if(!timerData.isRunning) timerData.isRunning=true;
    timerData.countdown();
    
});
//helper functions
function numDisp(num){
    let s=num.toString();
    if (s.length<2) s='0'+s;
    return s;
}
function secondsCalc(min,sec){
    let res=(min*60)+sec;
    return res;
}