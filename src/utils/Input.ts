class Input {

    public static keys: Key[] = [];
    public static mouse: Button[] = [];

    public static mousePosition: Vector2 = Vector2.zero;

    public static setKeyPressed(value: number) {
        let i = this.keys.length;
        while (i--) {
            let key = this.keys[i];
            if (key.value == value && !key.isPressed && !key.isDown) {
                key.isPressed = true;
                key.isDown = true;
                key.state = KeyState.Pressed;
            }
            if (key.value == value) {
                return;
            }
        }
        let key = new Key();
        key.isPressed = true;
        key.isDown = true;
        key.state = KeyState.Pressed;
        key.value = value;
        this.keys.push(key);
    }

    public static setKeyReleased(value: number) {
        let i = this.keys.length;
        while (i--) {
            let key = this.keys[i];
            if (key.value == value) {
                key.isPressed = false;
                key.isDown = false;
                key.state = KeyState.Released;
                return;
            }
        }
    }

    public static setMouseReleased(value: number) {
        let i = this.mouse.length;
        while (i--) {
            let mouse = this.mouse[i];
            if (mouse.value == value) {
                mouse.isPressed = false;
                mouse.isDown = false;
                mouse.state = MouseState.Released;
                return;
            }
        }
    }

    public static setMousePressed(value: number) {
        let i = this.mouse.length;
        while (i--) {
            let mouse = this.mouse[i];
            if (mouse.value == value && !mouse.isPressed && !mouse.isDown) {
                mouse.isPressed = true;
                mouse.isDown = true;
                mouse.state = MouseState.Pressed;
            }
            if (mouse.value == value) {
                return;
            }
        }
        let mouse = new Button();
        mouse.isPressed = true;
        mouse.isDown = true;
        mouse.state = MouseState.Pressed;
        mouse.value = value;
        this.mouse.push(mouse);
    }

    public static setMousePosition(x: number, y: number) {
        this.mousePosition = new Vector2(x, y);
    }

    public static clearKeyPress() {
        let i = this.keys.length;
        while (i--) {
            let key = this.keys[i];
            key.isPressed = false;
            if (key.state == KeyState.Released || key.state == KeyState.Pressed) {
                key.state = KeyState.None;
            }
        }
    }

    public static clearMousePress() {
        let i = this.mouse.length;
        while (i--) {
            let mouse = this.mouse[i];
            mouse.isPressed = false;
            if (mouse.state == MouseState.Released || mouse.state == MouseState.Pressed) {
                mouse.state = MouseState.None;
            }
        }
    }

    public static keyPressed(value: number) {
        let i = this.keys.length;
        while (i--) {
            let key = this.keys[i];
            if (value == key.value && key.state == KeyState.Pressed) {
                return true;
            }
        }
        return false;
    }

    public static keyDown(value: number) {
        let i = this.keys.length;
        while (i--) {
            let key = this.keys[i];
            if (value == key.value && key.isDown) {
                return true;
            }
        }
        return false;
    }

    public static keyReleased(value: number) {
        let i = this.keys.length;
        while (i--) {
            let key = this.keys[i];
            if (value == key.value && key.state == KeyState.Released) {
                return true;
            }
        }
        return false;
    }

    public static mousePressed(value: number) {
        let i = this.mouse.length;
        while (i--) {
            let mouse = this.mouse[i];
            if (value == mouse.value && mouse.state == MouseState.Pressed) {
                return true;
            }
        }
        return false;
    }

    public static mouseDown(value: number) {
        let i = this.mouse.length;
        while (i--) {
            let mouse = this.mouse[i];
            if (value == mouse.value && mouse.isDown) {
                return true;
            }
        }
        return false;
    }

    public static mouseReleased(value: number) {
        let i = this.mouse.length;
        while (i--) {
            let mouse = this.mouse[i];
            if (value == mouse.value && mouse.state == MouseState.Released) {
                return true;
            }
        }
        return false;
    }

    public static buttonPressed(value: string): boolean {
        let j = InputTypes.items.length;
        while (j--) {
            let input = InputTypes.items[j];
            if (input.name == value) {
                if (input.keys.positive) {
                    let k = input.keys.positive.length;
                    while (k--) {
                        if (Input.keyPressed(input.keys.positive[k])) {
                            return true;
                        }
                    }
                }
                if (input.keys.negative) {
                    let k = input.keys.negative.length;
                    while (k--) {
                        if (Input.keyPressed(input.keys.negative[k])) {
                            return true;
                        }
                    }
                }
                if (input.mouse.positive) {
                    let k = input.mouse.positive.length;
                    while (k--) {
                        if (Input.mousePressed(input.mouse.positive[k])) {
                            return true;
                        }
                    }
                }
                if (input.mouse.negative) {
                    let k = input.mouse.negative.length;
                    while (k--) {
                        if (Input.mousePressed(input.mouse.negative[k])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public static buttonDown(value: string): boolean {
        let j = InputTypes.items.length;
        while (j--) {
            let input = InputTypes.items[j];
            if (input.name == value) {
                if (input.keys.positive) {
                    let k = input.keys.positive.length;
                    while (k--) {
                        if (Input.keyDown(input.keys.positive[k])) {
                            return true;
                        }
                    }
                }
                if (input.keys.negative) {
                    let k = input.keys.negative.length;
                    while (k--) {
                        if (Input.keyDown(input.keys.negative[k])) {
                            return true;
                        }
                    }
                }
                if (input.mouse.positive) {
                    let k = input.mouse.positive.length;
                    while (k--) {
                        if (Input.mouseDown(input.mouse.positive[k])) {
                            return true;
                        }
                    }
                }
                if (input.mouse.negative) {
                    let k = input.mouse.negative.length;
                    while (k--) {
                        if (Input.mouseDown(input.mouse.negative[k])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public static buttonReleased(value: string): boolean {
        let j = InputTypes.items.length;
        while (j--) {
            let input = InputTypes.items[j];
            if (input.name == value) {
                if (input.keys.positive) {
                    let k = input.keys.positive.length;
                    while (k--) {
                        if (Input.keyReleased(input.keys.positive[k])) {
                            return true;
                        }
                    }
                }
                if (input.keys.negative) {
                    let k = input.keys.negative.length;
                    while (k--) {
                        if (Input.keyReleased(input.keys.negative[k])) {
                            return true;
                        }
                    }
                }
                if (input.mouse.positive) {
                    let k = input.mouse.positive.length;
                    while (k--) {
                        if (Input.mouseReleased(input.mouse.positive[k])) {
                            return true;
                        }
                    }
                }
                if (input.mouse.negative) {
                    let k = input.mouse.negative.length;
                    while (k--) {
                        if (Input.mouseReleased(input.mouse.negative[k])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public static getAxis(value: string): number {
        let j = InputTypes.items.length;
        while (j--) {
            let input = InputTypes.items[j];
            if (input.name == value) {
                if (input.keys) {
                    let k = input.keys.positive.length;
                    while (k--) {
                        if (Input.keyDown(input.keys.positive[k])) {
                            return 1;
                        }
                    }
                    k = input.keys.negative.length;
                    while (k--) {
                        if (Input.keyDown(input.keys.negative[k])) {
                            return -1;
                        }
                    }
                }
            }
        }
        return 0;
    }

    public static addButton(name: string, input: { key?: number, mouse?: number }, isPositive: boolean = true) {
        let obj: {
            name: string,
            keys?: { positive?: number[], negative?: number[] },
            mouse?: { positive?: number[], negative?: number[] }
        };
        let i = InputTypes.items.length;
        while (i--) {
            if (InputTypes.items[i].name == name) {
                obj = InputTypes.items[i];
            }
        }
        if (obj) {
            if (isPositive) {
                if (input.key) {
                    obj.keys.positive.push(input.key);
                }
                if (input.mouse) {
                    obj.mouse.positive.push(input.mouse);
                }
            } else {
                if (input.key) {
                    obj.keys.negative.push(input.key);
                }
                if (input.mouse) {
                    obj.mouse.negative.push(input.mouse);
                }
            }
        } else {
            if (isPositive) {
                InputTypes.items.push({
                    name: name,
                    keys: { positive: [input.key] },
                    mouse: { negative: [input.mouse] }
                });
            } else {
                InputTypes.items.push({
                    name: name,
                    keys: { negative: [input.key] },
                    mouse: { negative: [input.mouse] }
                });
            }
        }
    }
    public static setButton(name: string, input: { keys?: number[], mouse?: number[] }, isPositive: boolean = true) {
        let obj: {
            name: string,
            keys?: { positive?: number[], negative?: number[] },
            mouse?: { positive?: number[], negative?: number[] }
        };
        let i = InputTypes.items.length;
        while (i--) {
            if (InputTypes.items[i].name == name) {
                obj = InputTypes.items[i];
            }
        }
        if (obj) {
            if (isPositive) {
                if (input.keys) {
                    obj.keys.positive = input.keys;
                }
                if (input.mouse) {
                    obj.mouse.positive = input.mouse;
                }
            } else {
                if (input.keys) {
                    obj.keys.negative = input.keys;
                }
                if (input.mouse) {
                    obj.mouse.negative = input.mouse;
                }
            }
        } else {
            if (isPositive) {
                InputTypes.items.push({
                    name: name,
                    keys: { positive: input.keys },
                    mouse: { positive: input.mouse }
                });
            } else {
                InputTypes.items.push({
                    name: name,
                    keys: { negative: input.keys },
                    mouse: { negative: input.mouse }
                });
            }
        }
    }
}

enum KeyState { None, Pressed, Released };
enum MouseState { None, Pressed, Released };

class Key {
    public value: number;
    public isPressed: boolean = false;
    public isDown: boolean = false;
    public state: KeyState = KeyState.None;
}

class Button {
    public value: number;
    public isPressed: boolean = false;
    public isDown: boolean = false;
    public state: MouseState = MouseState.None;
}

class InputTypes {

    public static items: {
        name: string,
        keys?: {
            positive?: number[],
            negative?: number[]
        },
        mouse?: {
            positive?: number[],
            negative?: number[]
        }
    }[] = [
        {
            name: 'horizontal',
            keys: {
                positive: [Keyboard.D, Keyboard.RIGHT],
                negative: [Keyboard.A, Keyboard.LEFT]
            }
        },
        {
            name: 'vertical',
            keys: {
                positive: [Keyboard.S, Keyboard.DOWN],
                negative: [Keyboard.W, Keyboard.UP]
            }
        },
        {
            name: 'fire',
            keys: {
                positive: [Keyboard.SPACE]
            },
            mouse: {
                positive: [Mouse.LEFT]
            }
        }
    ];

}