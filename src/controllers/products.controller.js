import { request, response } from "express";
import { supabase } from "../config/supabaseClient";

//Day 2
//2.2

//function to get all products from database
export const getProducts = async (request, response) => {
    const {data, error} = await supabase.from('products').select();
    return response.send(data);
}

//function to get a product by id
export const getProductById = async (request, response) => {
    const {id} = request.params;
    const {data, error} = await supabase.from('products').select().eq('id',id);
    if(data === null || data.length === 0){
        return response.status(400).send({msg: "404 not found"});
    }
    return response.send(data);
}

//inserting a data into database
const product = {
    name: "water-proof shoes",
    price: 200,
    stock: 10,
    description: "confertable water proof shoes, best for hiking!",
}
export const addNewProduct = async (request, response) => {
    const {data, error} = await supabase.from('products').insert({
        name: product.name, 
        price: product.price, 
        stock: product.stock, 
        description: product.description
    }).select();

    if(error){
        return response.status(500).send({msg: error});
    }
    return response.send(data);
}

//updating a specific row/product using product id
//and returing the updated product or else returning 404.
export const updateProductById = async(request, response) => {
    const {id} = request.params;
    const {data, error} = await supabase.from('products').update({name: "SuperWarm shoes"})
    .eq("id", id).select();

    if(error){
        return response.status(500).send(error);
    }else if(data === null || data.length === 0){
        return response.status(400).send({msg: "404 no product found..."});
    }

    return response.send(data);
}

//deleting a row using product id
//if not found returing error message
export const deleteProductById = async (request, response) => {
    const {id} = request.params;
    const {data, error} = await supabase.from("products").delete().eq("id", id).select();

    if(error){
        return response.send("404 no such product found");
    }
    if(data === null || data.length === 0){
        return response.status(500).send({msg: "404 no such product found"});
    }
    return response.status(200).send({msg: "Product successfully deleted!"});
}