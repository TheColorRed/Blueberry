interface ComponentType<T extends Component> {
    new(): T;
}
interface GameObjectType<T extends Prefab> {
    new(): T;
}