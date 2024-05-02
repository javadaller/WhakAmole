//INTRO TYPE WRITER
const title=document.querySelector('h1');
const titleText=title.innerText;
const titleArray=titleText.split('');
let titleProgress='';

title.innerText='';

async function typeWriter() {
    for(let i=0; i<titleArray.length; i++) {
        const delay=Math.floor(Math.random() * 300)+200;
        await sleep(delay);
        titleProgress+=titleArray[i];
        title.innerText=titleProgress;
    }
}
typeWriter();

//ELAPSED TIME
const timeDisplay=document.querySelector('#elapsed');
let minute,timer=0;

async function elapsedTime() {
    while(true) {
        await sleep(1000);
        timer+=1;
        if(timer<60) {
            timeDisplay.innerText='Just arrived...';
        } else {
            minute=Math.floor(timer/60);
            if(minute==1) {
                timeDisplay.innerText='a minute has passed.';
            } else {
                timeDisplay.innerText=minute+' minutes have passed.';
            }
        }
    }
}
elapsedTime();

//CREATE TABLE
const table=document.querySelector('#table');

for(let i=0; i<12; i++) {
    const div=createDiv('div',table,null,'hole');
    div.addEventListener('click', () => {
        hammer(div);
    })
}

//START GAME
const button=document.querySelector('#startButton');
const score=document.querySelector('#scoreDisplay');

button.addEventListener('click', () => {
    button.value='Restart';
    score.innerText='0';
    button.style.display='none';
    randomMole();
})

const holes=Array.from(document.querySelector('#table').children);
const creationDelay=3000;
const visibleDelay=1000;
const intervalDelay=500;

async function randomMole() {
    while(true) {
        let delay=Math.floor(Math.random() * creationDelay);
        await sleep (delay);

        const randomHole=Math.floor(Math.random() * holes.length);
        holes[randomHole].classList.add('mole');
        
        const randomVisibility=Math.floor(Math.random() * (visibleDelay+700));
        await sleep(randomVisibility);
        holes[randomHole].classList.remove('mole');

        await sleep(Math.floor(Math.random() * intervalDelay));
    }
}

//PLAY
const audio_ouille=new Audio('assets/sounds/ouille.mp3');
audio_ouille.preload = 'auto';
audio_ouille.load();

async function hammer(div) {
    const classes=div.classList;
    if(classes.contains('mole')) {
        score.innerText=parseInt(score.innerText)+1;
        div.classList.remove('mole');
        div.classList.add('deadMole');
        const ouille=audio_ouille.cloneNode();
        ouille.play();
        await sleep(700);
        div.classList.remove('deadMole');
    } else {
        if(parseInt(score.innerText) > 0) {
          score.innerText=parseInt(score.innerText)-1;  
        }
    }
}