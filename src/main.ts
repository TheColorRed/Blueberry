let engine = new Engine;

// Once everything is loaded load the users config
window.addEventListener('load', event => {
    engine.loadConfig();
});

// Once all the assets have loaded load the startup
window.addEventListener('onAssetsLoaded', event => {
    engine.start();
});

// Listen for when the user presses a key
window.addEventListener('keydown', event => {
    Input.setKeyPressed(event.keyCode);
});

// Listen for when the user releases a key
window.addEventListener('keyup', event => {
    Input.setKeyReleased(event.keyCode);
});

window.addEventListener('mousedown', event => {
    Input.setMousePressed(event.button);
});

window.addEventListener('mouseup', event => {
    Input.setMouseReleased(event.button);
});