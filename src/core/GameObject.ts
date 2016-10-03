class GameObject {

    private _destroy: boolean = false;
    private _started: boolean = false;
    private _components: Component[] = [];
    private _transform: Transform;
    private _isActive: boolean = true;
    private name: string;

    public constructor(name: string = 'GameObject') {
        this._transform = this.addComponent(Transform);
        this.name = name;
        Engine.addGameObject(this);
    }

    public get components(): Component[] {
        return this._components;
    }

    public get transform(): Transform {
        return this._transform;
    }

    public destroy() {
        this._destroy = true;
    }

    public addComponent<T extends Component>(type: ComponentType<T>): T {
        let c = new type() as T;
        c['gameObject'] = this;
        c['transform'] = this._transform;
        this._components.push(c);
        return c;
    }

    public getComponent<T extends Component>(type: ComponentType<T> | string): T {
        for (let i = 0; i < this._components.length; i++) {
            if (typeof type === 'string') {
                let evalT = type.replace(/[^a-zA-Z0-9_]/ig, '');
                if (this._components[i].constructor.name == evalT) {
                    return this._components[i] as T;
                }
            } else {
                if (this._components[i].constructor == type) {
                    return this._components[i] as T;
                }
            }
        }
        return null;
    }

    public static getByName(name: string): GameObject {
        for (let i in Engine.gameObjects) {
            let obj = Engine.gameObjects[i];
            if (obj.name == name) {
                return obj;
            }
        }
        return null;
    }

    public setActive(active: boolean): void {
        this._isActive = active;
    }

    public sendMessage(message: string) {
        if (!this._isActive) { return; }
        this._components.forEach(component => {
            if (typeof component[message] == 'function') {
                if (message == 'start') {
                    if (component['started']) { return; }
                    component['started'] = true;
                }
                component[message]();
            }
        });
    }

}