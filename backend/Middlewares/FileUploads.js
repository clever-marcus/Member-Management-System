const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // Cloudinary account name
    api_key: process.env.CLOUDINARY_API_KEY, // API key for authentication
    api_secret: process.env.CLOUDINARY_API_SECRET // API secret for authentication
});

// Configure the storage engine for multer to use Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // cloudinary instance to use for storage
    params: {
        folder: 'uploads', // Images files to be stored in this folder
        format: async (req, file) => 'png', // Set the file format to PNG (can use a promise if needed)
        public_id: (req, file) => file.originalname.split('.')[0] + "" // Generate a public ID using the file name (excluding the extension)
    },
});

// Create a multer using the configured cloudinary storage
const cloudinaryFileUploader = multer({ storage: storage });

module.exports = {
    cloudinaryFileUploader
}

