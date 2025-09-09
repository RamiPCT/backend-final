import Product from "../models/Product.js";

export default class ProductRepository {
  async create(productData) {
    return await Product.create(productData);
  }

  async getAll() {
    return await Product.find();
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}
