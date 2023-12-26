const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    space: {
        pressed: false
    },
}


$(document).on('keydown', function(e){
    let key = e.key;

    switch(key) {
       // case "arrowLeft":
        case "a":
            keys.a.pressed = true;    
            break;

      //  case "arrowRight":    
        case "d":
            keys.d.pressed = true;
            break;
        
       // case "arrowUp":    
        case "w":
            keys.w.pressed = true;
            break;


    }
});

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
            break;


    }
});



/*FUNCTIONS*/

function handleControls(){
    moviment();

    function moviment(){
        player.velocity.x = 0;

        if(keys.a.pressed){
            player.velocity.x = -1.5;
        }

        if(keys.d.pressed){
            player.velocity.x = 1.5;
        }

        if(keys.w.pressed){
            player.velocity.y = -16;
        }
    }
}