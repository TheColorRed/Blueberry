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
    private static _run: Function;
    private static _setup: Function;
    private static _canvasSelector: string = 'body';
    private static _assetCount = 0;
    private static _assetsLoaded = 0;

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

    public static assets(assets: { images?: [{ name: string, source: string }], sounds?: [{ name: string, source: string }] }) {
        let assetCount = 0;
        if (assets.images) {
            assetCount += assets.images.length;
            assets.images.forEach(image => {
                let img = new Image();
                img.src = image.source;
                img.addEventListener('load', () => {
                    let spriteAsset = new SpriteAsset(image.name, new Sprite(img));
                    Assets.sprites.push(spriteAsset);
                    this._assetsLoaded++;
                    this.assetsLoaded();
                });
            });
        }
        if (assets.sounds) {
            assetCount += assets.sounds.length;
            assets.sounds.forEach(sound => {
                let audio = new Audio;
                audio.src = sound.source;
                audio.addEventListener('load', () => {
                    let soundAsset = new SoundAsset(sound.name, new Sound(audio));
                    Assets.sounds.push(soundAsset);
                    this._assetsLoaded++;
                    this.assetsLoaded();
                });
            });
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
        Stage.createBuffer();
    }

    public start() {
        Engine._run();
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
        Engine.keyboard();
        Engine.mouse();
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

    private static keyboard() {
        Input.clearKeyPress();
    }

    private static mouse() {
        Input.clearMousePress();
    }

    private static render() {
        Stage.clearBuffer();
        Stage.render(this._gameObjects);
        Stage.draw();
        requestAnimationFrame(Engine.tick);
    }

}