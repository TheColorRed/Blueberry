class Transform extends Component {

    public position: Vector2 = Vector2.zero;
    public rotation: Rotation = Rotation.up;
    public scale: Vector2 = Vector2.zero;

    public translate(translation: Vector2): void {
        this.position = new Vector2(
            this.position.x + translation.x,
            this.position.y + translation.y
        );
    }

}