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
                    for (let k = 0; k < input.keys.positive.length; k++) {
                        if (Input.keyPressed(input.keys.positive[k])) {
                            return true;
                        }
                    }
                    for (let k = 0; k < input.keys.negative.length; k++) {
                        if (Input.keyPressed(input.keys.negative[k])) {
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
                    for (let k = 0; k < input.keys.positive.length; k++) {
                        if (Input.keyDown(input.keys.positive[k])) {
                            return true;
                        }
                    }
                    for (let k = 0; k < input.keys.negative.length; k++) {
                        if (Input.keyDown(input.keys.negative[k])) {
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
                    for (let k = 0; k < input.keys.positive.length; k++) {
                        if (Input.keyReleased(input.keys.positive[k])) {
                            return true;
                        }
                    }
                    for (let k = 0; k < input.keys.negative.length; k++) {
                        if (Input.keyReleased(input.keys.negative[k])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public static getAxis(value: string): number {
        for (let i = 0; i < this.keys.length; i++) {
            let key = this.keys[i];
            for (let j = 0; j < InputTypes.items.length; j++) {
                let input = InputTypes.items[j];
                if (input.name == value) {
                    for (let k = 0; k < input.keys.positive.length; k++) {
                        if (Input.keyDown(input.keys.positive[k])) {
                            return 1;
                        }
                    }
                    for (let k = 0; k < input.keys.negative.length; k++) {
                        if (Input.keyDown(input.keys.negative[k])) {
                            return -1;
                        }
                    }
                }
            }
        }
        return 0;
    }


    public static addButton(name: string, input: number, isPositive: boolean = true) {
        let obj: { name: string, keys: { positive?: number[], negative?: number[] } };
        for (let i = 0; i < InputTypes.items.length; i++) {
            if (InputTypes.items[i].name == name) {
                obj = InputTypes.items[i];
            }
        }
        if (obj) {
            if (isPositive) {
                obj.keys.positive.push(input);
            } else {
                obj.keys.negative.push(input);
            }
        } else {
            if (isPositive) {
                InputTypes.items.push({
                    name: name,
                    keys: { positive: [input] }
                });
            } else {
                InputTypes.items.push({
                    name: name,
                    keys: { negative: [input] }
                });
            }
        }
    }
    public static setButton(name: string, inputs: number[], isPositive: boolean = true) {
        let obj: { name: string, keys: { positive?: number[], negative?: number[] } };
        for (let i = 0; i < InputTypes.items.length; i++) {
            if (InputTypes.items[i].name == name) {
                obj = InputTypes.items[i];
            }
        }
        if (obj) {
            if (isPositive) {
                obj.keys.positive = inputs;
            } else {
                obj.keys.negative = inputs;
            }
        } else {
            if (isPositive) {
                InputTypes.items.push({
                    name: name,
                    keys: { positive: inputs }
                });
            } else {
                InputTypes.items.push({
                    name: name,
                    keys: { negative: inputs }
                });
            }
        }
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

    public static items: {
        name: string,
        keys: {
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
            }
        }
    ];

}