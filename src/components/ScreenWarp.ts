class ScreenWarp extends Component {

    update() {
        // Horizontal warping
        if (this.transform.position.x > Stage.width) {
            this.transform.position = new Vector2(0, this.transform.position.y);
        }
        if (this.transform.position.x < 0) {
            this.transform.position = new Vector2(Stage.width, this.transform.position.y);
        }
        // Vertical warping
        if (this.transform.position.y > Stage.height) {
            this.transform.position = new Vector2(this.transform.position.x, 0);
        }
        if (this.transform.position.y < 0) {
            this.transform.position = new Vector2(this.transform.position.x, Stage.height);
        }
    }

}