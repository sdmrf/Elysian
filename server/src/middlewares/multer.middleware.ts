//* Imports
import multer from 'multer';
import { v4 as uuid } from 'uuid';

//* Multer storage
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/uploads');
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