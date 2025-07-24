import React, { useState, useRef } from "react";
import ImageUploader from "./components/ImageUploader";
// import CanvasDisplay from "./components/CanvasDisplay";
import { apply3x3Smoothing } from "./utils/smoothing";

function App() {
    const [image, setImage] = useState(null);
    const originalCanvasRef = useRef(null);
    const smoothCanvasRef = useRef(null);

    const handleSmooth = () => {
        if (!image || !originalCanvasRef.current || !smoothCanvasRef.current)
            return;

        const origCanvas = originalCanvasRef.current;
        const smoothCanvas = smoothCanvasRef.current;

        const ctx = origCanvas.getContext("2d");
        const imgData = ctx.getImageData(
            0,
            0,
            origCanvas.width,
            origCanvas.height
        );

        const smoothed = apply3x3Smoothing(
            imgData,
            origCanvas.width,
            origCanvas.height
        );

        smoothCanvas.width = origCanvas.width;
        smoothCanvas.height = origCanvas.height;
        const smoothCtx = smoothCanvas.getContext("2d");
        smoothCtx.putImageData(smoothed, 0, 0);
    };

    return (
        <div>
            <h2>Image Smoothing Filter</h2>
            <ImageUploader onImageLoad={setImage} />
            <h3>Original Image</h3>
            <canvas
                ref={originalCanvasRef}
                id="original"
                style={{ border: "1px solid #000" }}
            />
            <button onClick={handleSmooth}>Smooth Image</button>
            <h3>Smoothed Image</h3>
            <canvas
                ref={smoothCanvasRef}
                id="smoothed"
                style={{ border: "1px solid #000" }}
            />
        </div>
    );
}

export default App;
