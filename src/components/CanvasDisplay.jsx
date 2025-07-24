import React, { useRef, useEffect } from "react";

const CanvasDisplay = ({ image, id }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!image) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    }, [image]);

    return (
        <canvas ref={canvasRef} id={id} style={{ border: "1px solid #ccc" }} />
    );
};

export default CanvasDisplay;
