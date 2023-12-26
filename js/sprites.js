const gravity = 0.2;

//acoes
class Personagem {

    constructor({position,velocity, dimensions}){
        this.position = position;
        this.velocity = velocity;
        this.width = dimensions.width;
        this.height = dimensions.height;
    }

    draw(){

        //classica a cor da class persoagem
        ctx.fillStyle = "white";

        //atribui os valores
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    //realiza a movimentação do player
    update(){
        

        if(this.position.y+this.height >= canvas.height){
            this.velocity.y = canvas.height - (this.position.y+this.height);
        } else {
            this.velocity.y += gravity;
        }


       
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw();
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

const player2 = new Fighter({
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
});