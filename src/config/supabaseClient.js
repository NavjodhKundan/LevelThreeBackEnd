import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/*
Day-3, 3.2
This file creates a connection with our database at supabase.
At line one it imports a library from supabase to create a connection.
At line two it imports environmental variables from ".env" file.
On line four and five it stores information about the database like link and a key that will be required to find our database and secure a connection with it.
On line seven it exports the supabase do when a file imports it, it will call supabase class and connect with database.
*/
