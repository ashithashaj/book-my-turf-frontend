// components/Gallery.jsx
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ photos = [] }) => {
  // react-image-gallery expects an array of objects: { original, thumbnail }
  const images = photos.map((url) => ({
    original: url,
    thumbnail: url, // If you have separate thumbnails, you can update this
  }));

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ImageGallery
        items={images}
        showThumbnails={true}
        showPlayButton={false}
        showFullscreenButton={false}
        lazyLoad={true}
        showBullets={true}
        slideInterval={4000}
        autoPlay={true}
        autoPlayInterval={3000}
      />
    </div>
  );
};

export default Gallery;
