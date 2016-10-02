let engine = new Engine;

window.addEventListener('load', function () {
    window.addEventListener('keydown', event => {
        Input.setKeyPressed(event.keyCode);
    }, false);
    window.addEventListener('keyup', event => {
        Input.setKeyReleased(event.keyCode);
    }, false);
    engine.init();
});