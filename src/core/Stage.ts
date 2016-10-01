class Stage {

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    private _canvasBuffer: HTMLCanvasElement;
    private _contextBuffer: CanvasRenderingContext2D;

    private static instance: Stage = null;

    public static create(selector: string = 'body') {
        let stage = new Stage();
        // Create the main canvas
        stage.canvas = document.createElement('canvas') as HTMLCanvasElement;
        stage.context = stage.canvas.getContext('2d') as CanvasRenderingContext2D;

        // Place the main canvas on the page
        let loc = document.querySelector(selector);
        loc.appendChild(stage.canvas);
        Stage.instance = stage;
    }

    public static createBuffer() {
        Stage.instance._canvasBuffer = document.createElement('canvas') as HTMLCanvasElement;
        Stage.instance._canvasBuffer.width = Stage.instance.canvas.width;
        Stage.instance._canvasBuffer.height = Stage.instance.canvas.height;
        Stage.instance._contextBuffer = Stage.instance._canvasBuffer.getContext('2d') as CanvasRenderingContext2D;
    }

    public static get width(): number {
        return Stage.instance.canvas.width;
    }

    public static get height(): number {
        return Stage.instance.canvas.height;
    }

    public static set width(x: number) {
        Stage.instance.canvas.width = x;
    }

    public static set height(y: number) {
        Stage.instance.canvas.height = y;
    }

    public static size(x: number, y: number) {
        Stage.width = x;
        Stage.height = y;
    }

    public static maximize() {
        Stage.width = window.innerWidth;
        Stage.height = window.innerHeight;
        window.addEventListener('resize', event => {
            Stage.width = window.innerWidth;
            Stage.height = window.innerHeight;
        });
    }

    public static clearBuffer() {
        Stage.instance._canvasBuffer.width = Stage.instance._canvasBuffer.width;
    }

    public static draw() {
        Stage.instance.canvas.width = Stage.instance.canvas.width;
        Stage.instance.context.drawImage(
            Stage.instance._canvasBuffer, 0, 0
        );
    }

    public static drawToBuffer(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, offsetX: number, offsetY: number, width?: number, height?: number, canvasOffsetX?: number, canvasOffsetY?: number, canvasImageWidth?: number, canvasImageHeight?: number) {
        Stage.instance._contextBuffer.drawImage(
            image,
            Math.round(offsetX), Math.round(offsetY),
            Math.round(width), Math.round(height),
            Math.round(canvasOffsetX), Math.round(canvasOffsetY),
            Math.round(canvasImageWidth), Math.round(canvasImageHeight)
        );
    }

    public static render(gameObjects: GameObject[]) {
        if (gameObjects.length > 1) {
            gameObjects.sort(function (a, b) {
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
        for (let i = 0; i < gameObjects.length; i++){
            let item = gameObjects[i];
            for (let j = 0; j < item.components.length; j++){
                let comp = item.components[j];
                if (comp instanceof SpriteRenderer && comp.sprite.image && comp.isVisible) {
                    if (comp.sprite.frames == 0) {
                        Stage.drawToBuffer(
                            comp.sprite.image,
                            item.transform.position.x,
                            item.transform.position.y
                        );
                    } else {
                        let sprite = comp.sprite.item(comp.frame);
                        Stage.drawToBuffer(
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
        }
    }

}