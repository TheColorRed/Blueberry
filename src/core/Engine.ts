class Engine {

    private static _lastLoopTime: number = Time.getNanoSeconds;
    private static _targetFps: number = 120;
    private static _optimalTime: number = 1000000000 / Engine._targetFps;
    private static _lastFpsTime: number = 0;
    private static _gameLoopTick: number = 0;
    private static _isPlaying: boolean = true;
    private static _startTime: number = new Date().getTime();
    private static _gameObjects: GameObject[] = [];
    private static _invokers: Invoke[] = [];
    private static _ready: Function;
    private static _config: Function;
    private static _canvasSelector: string = 'body';

    public static ready(callback: Function) {
        this._ready = callback;
    }

    public static config(selector: string, callback: Function) {
        this._config = callback;
    }

    public static assets(assets: {images:[string]}) {
        assets.images.forEach(image => {
            let img = new Image();
            let imgAsset = new ImageAsset(image);
            img.src = image;
            imgAsset.image = img;
            Assets.images.push(imgAsset);
        });
    }

    public init() {
        Stage.create(Engine._canvasSelector);
        Engine._config();
        Stage.createBuffer();
        Engine._ready();
        Engine.tick();
    }

    public static addGameObject(gameObject: GameObject) {
        this._gameObjects.push(gameObject);
    }

    public static addInvoker(repeater: Invoke) {
        this._invokers.push(repeater);
    }

    public static tick() {
        let d = new Date().getTime();
        Time.setFrameTime((d - Engine._startTime) / 1000);
        var nanoSeconds = Time.getNanoSeconds;
        var now = nanoSeconds;
        var updateLength = now - Engine._lastLoopTime;
        Engine._lastLoopTime = now;
        var delta = updateLength / Engine._optimalTime;

        Engine._lastFpsTime += updateLength;
        if (Engine._lastFpsTime >= 1000000000) {
            Engine._lastFpsTime = 0;
        }

        Time.setDeltaTime(delta / Engine._targetFps);

        Engine.start();
        Engine.invoke();
        Engine.update();
        Engine.destroy();
        Engine.render();
    }

    private static update() {
        Engine._gameObjects.forEach(go => {
            go.sendMessage('update');
        });
    }

    private static invoke() {
        let remove: Invoke[] = [];
        Engine._invokers.forEach(rep => {
            if (!rep.firstRun && Time.time - rep.lastCalled >= rep.delay) {
                rep.callback();
                rep.lastCalled = Time.time;
                rep.firstRun = true;
            }else if (Time.time - rep.lastCalled >= rep.interval && rep.repeats) {
                rep.callback();
                rep.lastCalled = Time.time
            }
            if (!rep.repeats && rep.firstRun) {
                remove.push(rep);
            }
        });
        var c = Engine._invokers.filter(item => {
            return remove.indexOf(item) === -1;
        });
        Engine._invokers = c;
    }

    private static start() {
        Engine._gameObjects.forEach(go => {
            go.sendMessage('start');
        })
    }

    private static destroy() {
        if (Engine._gameObjects.length > 0) {
            for (let i = Engine._gameObjects.length - 1; i > -1; i--) {
                let go = Engine._gameObjects[i];
                if (go['_destroy']) {
                    let index = Engine._gameObjects.indexOf(go);
                    Engine._gameObjects.splice(index, 1);
                }
            }
        }
    }

    private static render() {
        Stage.clearBuffer();
        Stage.render(this._gameObjects);
        Stage.draw();
        requestAnimationFrame(Engine.tick);
    }

}