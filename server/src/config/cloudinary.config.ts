//* Imports
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../constants/constants.js';
import fs from 'fs';

//* Cloudinary configuration
cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET 
});

//* Upload image on Cloudinary
const uploadOnCloudinary = async (localFilePath : string) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response;
    } catch (err) {
        fs.unlinkSync(localFilePath)
        console.log(err);
        return null;
    }
}

const deleteFromCloudinary = async (photoUrl: string) => {
    // Check if the photo URL contains 'https://res.cloudinary.com/'
    if (!photoUrl.includes('https://res.cloudinary.com/')) return true;
    try {
        // Delete the photo from Cloudinary
        await cloudinary.uploader.destroy(photoUrl, {
            resource_type: "auto"
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};



export { uploadOnCloudinary, deleteFromCloudinary };