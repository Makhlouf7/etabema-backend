import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import catchAsync from "./catchAsync.js";

const resizeImage = (options) =>
  catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    const { width, height, quality } = options;

    // Check the size of the uploaded file
    const fileStats = await fs.stat(req.file.path); // Non-blocking
    const fileSizeInBytes = fileStats.size;

    // If the file size is less than 1 MB, skip processing
    if (fileSizeInBytes < 1 * 1024 * 1024) {
      return next();
    }

    const newFilePath = path.join(
      path.dirname(req.file.path),
      `${path.parse(req.file.filename).name}.jpeg`
    );

    // Process the image: resize, compress, and convert to JPEG
    await sharp(req.file.path)
      .resize(width, height)
      .jpeg({ quality })
      .toFile(newFilePath);

    // Remove the original file
    await fs.unlink(req.file.path); // Non-blocking

    // Update req.file to reflect the new file
    req.file.path = newFilePath;
    req.file.filename = path.basename(newFilePath);

    next();
  });

export default resizeImage;
