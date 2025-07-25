function ImageUpload({ onImageLoad }) {
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        img.onload = () => onImageLoad(img);
        img.src = URL.createObjectURL(file);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleChange} />
        </div>
    );
}

export default ImageUpload;
