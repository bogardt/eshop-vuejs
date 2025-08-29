import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000
});

export default {
  getCategories() {
    return api.get("/categories").then(r => r.data);
  },
  getSubcategories(categoryId) {
    return api.get("/subcategories", { params: { category: categoryId } }).then(r => r.data);
  },
  listProducts(params) {
    return api.get("/products", { params }).then(r => r.data);
  },
  getProduct(slug) {
    return api.get(`/products/${slug}`).then(r => r.data);
  }
};
