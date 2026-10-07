import express from "express";
import router from "./routes/products.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());

//routes
app.use("/", router);

app.listen(PORT, () => console.log("Server running on port: 3001"));

// // day 2
// // 2.1

// //getting all products from database
// app.get("/products", async (request, response) => {
//     const {data, error} = await supabase.from('products').select();
//     return response.send(data);
// })

// //getting a specific record from database
// app.get("/products/:id", async (request, response) => {
//     const {id} = request.params;
//     const {data, error} = await supabase.from('products').select().eq('id',id);
//     if(data === null || data.length === 0){
//         return response.status(400).send({msg: "404 not found"});
//     }
//     return response.send(data);
// })

// //inserting a new data/row into database
// const product = {
//     name: "water-proof shoes",
//     price: 200,
//     stock: 10,
//     description: "confertable water proof shoes, best for hiking!",
// }
// app.post("/addProduct", async (request, response) => {
//     const {data, error} = await supabase.from('products').insert({
//         name: product.name, 
//         price: product.price, 
//         stock: product.stock, 
//         description: product.description
//     }).select();

//     if(error){
//         console.log(error);
//         return response.status(500).send({msg: error});
//     }
//     console.log(data);
//     return response.send(data);
// })

// //updating a specific row/product and returing the updated product or else returning 404.
// app.put("/products/:id", async (request, response)=>{
//     const {id} = request.params;
//     const {data, error} = await supabase.from('products').update({name: "SuperWarm shoes"})
//     .eq("id", id).select();

//     if(error){
//         console.log(error);
//         return response.status(500).send(error);
//     }

//     if(data === null || data.length === 0){
//         return response.status(400).send({msg: "404 no product found..."});
//     }

//     return response.send(data);
// })

// //deleting a row and returning a success message or 404 if not found
// app.delete("/products/:id", async (request, response) => {
//     const {id} = request.params;
//     const {data, error} = await supabase.from("products").delete().eq("id", id).select();

//     if(error){
//         console.log(error);
//         return response.send("404 no such product found");
//     }
//     if(data === null || data.length === 0){
//         return response.status(500).send({msg: "404 no such product found"});
//     }
//     return response.status(200).send({msg: "Product successfully deleted!"});
// })