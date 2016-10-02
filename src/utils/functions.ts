function invokeRepeating(callback:Function, delay: number, repeatRate: number) {
    let r = new Invoke;
    r.delay = delay;
    r.interval = repeatRate;
    r.callback = callback;
    Engine.addInvoker(r);
}

function invoke(callback:Function, delay: number) {
    let r = new Invoke;
    r.delay = delay;
    r.callback = callback;
    r.repeats = false;
    Engine.addInvoker(r);
}


interface GameObjectType<T extends Prefab> {
    new(): T;
}

function instantiate<T extends Prefab>(object: GameObjectType<T>, position?: Vector2, rotation?: Rotation): GameObject {
    let g = new object() as T;
    return g.init(position, rotation);
}

function destroy(gameObject: GameObject, delay: number = 0) {
    invoke(function () {
        gameObject.destroy();
    }, delay);

}