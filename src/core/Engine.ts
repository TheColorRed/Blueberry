class Engine {

    private lastLoopTime: number = Time.getNanoSeconds;
    private targetFps: number = 120;
    private optimalTime: number = 1000000000 / this.targetFps;
    private lastFpsTime: number = 0;

    private gameLoopTick: number = 0;
    private isPlaying: boolean = true;

    private startTime: number = new Date().getTime();

    private static gameObjects: GameObject[] = [];

    private canvas: HTMLCanvasElement;;
    private context: CanvasRenderingContext2D;

    public init() {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
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

        this.update();

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

    private render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
        renderItems.forEach(item => {
            item.components.forEach(comp => {
                if (comp instanceof SpriteRenderer && comp.sprite.image) {
                    this.context.drawImage(comp.sprite.image, item.transform.position.x, item.transform.position.y);
                }
            });
        });
    }

}