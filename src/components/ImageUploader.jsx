import React from "react";

const ImageUploader = ({ onImageLoad }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        img.onload = () => onImageLoad(img);
        img.src = URL.createObjectURL(file);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    );
};

export default ImageUploader;
