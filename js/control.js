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
        case "a":
        player.velocity.x += 10;
        break;

    }
});