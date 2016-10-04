class Obj {

    public name: string = 'GameObject';

    private _destroy: boolean = false;

    public static clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    public destroy() {
        this._destroy = true;
    }

}