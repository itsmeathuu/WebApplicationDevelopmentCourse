import { useState, useEffect } from "react";
import { uploadProductImage, updateProductImage, deleteProductImage } from "../../api/ProductAdminApi";
import { getProductImages } from "../../api/Productsapi";
import { convertBase64toURL } from "../../utils/common";

const ImageManager = ({ productId, onImagesChange }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (productId) {
      loadImages();
    }
  }, [productId]);

  const loadImages = async () => {
    try {
      setLoading(true);
      const response = await getProductImages(productId);
      const sortedImages = (response.images || []).sort((a, b) => a.order - b.order);
      setImages(sortedImages);
      if (onImagesChange) {
        onImagesChange(sortedImages);
      }
    } catch (error) {
      console.error("Failed to load images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (files) => {
    if (!productId) {
      alert("Vui lòng lưu sản phẩm trước khi upload ảnh");
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file, index) => {
        const order = images.length + index + 1;
        return uploadProductImage(productId, file, order, "");
      });

      await Promise.all(uploadPromises);
      await loadImages(); // Reload images after upload
      alert("Upload ảnh thành công!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert(`Lỗi upload ảnh: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (imageId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa ảnh này?")) {
      return;
    }

    try {
      await deleteProductImage(imageId);
      await loadImages(); // Reload images after delete
      alert("Xóa ảnh thành công!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert(`Lỗi xóa ảnh: ${error.message}`);
    }
  };

  const handleImageReorder = async (imageId, newOrder) => {
    try {
      await updateProductImage(imageId, null, ""); // Update with new order
      await loadImages(); // Reload images after reorder
    } catch (error) {
      console.error("Reorder failed:", error);
      alert(`Lỗi sắp xếp ảnh: ${error.message}`);
    }
  };

  if (!productId) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <p className="text-gray-600">Vui lòng lưu sản phẩm trước để quản lý ảnh</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files)}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer ${uploading ? 'opacity-50' : ''}`}
        >
          <div className="text-gray-600">
            {uploading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
                Đang upload...
              </div>
            ) : (
              <>
                <p className="text-lg">📷 Chọn ảnh để upload</p>
                <p className="text-sm">Có thể chọn nhiều ảnh cùng lúc</p>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Images grid */}
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-2">Đang tải ảnh...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image._id} className="relative group">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={convertBase64toURL(image.buffer, image.mimetype)}
                  alt={image.altText || `Ảnh ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image controls */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="flex space-x-2">
                  {/* Move up */}
                  {index > 0 && (
                    <button
                      onClick={() => handleImageReorder(image._id, image.order - 1)}
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      title="Di chuyển lên"
                    >
                      ↑
                    </button>
                  )}

                  {/* Move down */}
                  {index < images.length - 1 && (
                    <button
                      onClick={() => handleImageReorder(image._id, image.order + 1)}
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      title="Di chuyển xuống"
                    >
                      ↓
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleImageDelete(image._id)}
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    title="Xóa ảnh"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Order indicator */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <p>Chưa có ảnh nào. Hãy upload ảnh đầu tiên!</p>
        </div>
      )}
    </div>
  );
};

export default ImageManager;
