import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import catchAsync from "./catchAsync.js";

const resizeImageForFields = (fields) =>
  catchAsync(async (req, res, next) => {
    if (!req.files) return next();

    for (const { field, width, height, quality } of fields) {
      if (req.files[field] && req.files[field][0]) {
        const file = req.files[field][0];

        // Generate the new file path
        const newFilePath = path.join(
          path.dirname(file.path),
          `${path.parse(file.filename).name}.jpeg`
        );

        // Process the image: resize, compress, and convert to JPEG
        await sharp(file.path)
          .resize(width, height)
          .jpeg({ quality })
          .toFile(newFilePath);

        // Remove the original file
        await fs.unlink(file.path);

        // Update the file object to reflect the new file
        file.path = newFilePath;
        file.filename = path.basename(newFilePath);
      }
    }

    next();
  });

export default resizeImageForFields;
