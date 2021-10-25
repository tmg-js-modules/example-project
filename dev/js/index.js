// Map Array
import { Gear_01, Gear_02, Gear_03 } from './modules/example.js';

const Loader = require('@tmg-js-modules/image-loader');
const Graphics = require('@tmg-js-modules/graphics');
const Collider = require('@tmg-js-modules/colliders');
const Mouse = require('@tmg-js-modules/input-mouse');
const Touch = require( '@tmg-js-modules/touch' );
const Screen = require( '@tmg-js-modules/screen' );

window.addEventListener('load', function(){

    const ctx = canvas.getContext('2d');
    const overlayCtx = overlay.getContext('2d');

    // Main Game Class ----------------------------------------
    class Game {
        constructor(size){
            this.debug = false;
            this.resolution = {w: 1088, h: 640};
            // this.canvas = canvas;
            // this.ctx = ctx;
            // this.overlay = overlay;
            // this.overlayCtx = overlayCtx;
            this.size = size;
            this.timeStamp = 1;

            this.images = {
                gear_icon: Loader.Load('img/gear.png'),
            }

            this.canvas_list = [
                {cx: ctx, ca: canvas}, 
                {cx: overlayCtx, ca: overlay}
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

            const size = 32;
            let speed = 0.4;

            // for (let x = 0; x < 17*2; ++x){
            //     for (let y = 0; y < 10*2; ++y){
            //         this.instance(this.objects, Gear_03, {x:0+size*x, y:0+size*y}, {w:size, h:size}, speed);
            //         speed = -speed;
            //     }
            // }

            const gears_offset = {x:-15, y:-190};

            // Add Gear 1
            this.instance(this.objects, Gear_01, {x:canvas.width*0.5-11+gears_offset.x, y:canvas.height*0.5-15+64+gears_offset.y}, {w:180, h:180}, 0.4);

            // Add Gear 2
            this.instance(this.objects, Gear_02, {x:canvas.width*0.5-140+gears_offset.x, y:canvas.height*0.5+130+gears_offset.y}, {w:160, h:160}, -0.4);

            // Add Gear 3
            this.instance(this.objects, Gear_03, {x:canvas.width*0.5-35+gears_offset.x, y:canvas.height*0.5+240+gears_offset.y}, {w:140, h:140}, 0.4);
        }

        update(deltaTime){
            // Update Objects
            this.objects.forEach(ob => ob.update(deltaTime));
        }

        draw(){

            // Show guide lines
            // Graphics.Line_Guides(ctx, 2, {x:2, y: 2}, { x: 64*3, y: 64*3 });

            // Draw Objects
            this.objects.forEach(ob => ob.draw());

            // Draw Title Text
            Graphics.Text(ctx, "Example JS Project", 'center', 'Noto Sans', {x:canvas.width*0.5, y:canvas.height*0.5-168}, 32, 'Gold', 1);

            // Show Mouse Position
            if (game.debug && ( game.mouse.pos.x || game.mouse.pos.y) ) {
                Graphics.Bevel_Outline(overlayCtx, this.mouse.pos, this.mouse.size, 'Red', 3, 1);
            }
        }

        instance(_list, _ob, _pos, _size, _speed) {
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
    const game = new Game( {w:canvas.width, h:canvas.height} );
    Loader.Init(game.images);
    Screen.Init(game);
    game.init();

    Mouse.Move(game, canvas);
    Mouse.Leave(game);
    Mouse.Down(game);
    Mouse.Up(game);
    Touch.Init(game);

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


