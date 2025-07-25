function Controls({
    grayscaleFirst,
    setGrayscaleFirst,
    kernelSize,
    setKernelSize,
}) {
    return (
        <>
            <div style={{ marginTop: "1rem" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={grayscaleFirst}
                        onChange={(e) => setGrayscaleFirst(e.target.checked)}
                    />
                    Convert to Grayscale First
                </label>
            </div>

            <div style={{ marginTop: "1rem" }}>
                <label>
                    Smoothing Kernel Size:&nbsp;
                    <select
                        value={kernelSize}
                        onChange={(e) =>
                            setKernelSize(parseInt(e.target.value))
                        }
                    >
                        <option value={3}>3x3</option>
                        <option value={5}>5x5</option>
                        <option value={7}>7x7</option>
                    </select>
                </label>
            </div>
        </>
    );
}

export default Controls;
