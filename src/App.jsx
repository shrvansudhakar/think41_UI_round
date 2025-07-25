import { useRef, useState } from "react";
import ImageUpload from "./components/ImageUpload";
import CanvasDisplay from "./components/CanvasDisplay";
import Controls from "./components/Controls";

function App() {
    const originalCanvasRef = useRef(null);
    const smoothedCanvasRef = useRef(null);
    const imageRef = useRef(null);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [grayscaleFirst, setGrayscaleFirst] = useState(false);
    const [kernelSize, setKernelSize] = useState(3);
    const [hoveredPixel, setHoveredPixel] = useState(null);

    const handleImageLoad = (img) => {
        const canvas = originalCanvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setImageLoaded(true);
        imageRef.current = img;
    };

    const handleSmoothImage = () => {
        const inputCanvas = originalCanvasRef.current;
        const outputCanvas = smoothedCanvasRef.current;
        const width = inputCanvas.width;
        const height = inputCanvas.height;

        const inputCtx = inputCanvas.getContext("2d");
        const outputCtx = outputCanvas.getContext("2d");

        let imageData = inputCtx.getImageData(0, 0, width, height);
        let data = imageData.data;

        if (grayscaleFirst) {
            for (let i = 0; i < data.length; i += 4) {
                const avg =
                    0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                data[i] = data[i + 1] = data[i + 2] = avg;
            }
        }

        const outputData = new Uint8ClampedArray(data.length);
        const offset = Math.floor(kernelSize / 2);
        const getIndex = (x, y) => (y * width + x) * 4;

        for (let y = offset; y < height - offset; y++) {
            for (let x = offset; x < width - offset; x++) {
                let r = 0,
                    g = 0,
                    b = 0,
                    a = 0;
                let count = 0;

                for (let dy = -offset; dy <= offset; dy++) {
                    for (let dx = -offset; dx <= offset; dx++) {
                        const i = getIndex(x + dx, y + dy);
                        r += data[i];
                        g += data[i + 1];
                        b += data[i + 2];
                        a += data[i + 3];
                        count++;
                    }
                }

                const i = getIndex(x, y);
                outputData[i] = r / count;
                outputData[i + 1] = g / count;
                outputData[i + 2] = b / count;
                outputData[i + 3] = a / count;
            }
        }

        const outputImageData = new ImageData(outputData, width, height);
        outputCanvas.width = width;
        outputCanvas.height = height;
        outputCtx.putImageData(outputImageData, 0, 0);
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Image Smoothing Filter</h2>
            <ImageUpload onImageLoad={handleImageLoad} />
            <Controls
                grayscaleFirst={grayscaleFirst}
                setGrayscaleFirst={setGrayscaleFirst}
                kernelSize={kernelSize}
                setKernelSize={setKernelSize}
            />
            <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
                <CanvasDisplay
                    label="Original Image"
                    canvasRef={originalCanvasRef}
                    showHover
                    onPixelHover={setHoveredPixel}
                />
                <CanvasDisplay
                    label="Smoothed Image"
                    canvasRef={smoothedCanvasRef}
                />
            </div>
            {imageLoaded && (
                <button
                    onClick={handleSmoothImage}
                    style={{ marginTop: "1rem" }}
                >
                    Smooth Image
                </button>
            )}
            {hoveredPixel && (
                <div style={{ marginTop: "1rem" }}>
                    <strong>
                        Pixel @ ({hoveredPixel.x}, {hoveredPixel.y})
                    </strong>{" "}
                    → R: {hoveredPixel.r}, G: {hoveredPixel.g}, B:{" "}
                    {hoveredPixel.b}, A: {hoveredPixel.a}
                </div>
            )}
        </div>
    );
}

export default App;
