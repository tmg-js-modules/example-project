export function screen_init(game){
    if (game.debug) console.log("Screen Manager Loaded");

    canvas.width = 1088;
    canvas.height = 640;

    overlay.width = canvas.width;
    overlay.height = canvas.height;

    screen_resize(game, game.ctx, canvas);
    screen_resize(game, game.overlayCtx, overlay);

    window.addEventListener('resize', function(e) {
        screen_resize(game, game.ctx, canvas);
        screen_resize(game, game.overlayCtx, overlay);
    });

}

export function screen_resize(game, _ctx, _canvas){
    const border = 50;
    const aspect = {w:6.5, h:4};
    const img_smooth = true;
    let w = window.innerWidth;
    let h = w * (aspect.h / aspect.w);

    if (h < window.innerHeight){
        // Check window width
        w = window.innerWidth;
        h = w * (aspect.h / aspect.w);
    } else {
        // Check window height
        h = window.innerHeight;
        w = h * (aspect.w / aspect.h);
    }

    if (game.debug) console.log("Resized", "W", Math.floor(w), "H", Math.floor(h));

    _canvas.style.width = `${w - border}px`;
    _canvas.style.height = `${h - border}px`;

    // Graphic sharpness
    _ctx.mozImageSmoothingEnabled = img_smooth;
    _ctx.msImageSmoothingEnabled = img_smooth;
    _ctx.imageSmoothingEnabled = img_smooth;
}