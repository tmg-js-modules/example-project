// Draw Manager
import {draw_text, draw_box, draw_bevel_outline, draw_image} from './draw_manager.js';

import { interact_area_self, interact_area_size } from './collision_manager.js';

// Towers
export class Example {
    constructor(game){
        this.game = game;
        this.name = `Gear_${this.game.objects.length}`;
        this.image = gear_icon;
        this.spriteSize = {w:256, h:256};
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

        // Mouse inside self gear check
        // if (this.interact !== interact_area_self(this.game.mouse, this)){
        //     this.interact = interact_area_self(this.game.mouse, this);
        // }

        // Mouse inside area gear check
        if (this.interact !== interact_area_size(this.game.mouse, this)){
            this.interact = interact_area_size(this.game.mouse, this);
        }
    } 

    draw(){
        // Display image, rotate canvas, reset canvas rotation
        if (!this.game.debug) {
            if (this.interact) {
                draw_image(this.game.ctx, this.image, {x:0, y:0}, {x:this.pos.x, y:this.pos.y}, this.size, this.angle, this.spriteSize, 1);
            } else {
                draw_image(this.game.ctx, this.image, {x:0, y:0}, {x:this.pos.x, y:this.pos.y}, this.size, this.angle, this.spriteSize, 0.3);   
            }
        } else {
            draw_image(this.game.ctx, this.image, {x:0, y:0}, {x:this.pos.x, y:this.pos.y}, this.size, this.angle, this.spriteSize, 0.3);   
            draw_bevel_outline(this.game.ctx, this.pos.x-this.size.w*0.5, this.pos.y-this.size.h*0.5, this.size.w, this.size.h, 2, 'Black', 1);
        }

        // Show Mouse Interact Bounds
        if (this.interact && this.game.debug){
            draw_bevel_outline(this.game.overlayCtx, this.pos.x-this.size.w*0.5, this.pos.y-this.size.h*0.5, this.size.w, this.size.h, 2, 'Red', 1);
            draw_text(this.game.overlayCtx, this.name, null, 50, "center", "Teal", 1, {x:this.pos.x, y:this.pos.y-this.size.h*0.5-8});
        } 
    }
}


export class Gear_01 extends Example {
    constructor(game, pos, size, speed){
        super(game);
        this.pos = pos;
        this.size = size;
        this.speed = speed;
    }
}


export class Gear_02 extends Example {
    constructor(game, pos, size, speed){
        super(game);
        this.pos = pos;
        this.size = size;
        this.speed = speed;
    }
}


export class Gear_03 extends Example {
    constructor(game, pos, size, speed){
        super(game);
        this.pos = pos;
        this.size = size;
        this.speed = speed;
    }
}


