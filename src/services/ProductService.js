import ProductRepository from "../repositories/ProductRepository.js";

const productRepo = new ProductRepository();

export default class ProductService {
  async createProduct(data) {
    return await productRepo.create(data);
  }

  async getProducts() {
    return await productRepo.getAll();
  }

  async getProductById(id) {
    return await productRepo.getById(id);
  }

  async updateProduct(id, data) {
    return await productRepo.update(id, data);
  }

  async deleteProduct(id) {
    return await productRepo.delete(id);
  }
}
