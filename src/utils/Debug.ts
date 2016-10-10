class Debug {

    public static enabled: boolean = false;

    public static drawCollider(item: GameObject) {
        let collider = item.getComponent(Collider);
        if (collider && collider.points.length > 0) {
            let origin = item.getComponent(SpriteRenderer).sprite.getOrigin();
            let ctx = Stage.instance.context;
            ctx.beginPath();
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 1;
            ctx.moveTo(collider.points[0].x, collider.points[0].y);
            let i = collider.points.length;
            while(i--){
                let point = collider.points[i];
                ctx.lineTo(point.x, point.y);
            }
            ctx.lineTo(collider.points[0].x, collider.points[0].y);
            ctx.stroke();
        }
    }

    public static drawOrigin(item: GameObject) {
        let ctx = Stage.instance.context;
        ctx.beginPath();
        ctx.strokeStyle = '#0000ff';
        ctx.lineWidth = 2;
        ctx.font = '10pt sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.name, item.transform.position.x, item.transform.position.y);
        ctx.moveTo(
            item.transform.position.x,
            item.transform.position.y
        );
        ctx.lineTo(
            item.transform.position.x,
            item.transform.position.y - 10
        );
        ctx.moveTo(
            item.transform.position.x,
            item.transform.position.y
        );
        ctx.lineTo(
            item.transform.position.x,
            item.transform.position.y + 10
        );
        ctx.moveTo(
            item.transform.position.x,
            item.transform.position.y
        );
        ctx.lineTo(
            item.transform.position.x + 10,
            item.transform.position.y
        );
        ctx.moveTo(
            item.transform.position.x,
            item.transform.position.y
        );
        ctx.lineTo(
            item.transform.position.x - 10,
            item.transform.position.y
        );
        ctx.stroke();
    }

}