const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false,
        hold: false
    },
    space: {
        pressed: false,
        hold: false
    }
}

//quando clica
$(document).on('keydown', function(e){
    let key = e.key;

    switch(key) {
       // case "arrowLeft":
        case "a":
            keys.a.pressed = true;    
            player.lastKeyPressed = key;
            break;

      //  case "arrowRight":    
        case "d":
            keys.d.pressed = true;
            player.lastKeyPressed = key;
            break;
        
       // case "arrowUp":    
        case "w":
            keys.w.pressed = true;
            break;

        case " ":
            keys.space.pressed = true;
            
            break;    

    }
});

//quando solta
$(document).on('keyup', function(e){
    let key = e.key;

    switch(key) {
       // case "arrowLeft":
        case "a":
            keys.a.pressed = false;    
            break;

      //  case "arrowRight":    
        case "d":
            keys.d.pressed = false;
            break;
        
       // case "arrowUp":    
        case "w":
            keys.w.pressed = false;
            keys.w.hold = false;
            break;

        case " ":
            keys.space.pressed = false;
            keys.space.hold = false;
            break;

    }
});



/*FUNCTIONS*/
//função responsavel em realizar a movimentação do personagem
function handleControls(){
    moviment();
    attacks();
    function moviment(){
        player.velocity.x = 0;

        if(keys.a.pressed && ["a"].includes(player.lastKeyPressed)){
            player.velocity.x = -1.5 * 3.4;
        }

        if(keys.d.pressed && ["d"].includes(player.lastKeyPressed)){
            player.velocity.x = 1.5 * 3.4;
        }

        if(keys.w.pressed && !keys.w.hold){
            player.jump();
            keys.w.hold = true;
        }
    }
    function attacks() {
        if (keys.space.pressed && !keys.space.hold) {
            player.attack()
            keys.space.hold = true;
        } 
    }
}