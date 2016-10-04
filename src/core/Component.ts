class Component extends Obj {

    protected gameObject: GameObject;
    protected transform: Transform;
    protected started: boolean = false;

    public getComponent<T extends Component>(comp: ComponentType<T>): T {
        return this.gameObject.getComponent(comp);
    }

    public addComponent<T extends Component>(comp: ComponentType<T>): T {
        return this.gameObject.addComponent(comp);
    }

    public setActive(isActive: boolean): void {
        this.gameObject.setActive(isActive);
    }

}