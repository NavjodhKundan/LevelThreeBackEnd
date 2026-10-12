import { response } from "express";
import { supabase } from "../config/supabaseClient";
import {string, z} from "zod";

const idSchema = z.number().positive();

//Day 2
//2.2

//function to get all products from database
export const getProducts = async (request, response) => {
    try {
        const {data, error} = await supabase.from('products').select();
        if(error){
            return next(error);
        }
        return response.status(201).send(data);
    } catch (error){
        next(error)
    }
}

//function to get a product by id
export const getProductById = async (request, response, next) => {
    try{
        const {id} = request.params;
        idSchema.parse(id);
        const {data, error} = await supabase.from('products').select().eq('id',id);
        if(data === null || data.length === 0 || error){
            return next(error);
        }
        return response.status(201).send(data);
    } catch (error){
        if(error instanceof z.ZodError){
            error.issues;
        }
        next(error);
    }
}

//inserting a data into database
const product = {
    name: "water-proof shoes",
    price: 200,
    stock: 10,
    description: "confertable water proof shoes, best for hiking!",
}
export const addNewProduct = async (request, response) => {
    const result = productSchema.safeParse(product);
    if(!result.success){
        return result.error;
    }
    const {data, error} = await supabase.from('products').insert({
        name: product.name, 
        price: product.price, 
        stock: product.stock, 
        description: product.description
    }).select();

    if(error){
        return response.status(500).send({msg: error});
    }
    return response.status(200).send(data);
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
        return response.status(404).send({msg: "no product found..."});
    }

    return response.status(200).send(data);
}

//deleting a row using product id
//if not found returing error message
export const deleteProductById = async (request, response) => {
    const {id} = request.params;
    const {data, error} = await supabase.from("products").delete().eq("id", id).select();

    if(error){
        return response.status(404).send("no such product found");
    }
    if(data === null || data.length === 0){
        return response.status(404).send({msg: "no such product found"});
    }
    return response.status(204).send({msg: "Product successfully deleted!"});
}

//Day 5
//5.1
//function to filter product price by price.
export const filterByPrice = async(request, response, next) => {
    try{
        const {minPrice, maxPrice} = request.query;
        if(minPrice !== undefined && maxPrice !== undefined){
            const {data, error} = await supabase.from("products").select().gte("price", minPrice).lte("price", maxPrice);
        } else if (minPrice !== undefined) {
            const {data, error} = await supabase.from("products").select().gte("price", minPrice);
        } else if (maxPrice !== undefined) {
            const {data, error} = await supabase.from("products").select().lte("price", maxPrice);
        } else {
            const {data, error} = await supabase.from("products").select();
        }

        return response.status(200).send(data);
    } catch(error) {
        next(error);
    }
}

//function that sortes product list by price in accending or deccending order.
export const sortByPrice = async(request, response, next) => {
    try{
        const {sort} = request.query;
        if(sort === "acc"){
            const {data, error} = await supabase.from("products").select().order("price", {accending: true});
        } else if(sort === "dec"){
            const {data, error} = await supabase.from("products").select().order("price", {accending: false});
        } else {
            const {data, error} = await supabase.from("products").select();
        }
        return response.status(200).send(data);
    } catch(error) {
        next(error);
    }
}