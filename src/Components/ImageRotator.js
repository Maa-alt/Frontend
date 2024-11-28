import React, { useEffect, useState } from 'react';

const ImageRotator = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(intervalId);
    }, [images]);

    if (images.length === 0) return null; // Prevent rendering if no images

    return (
        <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
            <img
                src={images[currentImageIndex]}
                alt="Rotating"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
};

export default ImageRotator;