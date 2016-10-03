class GameObject {

    private _destroy: boolean = false;
    private _started: boolean = false;
    private _components: Component[] = [];
    private _transform: Transform;

    public constructor(name: string = 'GameObject') {
        this._transform = this.addComponent(Transform);
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

    public sendMessage(message: string) {
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