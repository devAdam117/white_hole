// canvas Setup
const canvas=document.getElementById("canvas");
//canvas.style.background="black"
let frame=0;
canvas.width=1900;
canvas.height=930; 
const ctx = canvas.getContext('2d');
const playerPic = new Image();
playerPic.src ="./pics/black-hole-png-244.png";
// text setup

const textSet = ()=>{
ctx.font = "30px Arial";
ctx.fillStyle = "yellow";
ctx.fillText("White Hole", 20, 50);
}


// mouse Interactivity
const mouse = {
    x:canvas.width/2,
    y:canvas.height/2,    
}
canvas.addEventListener("mousemove", (e)=>{
    mouse.x=e.x;
    mouse.y=e.y;
    //pushStars();
    
})
//usable functions
const randomInt= (min, max)=> {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

//classess Setup
class MainCircle {
    constructor() {
        this.x=0;
        this.y=0;
        this.radius=15;
        this.pushRadius=100;
       }
        draw(x,y) {            
            ctx.beginPath()            
            ctx.fillStyle ="white";            
            ctx.drawImage(playerPic, mouse.x-22.5, mouse.y-22.5,45,45);
            ctx.arc(x,y,this.radius,0,Math.PI*2);
            ctx.restore();          
            ctx.stroke();           
            ctx.closePath(); 
            ctx.fill();
        }    
}

class Star {
    constructor() {
        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;
        this.size=2;
        this.color="white";  
        this.startX=this.x;
        this.startY=this.y; 
        this.rndDirectrion=Math.random();
        this.rndSpeed= randomInt(50,100);    
    }
    draw() {           
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fillStyle ="white";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();         
    } 
    escape(dx,dy) {
        this.x+=dx;
        this.y+=dy;
        }
        getBack(dx,dy){
            
            this.x+=dx/this.rndSpeed;
            this.y+=dy/this.rndSpeed;
                }}
// drawing functions 

player = new MainCircle();
const createSingleStar = (star)=>{
 star.draw()
}
const starArray =[];
const createStars = ()=>{
    for (i=0;i<1500;i++){
    let star = new Star;
    starArray.push(star);
    createSingleStar(starArray[i]);    
    }}
    //move stars if player is nearby
const pushStars = (x,y)=>{     
    for (i=0;i<1500;i++){
        let distance=Math.pow(Math.pow((mouse.x-starArray[i].x),(2))+Math.pow((mouse.y-starArray[i].y),(2)),(1/2))
        if(distance<player.pushRadius){
            starArray[i].escape(x,y);
            if(x>0 && y>0){starArray[i].rndDirectrion < 0.5 ? starArray[i].escape(x,y+12):starArray[i].escape(x,y-12);}            
             if(x>0 && y<0){ starArray[i].rndDirectrion < 0.5 ? starArray[i].escape(x,y+12):starArray[i].escape(x,y-12);}
             if (x<0 && y>0){ starArray[i].rndDirectrion < 0.5 ? starArray[i].escape(x,y+12):starArray[i].escape(x,y-12);  }
             if (x<0 && y<0){ starArray[i].rndDirectrion < 0.5 ? starArray[i].escape(x,y+12):starArray[i].escape(x,y-12);  }
             if (x==0 && y==0) {                
               //nothin to do here lol
             }
        }
        else {
           let xDiff=starArray[i].startX-starArray[i].x;
           let yDiff=starArray[i].startY-starArray[i].y;
           starArray[i].getBack(xDiff,yDiff);           
        }}}

// moving Vectors
const xArr =[];
const yArr =[];
let sX;
let sY;
const posPlayerX= ()=>{
    xArr.push(mouse.x);   
    let lastXposs =xArr[xArr.length-1];
    let beforeLastX = xArr[xArr.length-2];    
    sX=lastXposs-beforeLastX;   
    return sX;  
}
const posPlayerY = () => {
    yArr.push(mouse.y);
    let lastYposs =yArr[yArr.length-1];
    let beforeLastY = yArr[yArr.length-2];
    sY=lastYposs-beforeLastY;
    return sY;
}


// animation itself
const animate = ()=>{       
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   player.draw(mouse.x,mouse.y)
     createStars();     
     pushStars(posPlayerX(),posPlayerY());  
     textSet();   
     requestAnimationFrame(animate); 
}
animate()



