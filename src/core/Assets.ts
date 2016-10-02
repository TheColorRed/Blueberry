class Assets {

    public static sprites: SpriteAsset[] = [];
    public static sounds: SoundAsset[] = [];

    public static getSprite(name: string): Sprite {
        for (let i = 0; i < this.sprites.length; i++){
            if (this.sprites[i].name == name) {
                return this.sprites[i].sprite;
            }
        }
        return null;
    }

    public static getSound(name: string): Sound {
        for (let i = 0; i < this.sounds.length; i++){
            if (this.sounds[i].name == name) {
                return this.sounds[i].sound;
            }
        }
        return null;
    }

}

class Asset {
    public name: string = '';

    public constructor(name: string) {
        this.name = name;
    }
}

class SpriteAsset extends Asset {
    public sprite: Sprite;

    public constructor(name: string, sprite: Sprite) {
        super(name);
        this.sprite = sprite;
    }
}

class SoundAsset extends Asset {
    public sound: Sound;

    public constructor(name: string, sound: Sound) {
        super(name);
        this.sound = sound;
    }
}