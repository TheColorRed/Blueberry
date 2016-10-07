class Collider extends Component {

    private spr: SpriteRenderer = null;

    private collisions: GameObject[] = [];

    private _points: Vector2[] = [];
    private _pointsOrig: Vector2[] = [];

    public posFrameStart: Vector2 = Vector2.zero;

    public get points(): Vector2[] {
        return this._points;
    }

    start() {
        this.spr = this.getComponent(SpriteRenderer);
        if (this._points.length == 0) {
            this._points = this.getSpritePoints(this.gameObject);
            this._pointsOrig = this.getSpritePoints(this.gameObject);
        }
    }

    public addPoint(point: Vector2) {
        this._points.push(point);
        this._pointsOrig.push(point);
    }

    public setPoints(points: Vector2[]) {
        this._points = [];
        for (let i in points) {
            this.addPoint(points[i]);
        }
    }

    lateUpdate() {
        if (this._points.length > 0) {
            // Set the point cordinates
            // Convert from local to global
            let rotation = this.transform.rotation.degrees * (Math.PI / 180);
            let cos = Math.cos(rotation);
            let sin = Math.sin(rotation);
            let origin = this.transform.position;
            for (let i in this._pointsOrig) {
                let point = this._pointsOrig[i];
                this._points[i] = new Vector2(
                    (cos * point.x) - (sin * point.y) + origin.x,
                    (cos * point.y) + (sin * point.x) + origin.y
                );
            }
            for (let i in Engine.gameObjects) {
                let go = Engine.gameObjects[i];
                if (go == this.gameObject) { continue; }
                let coll = go.getComponent(Collider);
                let spr = go.getComponent(SpriteRenderer);
                if (coll && coll._points.length > 0) {
                    let origin2: Vector2 = spr.sprite.getOrigin();
                    let idx = this.collisions.indexOf(go);
                    let rect2 = this.getSpritePoints(go);
                    if (this.doPolygonsIntersect(this._points, coll._points)) {
                        if (idx == -1) {
                            this.gameObject.sendMessage('collisionEnter', go);
                            this.collisions.push(go);
                        } else {
                            this.gameObject.sendMessage('collisionStay', go);
                        }
                    } else {
                        if (idx > -1) {
                            this.gameObject.sendMessage('collisionExit', go);
                            this.collisions.splice(idx, 1);
                        }
                    }
                }
            }
        }
    }

    private getSpritePoints(gameObject: GameObject): Vector2[] {
        let position: Vector2 = gameObject.transform.position;
        let spr = gameObject.getComponent(SpriteRenderer);
        let sprite = spr.sprite;
        let origin = sprite.getOrigin();
        return [
            new Vector2(position.x - origin.x, position.y - origin.y),
            new Vector2(position.x - origin.x + sprite.width, position.y - origin.y),
            new Vector2(position.x - origin.x + sprite.width, position.y - origin.y + sprite.height),
            new Vector2(position.x - origin.x, position.y - origin.y + sprite.height)
        ];
    }

    private doPolygonsIntersect(a: Vector2[], b: Vector2[]) {
        var polygons = [a, b];
        var minA, maxA, projected, i, i1, j, minB, maxB;

        for (i = 0; i < polygons.length; i++) {

            // for each polygon, look at each edge of the polygon, and determine if it separates
            // the two shapes
            var polygon = polygons[i];
            for (i1 = 0; i1 < polygon.length; i1++) {

                // grab 2 vertices to create an edge
                var i2 = (i1 + 1) % polygon.length;
                var p1 = polygon[i1];
                var p2 = polygon[i2];

                // find the line perpendicular to this edge
                var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

                minA = maxA = undefined;
                // for each vertex in the first shape, project it onto the line perpendicular to the edge
                // and keep track of the min and max of these values
                for (j = 0; j < a.length; j++) {
                    projected = normal.x * a[j].x + normal.y * a[j].y;
                    if (!minA || projected < minA) {
                        minA = projected;
                    }
                    if (!maxA || projected > maxA) {
                        maxA = projected;
                    }
                }

                // for each vertex in the second shape, project it onto the line perpendicular to the edge
                // and keep track of the min and max of these values
                minB = maxB = undefined;
                for (j = 0; j < b.length; j++) {
                    projected = normal.x * b[j].x + normal.y * b[j].y;
                    if (!minB || projected < minB) {
                        minB = projected;
                    }
                    if (!maxB || projected > maxB) {
                        maxB = projected;
                    }
                }

                // if there is no overlap between the projects, the edge we are looking at separates the two
                // polygons, and we know there is no overlap
                if (maxA < minB || maxB < minA) {
                    // CONSOLE("polygons don't intersect!");
                    return false;
                }
            }
        }
        return true;
    }

}