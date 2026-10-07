import { Router } from "express";
import { getProducts, getProductById, addNewProduct, updateProductById, deleteProductById } from "../controllers/products.controller";

const router = Router();

// day 2
// 2.2

//getting all products from database
router.get("/products", getProducts);

//getting a specific record from database
router.get("/products/:id", getProductById);

//inserting a new data/row into database
router.post("/addProduct", addNewProduct);

//updating a specific row/product and returing the updated product or else returning 404.
router.put("/products/:id", updateProductById);

//deleting a row and returning a success message or 404 if not found
router.delete("/products/:id", deleteProductById);

export default router;