import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { DBConnection } from "./DataBase/mongoose.js";
import morgan from "morgan";
import userRouter from "./Routes/user.routes.js";
import categoryRouter from "./Routes/category.routes.js";
import productRouter from "./Routes/products.routes.js";
import staticRouter from "./Routes/static.routes.js";
import homeRouter from "./Routes/home.routes.js";
import ServiceRoutes from "./Routes/service.routes.js";
import aboutRouter from "./Routes/about.routes.js";
import orderRoutes from "./Routes/order.routes.js";
// Config
dotenv.config();

const app = express();
// const port = process.env.PORT || 3000;
const port = 5000;

// Handle Cors
const corsConnfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Access-Control-Allow-Origin",
  ],
  credentials: true, // Allow credentials
};

app.options("", cors(corsConnfig));
app.use(cors(corsConnfig));

// Middelwares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use( '/uploads', express.static('./uploads'))

// Test Route
app.get("/test", (req, res) => {
  res.send({ msg: "Hello Products Api" });
});

// Project Routes
app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/products", productRouter);
app.use("/staticData", staticRouter);
app.use("/homeData", homeRouter);
app.use("/services", ServiceRoutes); 
app.use("/about", aboutRouter);
app.use("/order", orderRoutes);

//Listen Application

DBConnection();
app.listen(port, () => {
  console.log(`Api Is Running On Port : ${port}`);
});


