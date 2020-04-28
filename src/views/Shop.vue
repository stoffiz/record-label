<template>
  <div>
    <div class="bg-lightgrey">
      <div class="container">
        <div class="row py-5">
          <div class="col">
            <h4 class="display-4 text-center">New Releases</h4>
            <p
              class="lead"
            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta odio laudantium impedit aliquam incidunt quod ex accusantium nisi ea non aspernatur magnam libero atque, temporibus culpa nesciunt sint veritatis. Sapiente fugiat dicta eos? Porro quo odio corporis in, cupiditate quae. Nisi repellendus cum eos omnis nobis, sit eum cumque ipsam.</p>
          </div>
        </div>
        <div class="col-12">
          <div id="ex2">
            <span class="fa-stack fa-2x has-badge" data-count="2">
              <i class="fa fa-shopping-cart text-gold fa-stack-1x"></i>
            </span>
          </div>
        </div>
        <div v-if="releases.items" class="row d-flex pb-5">
          <div v-for="release in releases.items" :key="release.id" class="col-12 col-md-6 col-lg-4 mb-6 text-center">
            <img :src="release.frontCover" class="rounded-circle" height="200" />
            <p class="text-center mt-3 mb-0 pb-0 text-uppercase letter-spacing-md">#{{release.catalogNr}} {{release.artist}}</p>
            <p class="text-center mb-2 text-small text-uppercase font-italic letter-spacing-md">{{release.title}}</p>
            <p class="text-small text-gold">Limited to {{release.quantity}} copies</p>
            <button v-on:click="addToCart(release)" class="btn btn-sm mr-2 btn-dark shadow-sm letter-spacing-md">Add to cart</button>
            <router-link :to="`/release/${release.id}`" class="btn btn-sm btn-outline-dark shadow-sm letter-spacing-md">Read more</router-link>
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-12 text-center">
            <router-link to="" class="btn btn-sm btn-outline-dark">Go to cart <i class="fa fa-shopping-cart mx-1"></i><span v-if="quanityInCart > 0" class="badge badge-dark">{{quanityInCart}}</span></router-link>
            <router-link to="" class="btn btn-sm btn-outline-dark ml-2">Checkout</router-link>
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
      releases: state => state.releases.all,
      alert: state => state.alert,
      cart: state => state.cart.cart
    }),
    formatDate: function(date) {
      return date.moment().format("YYYY-MM-DD")
    },
    quanityInCart: function() {
      let total = 0;
      this.cart.forEach(item => total += item.quantity)
      return total
    }
  },
  methods: {
    ...mapActions("releases", ["getAll"]),
    ...mapActions("cart", ["add"]),
    addToCart: function(release) {
      let item = {
        id: release.id,
        artist: release.artist,
        title: release.title,
        quantity: 1
      }
      this.add(item)
    },
    amount: function(item) {
      return item.quantity;
    },
    sum: function(prev, next) {
      prev + next
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