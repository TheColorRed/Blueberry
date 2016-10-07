class GameObject extends Obj {

    private _started: boolean = false;
    private _components: Component[] = [];
    private _transform: Transform;
    private _isActive: boolean = true;

    public tag: string = '';

    public constructor(name: string = 'GameObject') {
        super();
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

    public addComponent<T extends Component>(type: ComponentType<T>): T {
        let c = new type() as T;
        c.gameObject = this;
        c.transform = this._transform;
        this._components.push(c);
        return c;
    }

    public getComponent<T extends Component>(type: ComponentType<T> | string): T {
        let i = this._components.length;
        while (i--) {
            let comp = this._components[i];
            if (typeof type === 'string') {
                let evalT = type.replace(/[^a-zA-Z0-9_]/ig, '');
                if (comp.constructor.name == evalT) {
                    return comp as T;
                }
            } else if (comp.constructor == type) {
                return comp as T;
            }
        }
        return null;
    }

    public static getByName(name: string): GameObject {
        let i = Engine.gameObjects.length;
        while(i--) {
            let obj = Engine.gameObjects[i];
            if (obj.name == name) {
                return obj;
            }
        }
        return null;
    }

    public setActive(isActive: boolean): void {
        this._isActive = isActive;
    }

    public sendMessage(message: string, ...options: any[]) {
        if (!this._isActive) { return; }
        let i = this._components.length;
        while (i--) {
            let component = this._components[i];
            if (message == 'start') {
                if (component['started']) { return; }
                component['started'] = true;
            } else if (!component['started']) { return; }
            if (typeof component[message] == 'function') {
                component[message].apply(component, options);
            }
        }
    }

}