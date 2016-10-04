/**
 * Repeatedly calls a callback function until canceled
 *
 * @param {Function} callback The function to run
 * @param {number} delay The delay before the first call
 * @param {number} repeatRate The rate at wich to repeat the call
 */
function invokeRepeating(callback: Function, delay: number, repeatRate: number): Invoke {
    let r = new Invoke;
    r.delay = delay;
    r.interval = repeatRate;
    r.callback = callback;
    Engine.addInvoker(r);
    return r;
}

/**
 * Calls a callback one time
 *
 * @param {Function} callback The funciton to run
 * @param {number} delay The delay before the call
 * @returns {Invoke}
 */
function invoke(callback:Function, delay: number): Invoke {
    let r = new Invoke;
    r.delay = delay;
    r.callback = callback;
    r.repeats = false;
    Engine.addInvoker(r);
    return r;
}

/**
 * Canceles an Invoke
 *
 * @param {Invoke} invoke The invoke to cancel
 * @returns {boolean}
 */
function cancelInvoke(invoke: Invoke): boolean {
    let idx = Engine['_invokers'].indexOf(invoke);
    if (idx > -1) {
        Engine['_invokers'].splice(idx, 1);
        return true;
    }
    return false;
}

/**
 * Creates a new instance of a Prefab or GameObject
 *
 * @template T
 * @param {GameObjectType<T>} object The object to create
 * @param {Vector2} [position] The position of creation
 * @param {Rotation} [rotation] The rotation at creation
 * @returns {GameObject}
 */
function instantiate<T extends Prefab>(object: GameObjectType<T> | GameObject, position?: Vector2, rotation?: Rotation): GameObject {
    let obj: GameObject;
    if (object instanceof GameObject) {
        obj = Obj.clone(object) as GameObject;
    } else {
        let g = new object() as T;
        obj = g.init();
    }
    if (!position) { position = Vector2.zero; }
    if (!rotation) { rotation = Rotation.left; }
    obj.transform.position = position;
    obj.transform.rotation = rotation;
    return obj;
}

/**
 * Destroys a gameobject
 *
 * @param {GameObject} gameObject The GameObject to be destroyed
 * @param {number} [delay=0] How long to wait until it gets deleted
 */
function destroy(object: GameObject | Component, delay: number = 0): void {
    if (delay <= 0) {
        object.destroy();
        return;
    }
    invoke(function () {
        object.destroy();
    }, delay);
}

/**
 * Sets the draw depth of a GameObject based on its 'y' position
 *
 * @param {GameObject} gameObject The GameObject to affect
 * @param {SpriteRenderer} [spr] The sprite renerer if it is known. This value should be passed for performance gains.
 */
function setVerticalDepth(gameObject: GameObject, spr?: SpriteRenderer): void {
    if (!spr) {
        spr = gameObject.getComponent(SpriteRenderer);
    }
    if (spr) {
        spr.depth = gameObject.transform.position.y;
    }
}