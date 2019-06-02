export class Configuration {
    constructor() {
        this.meta = null;
        this.backgroundColour = "";
        this.fontColour = "";
        this.margins = {vertical: 0, horizontal: 0};
        this.padding = {vertical: 0, horizontal: 0};
        this.horizontalAlignment = Alignment.Start;
        this.verticalAlignment = Alignment.Start;
        this.fontSize = 14;
    }
}

export const Alignment = Object.freeze({
    Start: Symbol("Start"),
    Center: Symbol("Center"),
    End: Symbol("End")
});