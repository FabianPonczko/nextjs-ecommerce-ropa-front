
// components/ZoomOnHoverImage.js
import React from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

const ZoomOnHoverImage = ({ src, alt }) => {
    return (
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
            <InnerImageZoom
                src={src}
                zoomSrc={src} // Puedes usar una imagen de mayor resolución para el zoom
                alt={alt}
                zoomType="hover"
                zoomPreload={true}
                hideHint={true}
            />
        </div>
    );
};

export default ZoomOnHoverImage;
