<!-- shop-web/src/pages/CartPage.vue -->
<template>
  <div>
    <h3 class="mb-4">Your Cart</h3>

    <div v-if="cart.items.length === 0" class="alert alert-info">
      Your cart is empty.
      <a href="/" class="alert-link">Continue shopping</a>
    </div>

    <div v-else class="row">
      <div class="col-lg-8">
        <div class="list-group mb-3">
          <div
            v-for="i in cart.items"
            :key="i.product.slug"
            class="list-group-item d-flex align-items-center"
          >
            <img
              v-if="i.product.images?.[0]"
              :src="i.product.images[0]"
              alt=""
              style="width:64px;height:64px;object-fit:cover"
              class="rounded me-3"
            />
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <h6 class="mb-1">{{ i.product.title }}</h6>
                <strong>{{ (i.product.price * i.qty).toFixed(2) }} €</strong>
              </div>
              <div class="text-muted small">
                {{ i.product.category?.name }}
                <span v-if="i.product.subcategory">/ {{ i.product.subcategory?.name }}</span>
              </div>
              <div class="d-flex align-items-center mt-2">
                <div class="input-group" style="width: 140px;">
                  <button class="btn btn-outline-secondary" @click="cart.decrement(i.product.slug)">-</button>
                  <input
                    class="form-control text-center"
                    type="number"
                    min="1"
                    :value="i.qty"
                    @change="(e) => cart.setQty(i.product.slug, e.target.value)"
                  />
                  <button class="btn btn-outline-secondary" @click="cart.increment(i.product.slug)">+</button>
                </div>
                <button class="btn btn-link text-danger ms-3" @click="cart.remove(i.product.slug)">
                  <i class="bi bi-trash"></i> Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <button class="btn btn-outline-danger" @click="cart.clear()">Clear cart</button>
      </div>

      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h5>Summary</h5>
            <div class="d-flex justify-content-between">
              <span>Items ({{ cart.count }})</span>
              <strong>{{ cart.subtotal.toFixed(2) }} €</strong>
            </div>
            <!-- TVA si activée
            <div class="d-flex justify-content-between">
              <span>VAT (20%)</span>
              <strong>{{ cart.vat.toFixed(2) }} €</strong>
            </div>
            -->
            <hr />
            <div class="d-flex justify-content-between">
              <span>Total</span>
              <strong class="fs-5">{{ cart.total.toFixed(2) }} €</strong>
            </div>

            <form class="mt-3" @submit.prevent="checkout">
              <div class="mb-2">
                <label class="form-label">Email</label>
                <input v-model="email" type="email" required class="form-control" placeholder="you@example.com" />
              </div>
              <button class="btn btn-success w-100" :disabled="loading">
                <span v-if="!loading">Checkout</span>
                <span v-else class="spinner-border spinner-border-sm"></span>
              </button>
              <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
              <div v-if="orderId" class="alert alert-success mt-3">
                Order created: <strong>{{ orderId }}</strong>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCart } from "../stores/cart";
import api from "../services/api";

const cart = useCart();
const email = ref("");
const loading = ref(false);
const error = ref("");
const orderId = ref("");

async function checkout() {
  try {
    loading.value = true;
    error.value = "";
    orderId.value = "";

    const itemsPayload = cart.items.map((i) => ({
      productId: i.product._id,
      qty: i.qty,
    }));

    const res = await api.createOrder({
      items: itemsPayload,
      customer: { email: email.value },
    });

    orderId.value = res._id || res.id || "";
    cart.clear();
  } catch (e) {
    error.value = e?.response?.data?.error || e?.message || "Checkout failed";
  } finally {
    loading.value = false;
  }
}
</script>
