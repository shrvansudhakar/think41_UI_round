function CanvasDisplay({ label, canvasRef, showHover = false, onPixelHover }) {
    const handleMouseMove = (e) => {
        if (!showHover || !canvasRef.current || !onPixelHover) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);

        const ctx = canvas.getContext("2d");
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        onPixelHover({
            x,
            y,
            r: pixel[0],
            g: pixel[1],
            b: pixel[2],
            a: pixel[3],
        });
    };

    return (
        <div>
            <p>{label}</p>
            <canvas
                ref={canvasRef}
                style={{ border: "1px solid black" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() =>
                    showHover && onPixelHover && onPixelHover(null)
                }
            />
        </div>
    );
}

export default CanvasDisplay;
