enum CanvasType { Html5, WebGl }

class Stage {

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public webgl: WebGLRenderingContext;

    private canvasType: CanvasType = CanvasType.Html5;

    public static instance: Stage = null;

    public static create(selector: string, canvasType: CanvasType = CanvasType.Html5) {
        let stage = new Stage();
        stage.canvasType = canvasType;
        stage.canvas = document.querySelector(selector) as HTMLCanvasElement;
        if (canvasType == CanvasType.Html5) {
            stage.context = stage.canvas.getContext('2d') as CanvasRenderingContext2D;
        } else {
            stage.webgl = stage.canvas.getContext('webgl') as WebGLRenderingContext;
        }
        Stage.instance = stage;
        Stage.fillParent();
        stage.canvas.addEventListener('mousemove', event => {
            Input.setMousePosition(event.offsetX, event.offsetY);
        });
        stage.canvas.addEventListener('contextmenu', event => {
            event.preventDefault();
        })
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

    public static get topLeftCorner(): Vector2 {
        return new Vector2(0, 0);
    }

    public static get topRightCorner(): Vector2 {
        return new Vector2(Stage.width, 0);
    }

    public static get bottomLeftCorner(): Vector2 {
        return new Vector2(0, Stage.height);
    }

    public static get bottomRightCorner(): Vector2 {
        return new Vector2(Stage.width, Stage.height);
    }

    public static get center(): Vector2 {
        return new Vector2(Stage.width, Stage.height).dividedBy(2);
    }

    public static get topCenter(): Vector2 {
        return new Vector2(Stage.width / 2, 0);
    }

    public static get bottomCenter(): Vector2 {
        return new Vector2(Stage.width / 2, Stage.height);
    }

    public static get leftMiddle(): Vector2 {
        return new Vector2(0, Stage.height / 2);
    }

    public static get topLeftQuad(): Vector2 {
        return new Vector2(Stage.width / 4, Stage.height / 4);
    }

    public static get topRightQuad(): Vector2 {
        return new Vector2(
            (Stage.width / 2) + (Stage.width / 4),
            (Stage.height / 2) - (Stage.height / 4)
        );
    }

    public static get bottomLeftQuad(): Vector2 {
        return new Vector2(
            (Stage.width / 2) - (Stage.width / 4),
            (Stage.height / 2) + (Stage.height / 4)
        );
    }

    public static get bottomRightQuad(): Vector2 {
        return new Vector2(
            (Stage.width / 2) + (Stage.width / 4),
            (Stage.height / 2) + (Stage.height / 4)
        );
    }

    public static get rightMiddle(): Vector2 {
        return new Vector2(Stage.width, Stage.height / 2);
    }

    public static fillParent() {
        Stage.width = Stage.instance.canvas.parentElement.clientWidth;
        Stage.height = Stage.instance.canvas.parentElement.clientHeight;
        window.addEventListener('resize', event => {
            Stage.width = Stage.instance.canvas.parentElement.clientWidth;
            Stage.height = Stage.instance.canvas.parentElement.clientHeight;
        });
    }

    public static clear() {
        Stage.instance.canvas.width = Stage.instance.canvas.width;
    }

    public static draw(spr: SpriteRenderer, image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, offsetX: number, offsetY: number, width?: number, height?: number, canvasOffsetX?: number, canvasOffsetY?: number, canvasImageWidth?: number, canvasImageHeight?: number) {
        let ctx = Stage.instance.context;
        ctx.save();
        ctx.translate(spr.transform.position.x, spr.transform.position.y);
        ctx.rotate(spr.transform.rotation.degrees * (Math.PI / 180));
        ctx.drawImage(
            image,
            Math.round(offsetX), Math.round(offsetY),
            Math.round(width), Math.round(height),
            // Math.round(canvasOffsetX), Math.round(canvasOffsetY),
            Math.round(-(spr.sprite.width / 2)), Math.round(-(spr.sprite.height / 2)),
            Math.round(canvasImageWidth), Math.round(canvasImageHeight)
        );
        ctx.restore();
    }

    public static drawText(text: GUIText) {
        let ctx = Stage.instance.context;
        ctx.save();
        ctx.rotate(text.transform.rotation.degrees * (Math.PI / 180));
        ctx.font = `${text.size}pt ${text.font}`;
        ctx.textAlign = text.horizontalAlign;
        ctx.textBaseline = text.verticalAlign;
        ctx.fillText(text.text, text.transform.position.x, text.transform.position.y);
        ctx.restore();
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
        let i = gameObjects.length;
        while (i--) {
            let item = gameObjects[i];
            let j = item.components.length;
            while (j--) {
                let comp = item.components[j];
                if (
                    comp instanceof SpriteRenderer &&
                    comp.sprite.image && comp.isVisible &&
                    comp['started']
                ) {
                    let sprite: SubSprite = comp.drawableSprite();
                    let origin: Vector2 = comp.sprite.getOrigin();
                    Stage.draw(
                        comp,
                        // Source Image
                        comp.sprite.image,
                        // Position in the sprite sheet
                        sprite.left, sprite.top,
                        sprite.width, sprite.height,
                        // Position on the canvas
                        item.transform.position.x - origin.x,
                        item.transform.position.y - origin.y,
                        // Size on the canvas
                        sprite.width, sprite.height
                    );
                }
            }
            if (Debug.enabled) {
                // let collider = comp.getComponent(Collider);
                // Draw debugging information
                Debug.drawOrigin(item);
                Debug.drawCollider(item);
            }
        }
        i = gameObjects.length;
        while (i--) {
            let item = gameObjects[i];
            let j = item.components.length;
            while (j--) {
                let comp = item.components[j];
                if (
                    comp instanceof GUIText &&
                    comp['started']
                ) {
                    Stage.drawText(comp);
                }
            }
        }
    }

}