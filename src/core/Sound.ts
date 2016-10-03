class Sound {

    private _audio: HTMLAudioElement;

    public constructor(audio: HTMLAudioElement) {
        this._audio = audio;
    }

    public play() {
        let audio: HTMLAudioElement = this._audio.cloneNode() as HTMLAudioElement;
        audio.play();
        audio.addEventListener('ended', event => {
            audio.currentTime = 0;
            audio.play();
        });
        return new Sound(audio);
    }

    public playOnce() {
        let audio: HTMLAudioElement = this._audio.cloneNode() as HTMLAudioElement;
        audio.play();
        audio.addEventListener('ended', event => {
            audio = null;
        });
        return new Sound(audio);
    }

    public end() {
        this._audio = null;
    }

}