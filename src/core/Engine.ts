class Engine {

    private lastLoopTime: number = Time.getNanoSeconds;
    private targetFps: number = 120;
    private optimalTime: number = 1000000000 / this.targetFps;
    private lastFpsTime: number = 0;

    private gameLoopTick: number = 0;
    private isPlaying: boolean = true;

    private startTime: number = new Date().getTime();

    private static gameObjects: GameObject[] = [];

    private static _ready: Function;
    private static _config: Function;
    private static _canvasSelector: string = 'body';

    public static ready(callback: Function) {
        this._ready = callback;
    }

    public static config(selector: string, callback: (canvas: Stage) => void) {
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
        let stage = Stage.create(Engine._canvasSelector);
        Engine._config(stage);
        Engine._ready();
        this.tick();
    }

    public static addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    public tick() {
        let d = new Date().getTime();
        Time.setFrameTime((d - this.startTime) / 1000);
        var nanoSeconds = Time.getNanoSeconds;
        var now = nanoSeconds;
        var updateLength = now - this.lastLoopTime;
        this.lastLoopTime = now;
        var delta = updateLength / this.optimalTime;

        this.lastFpsTime += updateLength;
        if (this.lastFpsTime >= 1000000000) {
            this.lastFpsTime = 0;
        }

        Time.setDeltaTime(delta / this.targetFps);

        this.start();
        this.update();
        this.destroy();
        this.render();

        var next = (this.lastLoopTime - nanoSeconds + this.optimalTime) / 1000000;
        if (this.isPlaying) {
            this.gameLoopTick = setTimeout(this.tick.bind(this), next);
        }
    }

    private update() {
        Engine.gameObjects.forEach(go => {
            go.sendMessage('update');
        });
    }

    private start() {
        Engine.gameObjects.forEach(go => {
            go.sendMessage('start');
        })
    }

    private destroy() {
        if (Engine.gameObjects.length > 0) {
            for (let i = Engine.gameObjects.length - 1; i > -1; i--) {
                let go = Engine.gameObjects[i];
                if (go['_destroy']) {
                    let index = Engine.gameObjects.indexOf(go);
                    Engine.gameObjects.splice(index, 1);
                }
            }
        }
    }

    private render() {
        // Engine.canvas.context.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);
        Stage.clear();
        let renderItems: GameObject[] = Engine.gameObjects;
        if (renderItems.length > 1) {
            renderItems.sort(function (a, b) {
                let ar = a.getComponent(SpriteRenderer);
                let br = b.getComponent(SpriteRenderer);
                if (ar && br) {
                    if (ar.depth < br.depth)
                        return -1;
                    if (ar.depth > br.depth)
                        return 1;
                }
                return 0;
            });
        }
        // renderItems.forEach(item => {
        for (let i = 0; i < renderItems.length; i++){
            let item = renderItems[i];
            // item.components.forEach(comp => {
            for (let j = 0; j < item.components.length; j++){
                let comp = item.components[j];
                if (comp instanceof SpriteRenderer && comp.sprite.image && comp.isVisible) {
                    if (comp.sprite.frames == 0) {
                        Stage.draw(
                            comp.sprite.image,
                            item.transform.position.x,
                            item.transform.position.y
                        );
                    } else {
                        let sprite = comp.sprite.item(comp.frame);
                        Stage.draw(
                            // Source Image
                            comp.sprite.image,
                            // Position in the sprite sheet
                            sprite.left, sprite.top,
                            sprite.width, sprite.height,
                            // Position on the canvas
                            item.transform.position.x,
                            item.transform.position.y,
                            // Size on the canvas
                            sprite.width, sprite.height
                        );
                    }
                }
            }
            // });
        }
        // });
    }

}