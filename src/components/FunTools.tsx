import { useState, useEffect } from 'react';

const FunTools = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: number;
    if (enhancedImage || upscaledImage) {
      timer = setTimeout(() => {
        setSelectedImage(null);
        setEnhancedImage(null);
        setUpscaledImage(null);
      }, 5 * 60 * 1000); // 5 minutes
    }
    return () => clearTimeout(timer);
  }, [enhancedImage, upscaledImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setEnhancedImage(null);
        setUpscaledImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhanceAndUpscale = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setEnhancedImage(null);
    setUpscaledImage(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = selectedImage;

      img.onload = () => {
        const filter = 'brightness(1.05) contrast(1.1) saturate(1.1) blur(0.3px)';

        // Create Enhanced Image (normal size)
        const canvasEnhanced = document.createElement('canvas');
        canvasEnhanced.width = img.naturalWidth;
        canvasEnhanced.height = img.naturalHeight;
        const ctxEnhanced = canvasEnhanced.getContext('2d');
        if (ctxEnhanced) {
          ctxEnhanced.filter = filter;
          ctxEnhanced.drawImage(img, 0, 0);
          setEnhancedImage(canvasEnhanced.toDataURL('image/png'));
        }

        // Create Upscaled Image (2x size)
        const canvasUpscaled = document.createElement('canvas');
        canvasUpscaled.width = img.naturalWidth * 2;
        canvasUpscaled.height = img.naturalHeight * 2;
        const ctxUpscaled = canvasUpscaled.getContext('2d');
        if (ctxUpscaled) {
          ctxUpscaled.filter = filter;
          ctxUpscaled.drawImage(img, 0, 0, canvasUpscaled.width, canvasUpscaled.height);
          setUpscaledImage(canvasUpscaled.toDataURL('image/png'));
        }
        setLoading(false);
      };
      
      img.onerror = () => {
        console.error("Error loading image for canvas processing.");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      setLoading(false);
    }
  };

  return (
    <section id="fun-tools" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8">Fun Tools</h2>
      
      <div className="bg-secondary-light dark:bg-secondary rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">HD Image Converter</h3>
        <p className="text-center text-textPrimary-light/80 dark:text-textPrimary/80 mb-6 max-w-2xl mx-auto">
          Enhance image quality, remove noise and artifacts, sharpen details, and upscale to HD resolution. This tool makes your image look clean, realistic, and high-definition, with clear edges and smooth gradients, while preserving natural colors and textures.
        </p>
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-accent-light dark:file:bg-accent file:text-white
                hover:file:bg-accent-light/80 dark:hover:file:bg-accent/80
                cursor-pointer"
            />
            
            {selectedImage && !loading && (
              <button
                onClick={handleEnhanceAndUpscale}
                className="bg-accent-light dark:bg-accent text-white px-6 py-2 rounded-full
                  hover:bg-accent-light/80 dark:hover:bg-accent/80 transition-colors"
              >
                Make My Picture HD
              </button>
            )}

            {loading && (
              <div className="text-center p-2">
                <p>Processing image...</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedImage && (
              <div className="space-y-2">
                <h4 className="font-medium text-center">Original Image</h4>
                <img
                  src={selectedImage}
                  alt="Original"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            
            {upscaledImage && (
              <div className="space-y-2">
                 <h4 className="font-medium text-center">Enhanced & Upscaled Result</h4>
                <img
                  src={upscaledImage}
                  alt="Upscaled"
                  className="w-full h-auto rounded-lg"
                />
                <div className="flex justify-center gap-4 pt-2">
                  {enhancedImage && (
                     <a
                      href={enhancedImage}
                      download="enhanced-image.png"
                      className="bg-green-500 text-white px-4 py-2 rounded-full 
                        hover:bg-green-600 transition-colors text-center"
                    >
                      Download Enhanced
                    </a>
                  )}
                   <a
                    href={upscaledImage}
                    download="upscaled-image.png"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full
                      hover:bg-blue-600 transition-colors text-center"
                  >
                    Download Upscaled (2x)
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Placeholder for future tools */}
      <div className="text-center text-gray-600 dark:text-gray-400">
        More fun tools coming soon!
      </div>
    </section>
  );
};

export default FunTools; 