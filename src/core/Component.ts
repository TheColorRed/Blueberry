interface ComponentType<T extends Component> {
    new(): T;
}

class Component {

    protected gameObject: GameObject;
    protected transform: Transform;
    protected started: boolean = false;

}