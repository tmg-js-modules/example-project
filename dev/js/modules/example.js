// Draw Manager
const Graphic = require('@tmg-js-modules/graphics');
const Collider = require('@tmg-js-modules/colliders');
const Loader = require('@tmg-js-modules/image-loader');

console.log("Hi");

// Towers
export class Example {
    constructor(game){
        this.game = game;
        this.name = `Gear_${game.objects.length}`;
        this.image = game.images.gear_icon;
        this.spriteSize = {w:256, h:256};
        this.frame = {x: 0, y: 0};
        this.angle = 0 * Math.PI / 180.0;
        this.interact = false;
        this.markedForDeletion = false;
    }

    init(){
        if (this.game.debug) console.log("Added Gear", this.game.objects.length);
    }

update(deltaTime){
        // Rotate
        this.angle += this.speed * Math.PI / 180.0;

        // Mouse area inside gear area check
        // if ( this.interact !== Collider.Area(this.game.mouse, this, false) ){
        //     this.interact = Collider.Area(this.game.mouse, this, false);
        // }

        // Mouse origin inside gear area check
        if (this.interact !== Collider.Origin(this.game.mouse, this)){
            this.interact = Collider.Origin(this.game.mouse, this);
        }
    } 

    draw(){
        // Display image, rotate canvas, reset canvas rotation
        if (!this.game.debug) {
            if (this.interact) {
                Graphic.Image(this.game.canvas_list[0].cx, this.image, this.frame, this.spriteSize, this.offset_pos, this.size, this.angle, 1);
            } else {
                Graphic.Image(this.game.canvas_list[0].cx, this.image, this.frame, this.spriteSize, this.offset_pos, this.size, this.angle, 0.3);
            }
        } else {
            Graphic.Image(this.game.canvas_list[0].cx, this.image, this.frame, this.spriteSize, this.offset_pos, this.size, this.angle, 0.3);
            Graphic.Bevel_Outline(this.game.canvas_list[0].cx, this.pos, this.size, 'Black', 3, 1);
        }

        // Show Mouse Interact Bounds
        if (this.interact && this.game.debug){
            Graphic.Image(this.game.canvas_list[0].cx, this.image, this.frame, this.spriteSize, this.offset_pos, this.size, this.angle, 1);
            Graphic.Bevel_Outline(this.game.canvas_list[0].cx, this.pos, this.size, 'Teal', 3, 1);
            Graphic.Text(this.game.canvas_list[0].cx, this.name, 'center', "Noto Sans", this.pos, 32, 'Teal', 1);
        } 
    }
}


export class Gear_01 extends Example {
    constructor(game, pos, size, speed){
        super(game);
        this.pos = pos;
        this.offset_pos = {x:(pos.x + size.w * 0.5), y:(pos.y + size.h * 0.5) };
        this.size = size;
        this.speed = speed;
    }
}


export class Gear_02 extends Example {
    constructor(game, pos, size, speed){
        super(game);
        this.pos = pos;
        this.offset_pos = {x:(pos.x + size.w * 0.5), y:(pos.y + size.h * 0.5) };
        this.size = size;
        this.speed = speed;
    }
}


export class Gear_03 extends Example {
    constructor(game, pos, size, speed){
        super(game);
        this.pos = pos;
        this.offset_pos = {x:(pos.x + size.w * 0.5), y:(pos.y + size.h * 0.5) };
        this.size = size;
        this.speed = speed;
    }
}


