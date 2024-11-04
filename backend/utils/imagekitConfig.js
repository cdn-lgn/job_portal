// Upload Response Function
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config({});

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadResponse = async (fileBuffer, fileName) => {
  try {
    const result = await imagekit.upload({
      file: fileBuffer, // Use the file buffer
      fileName: fileName,
    });
    return { fileName: result.name, fileUrl: result.url };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
