const { readData, delayReadData, writeData } = require("../database/db");

async function getAllProducts() {
  let products = await delayReadData();
  return products;
}

async function getProductById(id) {
  let products = await readData();
  let data = products.find((item) => item.id === id);
  return data;
}

async function createProduct(newProduct) {
  let products = await readData();
  newProduct.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  products.push(newProduct);
  await writeData(products);
  return newProduct;
}

async function updateProduct(id, updatedFields) {
  let products = await readData();
  let index = products.findIndex((item) => item.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updatedFields };
  await writeData(products);
  return products[index];
}

async function deleteProduct(id) {
  let products = await readData();
  let index = products.findIndex((item) => item.id === id);
  if (index === -1) return null;
  let deleted = products.splice(index, 1);
  await writeData(products);
  return deleted[0];
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
