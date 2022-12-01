/**-------TIMER DATA--------*/
//declarations
    //timer functionality declarations
const pageMinutes=document.getElementById('minutes');
const pageSeconds=document.getElementById('seconds');
const progressBar=document.querySelector('.progress-bar');
const starter=document.getElementById('start');
const pauser=document.getElementById('pause');
const restarter=document.getElementById('restart');
const resumer=document.getElementById('resume');


const timerData={
    //default values.
    minute: 25,
    second: 0,
    activeColor: 'var(--selected)',
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
        minutes:5,
        seconds:0
    },
    longBreak:{
        minutes:15,
        seconds:0
    },
    pausedValue:{
        minutes: 0,
        seconds: 0,
        progress:0
    },
    //methods
    pauseMethod(){
        this.pausedValue.minutes=parseInt(pageMinutes.innerHTML);
        this.pausedValue.seconds=parseInt(pageSeconds.innerHTML);
        let total=parseInt(this.pausedValue.minutes)*60 + parseInt(this.pausedValue.seconds);
        if(this.mode.pomo) this.pausedValue.progress=(this.minute*60)-total
        else if(this.mode.shortB) this.pausedValue.progress=(this.shortBreak.minutes*60)-total
        else if (this.mode.longB) this.pausedValue.progress=(this.longBreak.minutes*60)-total
        timerData.canPause=true;
        pauser.classList.add('hidden');
        resumer.classList.remove('hidden');
    },
    resumeMethod(){
        timerData.canPause=false;
        resumer.classList.add('hidden');
        pauser.classList.remove('hidden');
        countdown(this.pausedValue.minutes,this.pausedValue.seconds,this.pausedValue.progress);
    },
    pomoMode(){
        //console.log('pomo mode');
        this.mode.pomo=true;
        this.mode.shortB=false;
        this.mode.longB=false;
         document.getElementById('pomodoro-button').classList.add('active');
         document.getElementById('short-break-mode-button').classList.remove('active');
         document.getElementById('long-break-mode-button').classList.remove('active');
         pageMinutes.innerHTML=numDisp(this.minute); pageSeconds.innerHTML=numDisp(this.second);
         starter.classList.remove('hidden');
         shortBreakStart.classList.add('hidden');
         longBreakStart.classList.add('hidden');
         progressBar.style.background=`conic-gradient(${this.activeColor} 360deg,#161932 0deg)`;
    },
    shortBreakMode(){
        //console.log('short break mode');
        this.mode.pomo=false;
        this.mode.shortB=true;
        this.mode.longB=false;
        document.getElementById('short-break-mode-button').classList.add('active');
        document.getElementById('long-break-mode-button').classList.remove('active');
        document.getElementById('pomodoro-button').classList.remove('active');
        pageMinutes.innerHTML=numDisp(this.shortBreak.minutes); pageSeconds.innerHTML=numDisp(this.shortBreak.seconds);
        progressBar.style.background=`conic-gradient(${this.activeColor} 360deg,#161932 0deg)`;
        shortBreakStart.classList.remove('hidden');
        longBreakStart.classList.add('hidden');
        starter.classList.add('hidden');
        restarter.classList.add('hidden');
    },
    longBreakMode(){
        //console.log('long break mode');
        this.mode.pomo=false;
        this.mode.shortB=false;
        this.mode.longB=true;
        document.getElementById('pomodoro-button').classList.remove('active');
        document.getElementById('short-break-mode-button').classList.remove('active');
        document.getElementById('long-break-mode-button').classList.add('active');
        pageMinutes.innerHTML=numDisp(this.longBreak.minutes); pageSeconds.innerHTML=numDisp(this.longBreak.seconds);
        progressBar.style.background=`conic-gradient(${this.activeColor} 360deg,#161932 0deg)`;
        longBreakStart.classList.remove('hidden');
        starter.classList.add('hidden');
        restarter.classList.add('hidden');
        shortBreakStart.classList.add('hidden');
    },
}
//first run after load
pageMinutes.innerHTML=numDisp(timerData.minute);
pageSeconds.innerHTML=numDisp(timerData.second);

/**----------EVENT HANDLERS----------------- */

//start eventhandler
starter.addEventListener("click",(event)=>{
    event.preventDefault();
    countdown(timerData.minute,timerData.second);
});

//restart event handler
restarter.addEventListener("click",(event)=>{
    event.preventDefault();
    timerData.startMethod();
    restarter.classList.add('hidden');
});

//pause event handler
pauser.addEventListener("click",(event)=>{
    event.preventDefault();
    timerData.pauseMethod();
});

//resume event handler
resumer.addEventListener("click",(event)=>{
    event.preventDefault();
    timerData.resumeMethod(); 
});

//shortBreakStart event listener
const shortBreakStart= document.getElementById('shortBreakStart');
shortBreakStart.addEventListener("click",(event)=>{
    //event.preventDefault();
    countdown(timerData.shortBreak.minutes,timerData.shortBreak.seconds);
});

//longBreakStart event listener
const longBreakStart= document.getElementById('longBreakStart');
longBreakStart.addEventListener("click",(event)=>{
    //event.preventDefault();
    longBreakStart.classList.add('hidden');
    pauser.classList.remove('hidden');
    countdown(timerData.longBreak.minutes,timerData.longBreak.seconds);
});

//settings page events handlers
    //open and close settings page
const settingsIcon = document.getElementById('settings-icon');
const settingsPage = document.querySelector('div.settings-page');
const dimLayer = document.querySelector('div.dim');
const closeButton = document.getElementById('close-settings');

settingsIcon.addEventListener("click",(event)=>{
    event.preventDefault();
    settingsPage.classList.toggle('hidden');
    dimLayer.classList.toggle('dimmed');
})
closeButton.addEventListener("click",(event)=>{
    event.preventDefault();
    settingsPage.classList.toggle('hidden');
    dimLayer.classList.toggle('dimmed');
});
    //arrows to change input values
const arrowUpButtons=document.querySelectorAll('img.arrow-up');
arrowUpButtons.forEach((i,j)=>{
    i.addEventListener("click",(event)=>{
        let res=event.target.parentNode.parentNode.parentNode.children[0].value;
        event.target.parentNode.parentNode.parentNode.children[0].value=parseInt(res)+1;
    });
});
const arrowDownButtons=document.querySelectorAll('img.arrow-down');
arrowDownButtons.forEach((i,j)=>{
    i.addEventListener("click",(event)=>{
        let res=event.target.parentNode.parentNode.parentNode.children[0].value;
        event.target.parentNode.parentNode.parentNode.children[0].value=parseInt(res)-1;
    });
});
    //font selection 
const fonts= document.querySelectorAll('div.font-icon');
fonts.forEach((i,j)=>{
    i.addEventListener("click",(event)=>{
        switch(j){
            case 0:
                i.classList.add('selected');
                fonts[1].classList.remove('selected');
                fonts[2].classList.remove('selected');
                break;
            case 1:
                i.classList.add('selected');
                fonts[0].classList.remove('selected');
                fonts[2].classList.remove('selected');
                break;
            case 2:
                i.classList.add('selected');
                fonts[0].classList.remove('selected');
                fonts[1].classList.remove('selected');
                break;
        }
    });
});
const colors = document.querySelectorAll('.color-selection');

colors.forEach((i,j)=>{
    i.addEventListener("click",(event)=>{
        switch(j){
            case 0:
                //timerData.activeColor='var(--orange-theme)';
                colors[1].firstElementChild.classList.add('hidden');
                colors[2].firstElementChild.classList.add('hidden');
                i.firstElementChild.classList.remove('hidden');
                i.classList.add('chosen');
                colors[1].classList.remove('chosen');
                colors[2].classList.remove('chosen');
                colors[1].firstElementChild.classList.add('chosen');
                colors[2].firstElementChild.classList.add('chosen');
                break;
            case 1:
                //timerData.activeColor='var(--cyan-theme)';
                colors[0].firstElementChild.classList.add('hidden');
                colors[2].firstElementChild.classList.add('hidden');
                i.firstElementChild.classList.remove('hidden');
                i.classList.add('chosen');
                colors[0].classList.remove('chosen');
                colors[2].classList.remove('chosen');
                colors[0].firstElementChild.classList.add('chosen');
                colors[2].firstElementChild.classList.add('chosen');
                break;
            case 2:
                //timerData.activeColor='var(--purple-theme)';
                colors[0].firstElementChild.classList.add('hidden');
                colors[1].firstElementChild.classList.add('hidden');
                i.firstElementChild.classList.remove('hidden');
                i.classList.add('chosen');
                colors[0].classList.remove('chosen');
                colors[1].classList.remove('chosen');
                colors[0].firstElementChild.classList.add('chosen');
                colors[1].firstElementChild.classList.add('chosen');
                break;
        }
    })
})
const apply = document.getElementById('apply');

apply.addEventListener("click",()=>{
    //text
    let fontText=document.querySelector('.font-icon.selected').id;
    let tModes=document.querySelectorAll('.timer-modes a.button');
    let pageNums=document.querySelectorAll('#timer-digits span');   
    let links=document.querySelectorAll('.timer .link');
    switch(fontText){
        case 'kumbh-sans':
            tModes.forEach(i=>i.style.fontFamily='\'Kumbh Sans\', sans-serif');
            pageNums.forEach(i=>i.style.fontFamily='\'Kumbh Sans\', sans-serif');
            links.forEach(i=>i.style.fontFamily='\'Kumbh Sans\', sans-serif');
            break;
        case 'roboto-slab':
            tModes.forEach(i=>i.style.fontFamily='\'Roboto Slab\', serif');
            pageNums.forEach(i=>i.style.fontFamily='\'Roboto Slab\', serif');            
            links.forEach(i=>i.style.fontFamily='\'Roboto Slab\', serif'); 
            break;
        case 'space-mono':
            tModes.forEach(i=>i.style.fontFamily='\'Space Mono\', monospace');
            pageNums.forEach(i=>i.style.fontFamily='\'Space Mono\', monospace');
            links.forEach(i=>i.style.fontFamily='\'Space Mono\', monospace');
            break;
    }
    //color
    let r=document.querySelector(':root');

    let selectedColor=document.querySelector('.color-selection.chosen').id;
    switch(selectedColor){
        case 'orange':
            r.style.setProperty('--selected','#F87070');
            break;
        case 'cyan': 
            r.style.setProperty('--selected','#70F3F8');
            break;
        case 'purple':
            r.style.setProperty('--selected','#D881F8');
            break;
    }
    
    //mintues
    let p,s,l;
    p=parseInt(document.getElementById('pomodoro-minutes').value);
    s=parseInt(document.getElementById('short-break-minutes').value);
    l=parseInt(document.getElementById('long-break-minutes').value);
    timerData.minute=p;
    timerData.shortBreak.minutes=s;
    timerData.longBreak.seconds=l;
    pageMinutes.innerHTML=p;


    //close settings page
    settingsPage.classList.toggle('hidden');
    dimLayer.classList.toggle('dimmed');
});
/**-----------HELPER FUNCTIONS---------- */

function numDisp(num){
    let s=num.toString();
    if (s.length<2) s='0'+s;
    return s;
}

function countdown(minutes,seconds,bar){
    let min=minutes;
    let secs=seconds;
    let rads=(min*60)+secs;
    let v;
    if(bar)v=rads-bar 
    else v=rads;
    pauser.classList.remove('hidden'); 
    starter.classList.add('hidden');
    shortBreakStart.classList.add('hidden');
    longBreakStart.classList.add('hidden');
    let ticktock=setInterval(()=>{
            if(!timerData.canPause){
                secs--; //console.log(min+' '+secs+' '+v);
                v--; if(v<0)v=0;
                if(min>=0) pageMinutes.innerHTML=numDisp(min);
                if(secs>=0) pageSeconds.innerHTML=numDisp(secs);
                if (v>=0) progressBar.style.background=`conic-gradient(${timerData.activeColor} ${(v/rads)*360}deg,#161932 0deg)`;
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
                           //console.log(timerData.cycles.breakCount+'breakcount');
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