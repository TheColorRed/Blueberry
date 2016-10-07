class Engine {

    private static _lastLoopTime: number = Time.getNanoSeconds;
    private static _targetFps: number = 120;
    private static _optimalTime: number = 1000000000 / Engine._targetFps;
    // private static _lastFpsTime: number = 0;
    // private static _gameLoopTick: number = 0;
    // private static _isPlaying: boolean = true;
    private static _startTime: number = new Date().getTime();
    private static _gameObjects: GameObject[] = [];
    private static _invokers: Invoke[] = [];
    private static _run: Function;
    private static _setup: Function;
    private static _canvasSelector: string = 'body';
    private static _assetCount = 0;
    private static _assetsLoaded = 0;
    private static _fixedSpeed: number = 100;

    public static get gameObjects(): GameObject[] {
        return Engine._gameObjects;
    }

    public static setup(selector: string, callback: Function) {
        this._canvasSelector = selector;
        this._setup = callback;
    }

    public static run(callback: Function) {
        this._run = callback;
    }

    public static assets(assets: { sprites?: [{ name: string, source: string }], sounds?: [{ name: string, source: string }] }) {
        let assetCount = 0;
        let root: string = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/assets/';
        if (assets.sprites) {
            assetCount += assets.sprites.length;
            let i = assets.sprites.length;
            while (i--) {
                let sprite = assets.sprites[i];
                let img = new Image();
                img.src = (root + sprite.source).replace(/\/\/+/g, '/');
                img.addEventListener('load', () => {
                    let spriteAsset = new SpriteAsset(sprite.name, new Sprite(img));
                    Assets.sprites.push(spriteAsset);
                    this._assetsLoaded++;
                    this.assetsLoaded();
                });
            }
        }
        if (assets.sounds) {
            assetCount += assets.sounds.length;
            let i = assets.sounds.length;
            while (i--) {
                let sound = assets.sounds[i];
                let audio = new Audio;
                audio.src = (root + sound.source).replace(/\/\/+/g, '/');
                audio.addEventListener('loadeddata', () => {
                    let soundAsset = new SoundAsset(sound.name, new Sound(audio));
                    Assets.sounds.push(soundAsset);
                    this._assetsLoaded++;
                    this.assetsLoaded();
                });
            }
        }
        this._assetCount = assetCount;
    }

    private static assetsLoaded() {
        if (this._assetCount == this._assetsLoaded) {
            window.dispatchEvent(new CustomEvent('onAssetsLoaded'));
        }
    }

    public loadConfig() {
        Stage.create(Engine._canvasSelector);
        Engine._setup();
        // Stage.createBuffer();
    }

    public start() {
        Engine._run();
        Engine.tick();
        setInterval(function () {
            Engine.fixedUpdate();
        }, Engine._fixedSpeed);
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
        // Engine._lastLoopTime = now;
        var delta = updateLength / Engine._optimalTime;

        // Engine._lastFpsTime += updateLength;
        // if (Engine._lastFpsTime >= 1000000000) {
        //     Engine._lastFpsTime = 0;
        // }

        Time.setDeltaTime(delta / Engine._targetFps);

        Engine.start();
        Engine.invoke();
        Engine.update();
        Engine.lateUpdate();
        Engine.keyboard();
        Engine.mouse();
        Engine.destroy();
        Engine.render();
    }

    private static update() {
        let i = Engine._gameObjects.length;
        while (i--) {
            Engine._gameObjects[i].sendMessage('update');
        }
    }
    private static lateUpdate() {
        let i = Engine._gameObjects.length;
        while (i--) {
            Engine._gameObjects[i].sendMessage('lateUpdate');
        }
    }
    private static fixedUpdate() {
        let i = Engine._gameObjects.length;
        while (i--) {
            Engine._gameObjects[i].sendMessage('fixedUpdate');
        }
    }

    private static invoke() {
        let remove: Invoke[] = [];
        let i = Engine._invokers.length;
        while(i--){
            let rep = Engine._invokers[i];
            if (
                (!rep.firstRun && Time.time - rep.lastCalled >= rep.delay) ||
                (!rep.repeats && Time.time - rep.lastCalled >= rep.delay)
            ) {
                rep.callback();
                rep.lastCalled = Time.time;
                rep.firstRun = true;
                if (!rep.repeats) {
                    remove.push(rep);
                }
            } else if (Time.time - rep.lastCalled >= rep.interval && rep.repeats) {
                rep.callback();
                rep.lastCalled = Time.time
            }
        }
        var c = Engine._invokers.filter(item => {
            return remove.indexOf(item) === -1;
        });
        Engine._invokers = c;
    }

    private static start() {
        let i = Engine._gameObjects.length;
        while(i--){
            Engine._gameObjects[i].sendMessage('start');
        }
    }

    private static destroy() {
        if (Engine._gameObjects.length > 0) {
            let i = Engine._gameObjects.length;
            while(i--) {
                let go = Engine._gameObjects[i];
                if (go['_destroy']) {
                    go.sendMessage('destroy');
                    let index = Engine._gameObjects.indexOf(go);
                    Engine._gameObjects.splice(index, 1);
                    continue;
                }
                let j = go.components.length;
                while (j--) {
                    let comp = go.components[j];
                    if (comp['_destroy']) {
                        let idx = go.components.indexOf(comp);
                        go.components.splice(idx);
                    }
                }
            }
        }
    }

    private static keyboard() {
        Input.clearKeyPress();
    }

    private static mouse() {
        Input.clearMousePress();
    }

    private static render() {
        // Stage.clearBuffer();
        Stage.clear();
        Stage.render(this._gameObjects);
        // Stage.draw();
        requestAnimationFrame(Engine.tick);
    }

}