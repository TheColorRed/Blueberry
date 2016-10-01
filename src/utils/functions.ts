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