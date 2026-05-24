import multer from 'multer';

const storage = multer.memoryStorage();

// Cấu hình middleware nhận hình ảnh từ client
const upload = multer({
    storage: storage,
    limits: { fieldSize: 2 * 1024 * 1024 }, // Set dung lượng tối đa cho phép
    fileFilter: (req, file, callback) => {

        // Chỉ chấp nhận file hình ảnh
        if (!file.mimetype.startsWith('image/')) {
            return callback(new Error('Only image files are allowed'), false);
        }
        callback(null, true);
    }
});

export default upload;