const gravity = 0.6;

const backgroundPath = "../assets/backgroud/placeholder.png"
//acoes
class Personagem {

    constructor({position,velocity, dimensions, source}){
        this.position = position;
        this.velocity = velocity;
        this.width = dimensions?.width;
        this.height = dimensions?.height;

        if(source){
            this.image = new Image();
            this.image.src = source;

            this.width = this.image.width;
            this.height = this.image.height;
        }
    }

    draw(){


        if(this.image){
           ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );

        } else {
            //classica a cor da class persoagem
            ctx.fillStyle = "white";

            //atribui os valores
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }



        if(this.isAttacking){
            ctx.fillStyle = "red";
            ctx.fillRect(this.attackBox.position.x,this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    //realiza a movimentação do player
    update(){

        //math.ceil = arredonda todos os valores para cima;

        if(Math.ceil(this.position.y+this.height >= canvas.height)){
            //está no chão
            this.onGround = true;
        } else {
            //está no ar;
            this.onGround = false
        }

        if(this.position.y+this.height > canvas.height){
            this.position.y = canvas.height-this.height;
            this.velocity.y = 0;
        } else {
            if(!this.onGround) this.velocity.y += gravity;
        }


       
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.attackBox.position.x = this.position.x;
        this.attackBox.position.y = this.position.y;
        this.draw();
    }

    attack() {
        if (this.onAttackCooldown) return

        this.isAttacking = true
        this.onAttackCooldown = true

       // player.setSprite("attacking")

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


class Fighter extends Personagem{
    constructor({position, velocity, dimensions}){
        super({
            position, velocity, dimensions
        })
        this.velocity = velocity;
        this.width = dimensions.width;
        this.height = dimensions.height;

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
    dimensions:{
        width: 50,
        height: 150
    }
});


const fundo = new Personagem({
    position: {
        x: 0,
        y: 0
    },
    source: backgroundPath


});

/*const player2 = new Fighter({
    position: {
        x:500,
        y:20
    },
    velocity: {
        x: 0,
        y:10
    },
    dimensions:{
        width: 50,
        height: 150
    }
});*/