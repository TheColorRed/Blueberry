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
            this._pointsOrig = this.getSpritePoints(this.gameObject);
            this._points = this.getSpritePoints(this.gameObject);
        }
    }

    fixedUpdate() {
        let go1 = this.gameObject;//Engine.gameObjects[i];
        // Set the point cordinates
        // Convert from local to global
        let collider1 = this.collisionColliderSetup(go1);
        if (collider1) {
            let k = Engine.gameObjects.length
            while (k--) {
                let go2 = Engine.gameObjects[k];
                if (go2 != go1) {
                    let collider2 = this.collisionColliderSetup(go2);
                    if (collider2) {
                        let idx = collider1.collisions.indexOf(go2);
                        if (this.doPolygonsIntersect(collider1.points, collider2.points)) {
                            if (idx == -1) {
                                go1.sendMessage('collisionEnter', go2);
                                collider1.collisions.push(go2);
                            } else {
                                go1.sendMessage('collisionStay', go2);
                            }
                        } else {
                            if (idx > -1) {
                                go1.sendMessage('collisionExit', go2);
                                collider1.collisions.splice(idx, 1);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Adds a point to the list of points
     *
     * @param {Vector2} point
     *
     * @memberOf Collider
     */
    public addPoint(point: Vector2) {
        this._points.push(point);
        this._pointsOrig.push(point);
    }

    /**
     * Sets the points for the collider
     *
     * @param {Vector2[]} points
     *
     * @memberOf Collider
     */
    public setPoints(points: Vector2[]) {
        this._points = [];
        for (let i = 0, len = points.length; i < len; i++) {
            this.addPoint(points[i]);
        }
    }

    /**
     * Setup collider based on the sprite size
     *
     * @private
     * @param {GameObject} gameObject
     * @returns {Vector2[]}
     *
     * @memberOf Collider
     */
    private getSpritePoints(gameObject: GameObject): Vector2[] {
        let spr = gameObject.getComponent(SpriteRenderer);
        let sprite = spr.sprite;
        let origin = sprite.getOrigin();
        return [
            new Vector2(origin.x - sprite.width, origin.y - sprite.height),
            new Vector2(origin.x, origin.y - sprite.height),
            new Vector2(origin.x, origin.y),
            new Vector2(origin.x - sprite.width, origin.y)
        ];
    }

    /**
     * Sets up the collider, returns the collider if it was setup successfully.
     * Returns null if the collider was not setup successfully.
     *
     * @private
     * @param {GameObject} go
     * @returns {Collider}
     *
     * @memberOf Collider
     */
    private collisionColliderSetup(go: GameObject): Collider {
        let collider = go.getComponent(Collider);
        if (collider && collider.points.length > 0) {
            let rotation = go.transform.rotation.degrees * (Math.PI / 180);
            let cos = Math.cos(rotation);
            let sin = Math.sin(rotation);
            let origin = go.transform.position;
            let i = collider._pointsOrig.length;
            while(i--) {
                let point = collider._pointsOrig[i];
                collider.points[i] = new Vector2(
                    (cos * point.x) - (sin * point.y) + origin.x,
                    (cos * point.y) + (sin * point.x) + origin.y
                );
            }
            return collider;
        }
        return null;
    }

    /**
     * Test if two polygons are colliding. Currently only convex polygons are supported.
     *
     * @private
     * @param {Vector2[]} a
     * @param {Vector2[]} b
     * @returns
     *
     * @memberOf Collider
     */
    private doPolygonsIntersect(a: Vector2[], b: Vector2[]) {
        var polygons = [a, b];
        var minA, maxA, projected, i, i1, j, minB, maxB;

        i = polygons.length;
        while(i--){

            // for each polygon, look at each edge of the polygon, and determine if it separates
            // the two shapes
            var polygon = polygons[i];
            i1 = polygons.length;
            while(i1--){

                // grab 2 vertices to create an edge
                var i2 = (i1 + 1) % polygon.length;
                var p1 = polygon[i1];
                var p2 = polygon[i2];

                // find the line perpendicular to this edge
                var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

                minA = maxA = undefined;
                // for each vertex in the first shape, project it onto the line perpendicular to the edge
                // and keep track of the min and max of these values
                j = a.length;
                while(j--){
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
                j = b.length;
                while(j--){
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