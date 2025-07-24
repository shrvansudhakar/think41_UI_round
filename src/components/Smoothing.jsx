export function apply3x3Smoothing(imageData, width, height) {
    const src = imageData.data;
    const output = new Uint8ClampedArray(src.length);

    const getIndex = (x, y) => (y * width + x) * 4;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let r = 0,
                g = 0,
                b = 0,
                a = 0;

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const i = getIndex(x + dx, y + dy);
                    r += src[i];
                    g += src[i + 1];
                    b += src[i + 2];
                    a += src[i + 3];
                }
            }

            const i = getIndex(x, y);
            output[i] = r / 9;
            output[i + 1] = g / 9;
            output[i + 2] = b / 9;
            output[i + 3] = a / 9;
        }
    }

    return new ImageData(output, width, height);
}
