class GUIText extends Component {

    public text: string = '';

    public size: number = 12;
    public font: string = 'sans-serif';
    public horizontalAlign: string = HorizontalAlign.Start;
    public verticalAlign: string = VerticalAlign.Alphabetic;

}

class HorizontalAlign {
    public static readonly Start: string = 'start';
    public static readonly End: string = 'end';
    public static readonly Left: string = 'left';
    public static readonly Right: string = 'right';
    public static readonly Center: string = 'center';
}

class VerticalAlign {
    public static readonly Top: string = 'top';
    public static readonly Hanging: string = 'hanging';
    public static readonly Middle: string = 'middle';
    public static readonly Alphabetic: string = 'alphabetic';
    public static readonly Ideographic: string = 'ideographic';
    public static readonly Bottom: string = 'bottom';
}

// enum TextAlign { Start, End, Left, Right, Center }
// enum VerticalAlign {Top, Hanging, Middle, Alphabetic, Ideo}