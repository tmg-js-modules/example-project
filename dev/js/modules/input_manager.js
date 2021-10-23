export function mouse_move(game) {
    window.addEventListener('mousemove', function(e) {
        let bounds = canvas.getBoundingClientRect();

        // get the mouse coordinates, subtract the canvas top left and any scrolling
        game.mouse.pos.x = e.pageX - bounds.left - scrollX;
        game.mouse.pos.y = e.pageY - bounds.top - scrollY;

        // first normalize the mouse coordinates from 0 to 1 (0,0) top left
        // off canvas and (1,1) bottom right by dividing by the bounds width and height
        game.mouse.pos.x /= bounds.width; 
        game.mouse.pos.y /= bounds.height; 

        // then scale to canvas coordinates by multiplying the normalized coords with the canvas resolution
        game.mouse.pos.x *= canvas.width;
        game.mouse.pos.y *= canvas.height;
    });


}


export function mouse_leave(game) {
    window.addEventListener('mouseleave', function(e) {
        game.mouse.pos.x = null;
        game.mouse.pos.y = null;

        game.mouse.click = false;
    });
}


