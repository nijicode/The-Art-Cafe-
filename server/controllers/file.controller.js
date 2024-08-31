import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase.config.js";

export const uploadImage = async (fileBuffer, imageName, mimeType) => {
  try {
    const storageRef = ref(storage, `images/${imageName}`);
    const metadata = {
      contentType: mimeType, // Set the MIME type
    };
    const snapshot = await uploadBytes(storageRef, fileBuffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(`${imageName} uploaded successfully`);
    return downloadURL;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export const uploadVideo = async (fileBuffer, videoName, mimeType) => {
  try {
    const storageRef = ref(storage, `videos/${videoName}`);
    const metadata = {
      contentType: mimeType, // Set the MIME type for the video
    };
    const snapshot = await uploadBytes(storageRef, fileBuffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(`${videoName} uploaded successfully`);
    return downloadURL;
  } catch (error) {
    throw new Error(`Video upload failed: ${error.message}`);
  }
};

export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    console.log(`${filePath} deleted successfully`);
  } catch (error) {
    throw new Error(`${filePath} deletion failed: ${error.message}`);
  }
};
