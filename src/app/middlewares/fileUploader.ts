import multer from "multer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import path from "path";
import config from "../config";
import fs from "fs";
import { IUploadedFile } from "../interfaces/file";

cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY.CLOUDINARY_API_SECRET,
});

export const sendImageToCloudinary = async (
  file: IUploadedFile
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadResult = cloudinary.uploader.upload(
      file.path,
      {
        public_id: file.originalname,
      },
      (error, result) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
