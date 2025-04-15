import AboutUs from "../Models/Aboutus.model.js";
import Category from "../Models/Category.model.js";
import Product from "../Models/Products.model.js";
import Home from "../Models/Home.model.js";
import Service from "../Models/Services.model.js";
import Post from "../Models/blog.model.js";

const modelMap = {
  About: AboutUs,
  Home: Home,
  Categories: Category,
  Products: Product,
  Services: Service,
  Posts: Post,
};

export default modelMap;
