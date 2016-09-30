let engine = new Engine;

window.addEventListener('load', function () {
    engine.init();
    console.log(Engine['gameObjects'].length);
});