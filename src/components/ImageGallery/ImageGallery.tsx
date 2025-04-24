const ImageGallery = () => {
  // image gallery array
  const images = [
    "/src/assets/images/gallery/Bicycle-1.jpg",
    "/src/assets/images/gallery/Bicycle-2.jpg",
    "/src/assets/images/gallery/Bicycle-3.jpg",
    "/src/assets/images/gallery/Bicycle-4.jpg",
    "/src/assets/images/gallery/Bicycle-5.jpg",
    "/src/assets/images/gallery/Bicycle-6.jpg",
  ];

  return (
    <div className="container mx-auto px-4 py-16 font-inter">
      {/* <h2 className="text-3xl font-bold text-center text-secondary mb-12">
        Explore Our <span className="text-primary">Bicycle Collection</span>
      </h2> */}
      <h3 className="text-3xl font-bold text-secondary px-4 border-l-4 border-primary mb-8">
        <span className="text-primary">Explore Our </span> Bicycle Collection
      </h3>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-xl hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={src}
              alt={`bike-${idx + 1}`}
              className="w-full h-auto rounded-xl hover:scale-105 transition-transform duration-500 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
