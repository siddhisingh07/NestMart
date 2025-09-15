import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.config({
  cloud_name: 'der8ztlj1',
  api_key: '894754945522399',
  api_secret: 'czxVIy-_yTD5QMocsOXET-iJ8eU'
});

const uploadOnCloudinary = async(localFilePath)=>{
  try {
    if (!localFilePath) {
      console.log("no local path provided")
      return null
    }
    let res = await cloudinary.uploader.upload(localFilePath, {resource_type : "auto"})
    console.log("File is upladed", res);
    // console.log(res.url)
    return res
    
  } catch (error) {
    console.log(error)
    fs.unlinkSync(localFilePath)
    return null
  }
}

export {uploadOnCloudinary}