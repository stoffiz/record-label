<template>
  <div>
    <div class="bg-lightgrey">
      <div v-if="!orderConfirmed" class="container">
        <div class="row py-5">
          <div class="col">
            <h4 class="display-4 text-center">Checkout</h4>
            <p
              class="lead"
            >Temporibus culpa nesciunt sint veritatis. Sapiente fugiat dicta eos? Porro quo odio corporis in, cupiditate quae. Nisi repellendus cum eos omnis nobis, sit eum cumque ipsam. Porro quo odio corporis in culpa nesciunt sint veritatis</p>
          </div>
        </div>
        <h3 class="text-uppercase text-gold letter-spacing-md font-weight-custom">Your cart</h3>
        <div class="card mb-5">
          <div class="card-body py-4">
            <span v-if="!quanityInCart > 0" class="letter-spacing-sm text-uppercase">Cart empty ヾ｜￣ー￣｜ﾉ</span>
            <div v-for="(item, index) in cart" :key="item.id">
              <div class="letter-spacing-sm text-uppercase">
                <div class="d-flex">
                  <span class="mb-0">{{item.artist}} - {{item.title}}</span>
                  <span class="ml-auto pl-2 r">
                    <button v-on:click="deleteCartItem(index)" class="btn btn-sm btn-outline-dark">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </span>
                </div>
                <p class="text-small mb-0">Quantity: {{item.quantity}}</p>
                <p class="text-small">Price: €{{item.price}} | Total: €{{item.price * item.quantity}}</p>
                <hr />
              </div>
            </div>
            <span v-if="quanityInCart > 0" class="letter-spacing-sm text-uppercase">Total amount: €{{totalPriceCart}}</span>
          </div>
        </div>
        <h3 class="text-uppercase text-gold letter-spacing-md font-weight-custom">Address & payment</h3>
        <div class="card mb-5">
          <div class="card-body py-4">
            <form v-on:submit.prevent="placeOrder" class="">
              <div class="form-row">
                <div class="form-group col-12 col-md-6">
                  <label for="name">Name</label>
                  <input id="name" class="form-control" :class="{ 'is-invalid': $v.user.name.$error }" v-model.trim="$v.user.name.$model">
                  <div class="invalid-feedback" v-if="!$v.user.name.required">Field is required</div>
                  <div class="invalid-feedback" v-if="!$v.user.name.minLength">Name must have at least {{$v.user.name.$params.minLength.min}} letters</div>
                </div>
                <div class="form-group col-12 col-md-6">
                  <label for="email">Email</label>
                  <input id="email" :class="{ 'is-invalid': $v.user.email.$error }" v-model.trim="$v.user.email.$model" type="text" class="form-control">
                  <div class="invalid-feedback" v-if="!$v.user.email.required">Field is required</div>
                  <div class="invalid-feedback" v-if="!$v.user.email.email">Please enter a valid email address</div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-12 col-md-6">
                  <label for="addressLine">Address Line</label>
                  <input id="addressLine" class="form-control" :class="{ 'is-invalid': $v.user.addressLine.$error }" v-model.trim="$v.user.addressLine.$model">
                  <div class="invalid-feedback" v-if="!$v.user.addressLine.required">Field is required</div>
                </div>
                <div class="form-group col-12 col-md-6">
                  <label for="zipCode">Zip Code</label>
                  <input id="zipCode" :class="{ 'is-invalid': $v.user.zipCode.$error }" v-model.trim="$v.user.zipCode.$model" type="text" class="form-control">
                  <div class="invalid-feedback" v-if="!$v.user.zipCode.required">Field is required</div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-12 col-md-6">
                  <label for="country">Country</label>
                  <input id="country" class="form-control" :class="{ 'is-invalid': $v.user.country.$error }" v-model.trim="$v.user.country.$model">
                  <div class="invalid-feedback" v-if="!$v.user.country.required">Field is required</div>
                </div>
                <div class="form-group col-12 col-md-6">
                  <label for="phoneNumber">Phone number</label>
                  <input id="phoneNumber" :class="{ 'is-invalid': $v.user.phoneNumber.$error }" v-model.trim="$v.user.phoneNumber.$model" type="text" class="form-control">
                  <div class="invalid-feedback" v-if="!$v.user.phoneNumber.required">Field is required</div>
                  <div class="invalid-feedback" v-if="!$v.user.phoneNumber.numeric">Please enter a phone number with only numerics</div>
                </div>
              </div>
              <div class="mt-3">
                <router-link to="/shop" class="btn btn-sm btn-outline-dark">Cancel</router-link>
                <button class="btn btn-sm btn-outline-dark ml-2">Place Order</button>
              </div>
            </form>
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-12 text-center">
            <router-link to="/" class="btn btn-sm btn-outline-dark">Back to start page</router-link>
          </div>
        </div>
      </div>
      <!-- Order Confirmed -->
      <div v-if="orderConfirmed" class="container" style="height: 50vh;">
        <div class="row pt-5 h-100">
          <div class="col-12 text-center">       
            <h1 class="display-4">Thank you {{user.name}} for your order!</h1>
            <p class="lead">Your order number is: <span class="lead text-gold">{{confirmationNumber}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required, minLength, email, numeric } from 'vuelidate/lib/validators'
import moment from "moment";

export default {
  name: "Checkout",
  data: function() {
    return {
      orderConfirmed: false,
      confirmationNumber: "",
      user: {
        name: "",
        email: "",
        addressLine: "",
        zipCode: "",
        country: "",
        phoneNumber: ""
      }
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart.all
    }),
    formatDate: function(date) {
      return date.moment().format("YYYY-MM-DD");
    },
    quanityInCart: function() {
      let total = 0;
      this.cart.forEach(item => (total += item.quantity));
      return total;
    },
    totalPriceCart: function() {
      let totalPrice = 0;
      this.cart.forEach(item => totalPrice += +item.price * item.quantity)
      return totalPrice
    }
  },
  methods: {
    ...mapActions("cart", ["add", "delete", "deleteAll"]),
    addToCart: function(release) {
      let item = {
        id: release.id,
        artist: release.artist,
        title: release.title,
        quantity: 1
      };
      this.add(item);
    },
    deleteCartItem: function(index) {
      this.delete(index);
    },
    deleteCartAll: function(cart) {
      this.deleteAll(cart);
    },
    placeOrder: function() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      } 
      else {
        this.confirmationNumber = this.orderNumber();
        this.orderConfirmed = true;
        this.deleteAll(this.cart);
      }
    },
    orderNumber: function() {
      return Math.floor(Math.random() * 10000);
    }
  },
  validations: {
    user: {
        name: { required, minLength: minLength(4) },
        email: { required, email },
        addressLine: { required },
        zipCode: { required },
        country: { required },
        phoneNumber: { required, numeric }
    }
  }
};
</script>

<style scoped>
.mb-6 {
  margin-bottom: 5rem;
}

.fa-stack[data-count]:after {
  position: absolute;
  right: 0%;
  top: 0%;
  content: attr(data-count);
  font-size: 40%;
  padding: 0.6em;
  border-radius: 50%;
  line-height: 0.75em;
  color: #fff;
  text-align: center;
  min-width: 2em;
  font-weight: 400;
  background: #999900;
  border-style: none;
}
</style>