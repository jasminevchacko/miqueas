import mongoDB from '../index';
import Item from "../../models/Item";

//This demonstrates how we add our mongoose cocnnection to a function
//We just await the function we created to connect to the database
//Later we can import this function to pages/api/ to use it in a route
export default async function searchFunction(textInput) {
    await mongoDB();

    console.log(textInput);
    //Item.index({'$**': 'text'});
    /*return Item.find({$text: {$search: textInput}})
        .skip(20)
        .limit(10)
        .then(docs) => {
            console.log(err, docs);
            if (err) {
                return Promise.reject(new Error("An error occurred."));
            }
            if (docs) {
                return Promise.resolve(docs);
            }
            return Promise.reject(new Error("Nothing found."));
        });*/
    return Item
        .find({$text: {$search: textInput}})
        .limit(10);
    //This tells us how many example documents are in our database
}


