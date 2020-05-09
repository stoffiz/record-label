<template>
  <div>
    <div class="bg-lightgrey">
      <div class="container">
        <div class="row py-5">
          <div class="col">
            <h4 class="display-4 text-center mb-4">SHOP</h4>
            <p
              class="lead"
            >Temporibus culpa nesciunt sint veritatis. Sapiente fugiat dicta eos? Porro quo odio corporis in, cupiditate quae. Nisi repellendus cum eos omnis nobis, sit eum cumque ipsam. Porro quo odio corporis in culpa nesciunt sint veritatis</p>
          </div>
        </div>
        <div class="col-12 mb-5 text-right">
          <div class="dropdown">
            <button class="btn btn-sm btn-outline-dark dropdown letter-spacing-sm text-uppercase" type="button" id="dropdownCart" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Cart <i class="fa fa-shopping-cart mx-1"></i><span v-if="quanityInCart > 0">{{quanityInCart}}</span>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownCart">
              <span v-if="quanityInCart == 0" class="dropdown-item letter-spacing-sm text-uppercase">Cart empty</span>
              <div v-for="(item, index) in cart" :key="item.id">
                <div class="dropdown-item letter-spacing-sm text-uppercase">
                  <div class="d-flex">
                    <span class="mb-0">{{item.artist}} - {{item.title}}</span>
                    <span class="ml-auto pl-2 r"><button v-on:click="deleteCartItem(index)" class="btn btn-sm btn-outline-dark"><i class="fas fa-trash-alt"></i></button></span>
                  </div>
                  <p class="text-small">Quantity: {{item.quantity}}</p>
                  <div class="dropdown-divider"></div>
                </div>
              </div>
              <span v-if="quanityInCart > 0" class="dropdown-item letter-spacing-sm text-uppercase">Total amount: €{{totalPriceCart}}</span>
              <div v-if="quanityInCart > 0">
                <button v-on:click="deleteCartAll(cart)" class="dropdown-item letter-spacing-sm">Clear cart</button>
                <span class="dropdown-item"><router-link to="/shop/checkout" class="btn btn btn-block btn-outline-dark letter-spacing-sm text-uppercase">Checkout</router-link></span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="releases.items" class="row d-flex pb-5">
          <div v-for="release in releases.items" :key="release.id" class="col-12 col-md-6 col-lg-4 mb-6 text-center">
            <img :src="release.frontCover" class="rounded-circle" height="200" />
            <p class="text-center mt-3 mb-0 pb-0 text-uppercase letter-spacing-md">#{{release.catalogNr}} {{release.artist}}</p>
            <p class="text-center mb-2 text-small font-italic letter-spacing-md">{{release.title}}</p>
            <p class="text-small text-gold mb-1">Limited to {{release.quantity}} copies</p>
            <p class="text-small">{{release.format}} | €{{release.price}}</p>
            <button v-on:click="addToCart(release)" class="btn btn-sm mr-2 btn-dark shadow-sm letter-spacing-md">Add to cart</button>
            <router-link :to="`/release/${release.id}`" class="btn btn-sm btn-outline-dark shadow-sm letter-spacing-md">Read more</router-link>
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-12 text-center">
            <router-link to="/" class="btn btn-sm btn-outline-dark">Home</router-link>
            <router-link to="/shop/checkout" class="btn btn-sm btn-outline-dark ml-2">Checkout</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from 'moment';

export default {
    name: "Shop",
  data: function() {
    return {
      currentRelease: []
    };
  },
  computed: {
    ...mapState({
      releases: state => state.release.all,
      cart: state => state.cart.all
    }),
    formatDate: function(date) {
      return date.moment().format("YYYY-MM-DD")
    },
    quanityInCart: function() {
      let total = 0;
      this.cart.forEach(item => total += item.quantity)
      return total
    },
    totalPriceCart: function() {
      let totalPrice = 0;
      this.cart.forEach(item => totalPrice += +item.price * item.quantity)
      return totalPrice
    }
  },
  methods: {
    ...mapActions("release", ["getAll"]),
    ...mapActions("cart", ["add", "delete", "deleteAll"]),
    addToCart: function(release) {
      let item = {
        id: release.id,
        artist: release.artist,
        title: release.title,
        price: release.price,
        quantity: 1
      }
      this.add(item)
    },
    deleteCartItem: function(index) {
      this.delete(index);
    },
    deleteCartAll: function(cart) {
      this.deleteAll(cart);
    }
  },
  beforeMount: function() {
    this.getAll();
  }
};
</script>

<style scoped>
.mb-6 {
  margin-bottom: 5rem;
}

.fa-stack[data-count]:after{
  position:absolute;
  right:0%;
  top:0%;
  content: attr(data-count);
  font-size:40%;
  padding:.6em;
  border-radius:50%;
  line-height:.75em;
  color:#FFF;
  text-align:center;
  min-width:2em;
  font-weight:400;
  background: #999900;
  border-style:none;
}
</style>