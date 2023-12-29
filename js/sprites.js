const gravity = 0.6;
const floorHeight = 96
const backgroundPath = "../assets/backgroud/placeholder.png";
const defeaultObjectSpritePath = "../assets/object/square.svg";

//acoes
class Personagem {

    constructor({position,velocity, dimensions, source, scale, offset, sprites}){
        this.position = position;
        this.velocity = velocity;
        this.width = dimensions?.width;
        this.height = dimensions?.height;

        this.scale = scale || 1;
        this.image = new Image();
        this.image.src = source || defeaultObjectSpritePath;

        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;

        this.offset = offset || {
            x: 0,
            y: 0
        }

        this.sprites = sprites || {
            idle: {
                src: this.image.src,
                totalPerSpritesFrame: 1,
                framesPerSpritesFrame: 1,

            }
        }

        this.currentSprite =  this.sprites.idle;

        this.elapsedTime = 0;
        this.currentSpriteFrame = 0; 
        this.totalPerSpritesFrame = this.sprites.idle.totalPerSpritesFrame;
        this.framesPerSpritesFrame =  this.sprites.idle.framesPerSpritesFrame;
    }

    setSprite(sprite){
        this.currentSprite = this.sprites[sprite];

        if(!this.currentSprite){
            this.currentSprite = this.sprites.idle;
        }

    }

    loadSprite(sprite){
        let previousSprite = this.image.src;

        this.image = new Image();
        this.image.src = this.currentSprite.src;
        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;

        this.totalPerSpritesFrame = this.currentSprite.totalPerSpritesFrame;
        this.framesPerSpritesFrame = this.currentSprite.framesPerSpritesFrame;

        let newSprite = this.image.src;

        if(previousSprite != newSprite){
            let previousSprite = new Image();
            previousSprite.src =  previousSprite;
            this.position.y += (previousSprite.height - this.image.height) * this.scale;
        }

    }

    draw(){
        ctx.drawImage(
            this.image,
            this.currentSpriteFrame * this.image.width / this.totalPerSpritesFrame,
            0,
            this.image.width / this.totalPerSpritesFrame,
            this.image.height,
            0,
            0,
            this.width / this.totalPerSpritesFrame,
            this.height
        );

    }

    
    animete(){
        this.elapsedTime++;
        if(this.elapsedTime >= this.framesPerSpritesFrame){
            this.currentSpriteFrame ++;
             
            if(this.currentSpriteFrame >= this.totalPerSpritesFrame){
                this.currentSpriteFrame = 0;
            }
            this.elapsedTime = 0;
        }
    }

    

    //realiza a movimentação do player
    update(){
        this.animete();
        this.draw();
    }

}






class Fighter extends Personagem{
    constructor({position, velocity, scale, sprites}){
        super({
            position, velocity,scale, sprites
        })
        this.velocity = velocity;

        //tecla que está sendo precionada
        this.lastKeyPressed;

        //Indica se o personagem está ou não no chão
        this.onGround;

         //proprieade de ataque
         this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 125,
            height: 50

        }
       

        //serve para atacar e esperar os segundos poder atacar novamente;
        this.isAttacking;
        this.attackCoolDown = 500;
        this.onAttackCoolDown ;

    }
    
    gravity() {
        if (this.position.y + this.height >= canvas.height - floorHeight) {
            this.onGround = true
        } else {
            this.onGround = false
        }

        if (this.position.y + this.height > canvas.height - floorHeight) {
            this.position.y = canvas.height - this.height - floorHeight
            this.velocity.y = 0
        } else {
            if (!this.onGround) this.velocity.y += gravity
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

      /*  this.attackBox.position.x = this.position.x
        this.attackBox.position.y = this.position.y*/
    }

    update() {
        this.gravity();
        this.loadSprite();
        this.draw();
        this.animate();
    }

    attack() {
        if (this.onAttackCooldown) return

        this.isAttacking = true
        this.onAttackCooldown = true

       player.setSprite("attacking")

        setTimeout(() => {
            this.isAttacking = false
        }, 400)

        setTimeout(() => {
            this.onAttackCooldown = false
        }, this.attackCooldown)
    }
    
    //função de pular
    jump(){
        if(!this.onGround) return
        this.velocity.y -= 16;
    }

}

//atribui os valores que seram utilizaxos na class Personagem em casa elemento
const player = new Fighter({
    position: {
        x:100,
        y:0
    },
    velocity: {
        x: 0,
        y:0
    },
    sprites: {
        idle: {
            src: "../assets/player/idle.png",
            totalPerSpritesFrame: 11,
            framesPerSpritesFrame: 1
        }
    }
});


const fundo = new Personagem({
    position: {
        x: 0,
        y: 0
    },
    source: backgroundPath


});

