import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUDNAME, CLOUDINARY_API_KEY, CLOUDINART_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUDNAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINART_API_SECRET,
});

export default cloudinary;
