class Input {

    public static keys: Key[] = [];

    public static setKeyPressed(value: number) {
        for (let i = 0; i < this.keys.length; i++) {
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
        for (let i = 0; i < this.keys.length; i++) {
            let key = this.keys[i];
            if (key.value == value) {
                key.isPressed = false;
                key.isDown = false;
                key.state = KeyState.Released;
                return;
            }
        }
    }

    public static clearKeyPress() {
        for (let i = 0; i < this.keys.length; i++) {
            let key = this.keys[i];
            key.isPressed = false;
            if (key.state == KeyState.Released || key.state == KeyState.Pressed) {
                key.state = KeyState.None;
            }
        }
    }

    public static keyPressed(value: number) {
        for (let i = 0; i < this.keys.length; i++) {
            let key = this.keys[i];
            if (value == key.value && key.state == KeyState.Pressed) {
                return true;
            }
        }
        return false;
    }

    public static keyDown(value: number) {
        for (let i = 0; i < this.keys.length; i++) {
            let key = this.keys[i];
            if (value == key.value && key.isDown) {
                return true;
            }
        }
        return false;
    }

    public static keyReleased(value: number) {
        for (let i = 0; i < this.keys.length; i++) {
            let key = this.keys[i];
            if (value == key.value && key.state == KeyState.Released) {
                return true;
            }
        }
        return false;
    }

    public static buttonPressed(value: string): boolean {
        for (let i = 0; i < this.keys.length; i++) {
            let key = this.keys[i];
            for (let j = 0; j < InputTypes.items.length; j++) {
                let input = InputTypes.items[j];
                if (input.name == value) {
                    for (let k = 0; k < input.keys.length; k++) {
                        if (Input.keyPressed(input.keys[k] as number)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public static buttonDown(value: string): boolean {
        for (let i = 0; i < this.keys.length; i++) {
            let key = this.keys[i];
            for (let j = 0; j < InputTypes.items.length; j++) {
                let input = InputTypes.items[j];
                if (input.name == value) {
                    for (let k = 0; k < input.keys.length; k++) {
                        if (Input.keyDown(input.keys[k] as number)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public static buttonReleased(value: string): boolean {
        for (let i = 0; i < this.keys.length; i++) {
            let key = this.keys[i];
            for (let j = 0; j < InputTypes.items.length; j++) {
                let input = InputTypes.items[j];
                if (input.name == value) {
                    for (let k = 0; k < input.keys.length; k++) {
                        if (Input.keyReleased(input.keys[k] as number)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

}

enum KeyState { None, Pressed, Released };

class Key {
    public value: number;
    public isPressed: boolean = false;
    public isDown: boolean = false;
    public state: KeyState = KeyState.None;
}

class InputTypes {

    public static items: { name: string, keys: Keyboard[] }[] = [
        {
            name: 'horizontal',
            keys: [
                Keyboard.A, Keyboard.D, Keyboard.LEFT, Keyboard.RIGHT
            ]
        },
        {
            name: 'vertical',
            keys: [
                Keyboard.W, Keyboard.S, Keyboard.UP, Keyboard.DOWN
            ]
        },
        {
            name: 'fire',
            keys: [
                Keyboard.SPACE
            ]
        }
    ];

}