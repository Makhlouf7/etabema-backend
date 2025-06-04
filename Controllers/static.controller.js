import StaticData from "../Models/Static.model.js";
import ApiError from "../Utils/ApiError.js";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createStatic = async (req, res, next) => {
  let data = req.body;

  if (!req.files) {
    return next(new ApiError("No files uploaded", 400));
  }

  try {
    if (req.files) {
      // Logo
      if (req.files["logoURL"]) {
        data.logoURL = `/uploads/${req.files["logoURL"][0].filename}`;
      } else {
        return next(new ApiError("logoURL is required", 400));
      }

      // Home Hero
      if (req.files["homeHeroURL"]) {
        data.homeHeroURL = `/uploads/${req.files["homeHeroURL"][0].filename}`;
      } else {
        return next(new ApiError("homeHeroURL is required", 400));
      }

      // Services Hero
      if (req.files["servicesHeroURL"]) {
        data.servicesHeroURL = `/uploads/${req.files["servicesHeroURL"][0].filename}`;
      } else {
        return next(new ApiError("servicesHeroURL is required", 400));
      }

      // Categories Hero
      if (req.files["categoriesHeroURL"]) {
        data.categoriesHeroURL = `/uploads/${req.files["categoriesHeroURL"][0].filename}`;
      } else {
        return next(new ApiError("categoriesHeroURL is required", 400));
      }

      // About Hero
      if (req.files["aboutHeroURL"]) {
        data.aboutHeroURL = `/uploads/${req.files["aboutHeroURL"][0].filename}`;
      } else {
        return next(new ApiError("aboutHeroURL is required", 400));
      }
    }

    // Ensure createdAt is set
    data.createdAt = new Date().toISOString();

    // Create new data object and save to DB
    let newData = new StaticData(data);
    await newData.save();

    res.status(201).json({ status: "Success", data: newData });
  } catch (error) {
    return next(
      new ApiError(`Error From Create Static: ${error.message}`, 500)
    );
  }
};

const getAllStatic = async (req, res, next) => {
  try {
    let allData = await StaticData.find();
    if (!allData)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Static Founded` });

    res.status(200).json({ status: "Success", data: allData });
  } catch (error) {
    next(new ApiError(`Error From Get All Static Data`, 500));
  }
};

const getElementById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let data = await StaticData.findById(id);
    if (!data)
      return res
        .status(404)
        .json({ status: "Fail", data: `No Data With This ${id} ID` });

    res.status(200).json({ status: "Success", data: data });
  } catch (error) {
    next(new ApiError(`Error From Get By ID In Static`), 500);
  }
};

const updateElement = async (req, res, next) => {
  let newData = req.body;
  let { id } = req.params;

  try {
    // استرجاع البيانات القديمة من قاعدة البيانات
    let oldData = await StaticData.findById(id);
    if (!oldData) {
      return res
        .status(404)
        .json({ status: "Fail", message: `لا توجد بيانات بهذا الـ ID: ${id}` });
    }

    // دالة لحذف الملفات القديمة
    const deleteOldFiles = (oldFiles) => {
      if (!oldFiles || !Array.isArray(oldFiles)) return; // إذا كانت الملفات القديمة غير موجودة أو ليست مصفوفة

      oldFiles.forEach((filePath) => {
        // تصحيح المسار ليشمل "uploads/"
        const fullPath = path.join(
          process.cwd(),
          "uploads",
          path.basename(filePath)
        );
        console.log(`جارٍ محاولة حذف: ${fullPath}`);

        if (fs.existsSync(fullPath)) {
          try {
            fs.unlinkSync(fullPath); // حذف الملف
            console.log(`✅ تم الحذف: ${fullPath}`);
          } catch (err) {
            console.error(`❌ خطأ في حذف الملف: ${fullPath}`, err);
          }
        } else {
          console.warn(`⚠️ الملف غير موجود: ${fullPath}`);
        }
      });
    };

    // حذف الملفات القديمة إذا تم رفع ملفات جديدة
    if (req.files?.logoURL) deleteOldFiles([oldData.logoURL]); // حذف ملف الـ logoURL القديم
    if (req.files?.homeHeroURL) deleteOldFiles([oldData.homeHeroURL]); // حذف ملف الـ homeHeroURL القديم
    if (req.files?.servicesHeroURL) deleteOldFiles([oldData.servicesHeroURL]); // حذف ملف الـ servicesHeroURL القديم
    if (req.files?.categoriesHeroURL)
      deleteOldFiles([oldData.categoriesHeroURL]); // حذف ملف الـ categoriesHeroURL القديم
    if (req.files?.aboutHeroURL) deleteOldFiles([oldData.aboutHeroURL]); // حذف ملف الـ aboutHeroURL القديم
    if (req.files?.postsHeroURL) deleteOldFiles([oldData.postsHeroURL]); // حذف ملف الـ aboutHeroURL القديم

    // تحديث البيانات الجديدة مع الاحتفاظ بالقديمة إذا لم يتم رفع صور جديدة
    let updatedData = {
      ...newData,
      logoURL: req.files?.logoURL
        ? `uploads/${req.files.logoURL[0].filename}`
        : oldData.logoURL,
      homeHeroURL: req.files?.homeHeroURL
        ? `uploads/${req.files.homeHeroURL[0].filename}`
        : oldData.homeHeroURL,
      servicesHeroURL: req.files?.servicesHeroURL
        ? `uploads/${req.files.servicesHeroURL[0].filename}`
        : oldData.servicesHeroURL,
      categoriesHeroURL: req.files?.categoriesHeroURL
        ? `uploads/${req.files.categoriesHeroURL[0].filename}`
        : oldData.categoriesHeroURL,
      aboutHeroURL: req.files?.aboutHeroURL
        ? `uploads/${req.files.aboutHeroURL[0].filename}`
        : oldData.aboutHeroURL,
      postsHeroURL: req.files?.postsHeroURL
        ? `uploads/${req.files.postsHeroURL[0].filename}`
        : oldData.postsHeroURL,
    };

    // تحديث البيانات في قاعدة البيانات
    let data = await StaticData.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: false,
    });

    // إرسال الاستجابة بنجاح
    res.status(200).json({ status: "Success", data });
  } catch (error) {
    console.error("Error in update:", error);
    next(new ApiError(`خطأ في التحديث: ${error.message}`, 500));
  }
};

export { createStatic, getAllStatic, getElementById, updateElement };
