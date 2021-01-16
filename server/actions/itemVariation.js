import mongoDB from '../index';
import ItemVariation from '../../models/ItemVariation';

export async function getItemVariation() {
  await mongoDB();

  return ItemVariation
    .find()
    .sort({ submitted: -1 });
}

export async function addItemVariation(item) {
  await mongoDB();
  return ItemVariation.create(item)
}

export async function updateItemVariation(item) {
  await mongoDB();

  console.log(item.name);
  const condition = { "name": item.name };
  const updates = {"$set": {"gender" : item.gender, "size" : item.size, "typeColor" : item.typeColor}} 
  return ItemVariation.updateOne(condition, updates);
}


export async function getCategories() {
  await mongoDB();

  return ItemVariation.find().sort({ submitted: -1 });
}

// export async function getItem(id) {
//   await mongoDB();

//   return Application.findOne({ id });
// }