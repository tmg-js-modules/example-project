// Screen Resize
import { screen_init } from './modules/screen_manager.js';

// Input Manager
import { mouse_move, mouse_leave } from './modules/input_manager.js';

// Map Array
import { Gear_01, Gear_02, Gear_03 } from './modules/example.js';

// Draw Manager
import { draw_text, draw_box, draw_bevel_outline, draw_image } from './modules/draw_manager.js';

window.addEventListener('load', function(){

    const ctx = canvas.getContext('2d');
    const overlayCtx = overlay.getContext('2d');

    // Main Game Class ----------------------------------------
    class Game {
        constructor(size){
            this.debug = false;
            this.canvas = canvas;
            this.ctx = ctx;
            this.overlay = overlay;
            this.overlayCtx = overlayCtx;
            this.size = size;
            this.timeStamp = 1;

            this.canvas_list = [
                {cx:ctx, ca:canvas}, 
                {cx:overlayCtx, ca:overlay}
            ];

            this.mouse = {
                pos:{x:0, y:0},
                size:{w:64, h:64},
                click:false,
            }

            this.objects = [];
        }

        init(){
            if (this.debug) console.log("Game Started");

            // for (let x = 0; x < 16; ++x){
            //     for (let y = 0; y < 9; ++y){
            //         this.instance(this.objects, Gear_03, {x:64+64*x, y:64+64*y}, {w:64, h:64}, 0.4);
            //     }
            // }

            const gears_offset = {x:64, y:-70};

            // Add Gear 1
            this.instance(this.objects, Gear_01, {x:canvas.width*0.5+gears_offset.x, y:canvas.height*0.5+64+gears_offset.y}, {w:180, h:180}, 0.4);

            // Add Gear 2
            this.instance(this.objects, Gear_02, {x:canvas.width*0.5-140+gears_offset.x, y:canvas.height*0.5+140+gears_offset.y}, {w:160, h:160}, -0.4);

            // Add Gear 3
            this.instance(this.objects, Gear_03, {x:canvas.width*0.5-35+gears_offset.x, y:canvas.height*0.5+240+gears_offset.y}, {w:140, h:140}, 0.4);
        }

        update(deltaTime){
            // Update Objects
            this.objects.forEach(ob => ob.update(deltaTime));
        }

        draw(){
            // Draw Objects
            this.objects.forEach(ob => ob.draw());

            // Draw Text
            draw_text(ctx, "Blank JS Project", 'Noto Sans', 40, "center", 'Gold', 1, {x:canvas.width*0.5, y:canvas.height*0.5-168});

            // Show Mouse Position
            if (game.debug) {
                if (this.mouse.pos.x || this.mouse.pos.y) {
                    draw_box(overlayCtx, {w:this.mouse.size.w, h:this.mouse.size.h}, 
                        'Teal', 1, {x:this.mouse.pos.x-this.mouse.size.w*0.5, y:this.mouse.pos.y-this.mouse.size.h*0.5});
                }
            }
        }

        instance(_list, _ob, _pos, _size, _speed){
            if (_ob !== null){
                _list.push(new _ob(this, _pos, _size, _speed));
                _list[_list.length-1].init();

                _list.sort(function(a,b){
                    return a.pos.y - b.pos.y;
                });
            }
        }

        remove_instance(_list, _ob){
            _list = _list.filter(_ob => !_ob.markedForDeletion)
        }

    }


    // Update loop ---------------------------------------
    const game = new Game({w:canvas.width, h:canvas.height});
    screen_init(game);
    game.init();

    document.addEventListener("touchstart", touch2Mouse, true);
    document.addEventListener("touchmove", touch2Mouse, true);
    document.addEventListener("touchend", touch2Mouse, true);

    function touch2Mouse(e) {
    let theTouch = e.changedTouches[0];
    let mouseEv;

    switch(e.type)
    {
        case "touchstart": 
            mouseEv="mousedown";
            game.click = true; 
            break;  
        case "touchend":   mouseEv="mouseup";
            game.click = false; 
            break;  
        case "touchmove":  mouseEv="mousemove"; break;
        default: return;
    }

    const mouseEvent = document.createEvent("MouseEvent");
    mouseEvent.initMouseEvent(mouseEv, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
    theTouch.target.dispatchEvent(mouseEvent);

    // e.preventDefault();
    }

    // Input Events
    mouse_move(game);
    mouse_leave(game);

    let lastTime = 1;
    function animate(timeStamp) {
        for (let i = 0; i < game.canvas_list.length; ++i) game.canvas_list[i].cx.clearRect(0,0,game.canvas_list[i].ca.width, game.canvas_list[i].ca.height);

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate();
});


