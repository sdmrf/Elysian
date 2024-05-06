//* Imports
import multer from 'multer';
import { v4 as uuid } from 'uuid';

//* Helper functions
const routeToFolder = {
    'api/v1/users': './public/users',
    'api/v2/products': './public/products',
}

const getDestinationFolder = (url: string) => {
    for (const route in routeToFolder) {
        if (url.includes(route)) {
            return routeToFolder[route as keyof typeof routeToFolder];
        }
    }
    return './public/uploads';
};

//* Multer storage
const storage = multer.diskStorage({
    destination(req, file, callback) {
        const destinationFolder = getDestinationFolder(req.originalUrl);
        callback(null, destinationFolder);
    },
    filename(req, file, callback) {
        const id = uuid();
        const extName = file.originalname.split('.').pop();
        callback(null, `${id}.${extName}`);
    },
});

//* Multer exports for single and multiple file uploads
export const singleUpload = multer({ storage }).single('photo');
export const multipleUpload = multer({ storage }).array('photos', 10);