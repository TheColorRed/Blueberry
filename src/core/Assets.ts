class Assets {

    public static images: ImageAsset[] = [];

    public static getImage(name: string): ImageAsset {
        for (let i = 0; i < this.images.length; i++){
            if (this.images[i].name == name) {
                return this.images[i];
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

class ImageAsset extends Asset {
    public image: HTMLImageElement;
}