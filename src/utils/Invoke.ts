class Invoke {

    public firstRun: boolean = false;
    public repeats: boolean = true;
    public delay: number = 0;
    public interval: number = 0;
    public lastCalled: number = Time.time;
    public callback: Function = null;

}