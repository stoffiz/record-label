<template>
  <div id="app">
    <Navigation />
    <Showcase />
    <div>
      <div v-if="alert.message" :class="`text-center alert mb-0 ${alert.type}`">{{alert.message}}</div>
      <router-view :key="this.$route.fullPath" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Showcase from "@/components/Showcase.vue";
import Footer from "@/components/Footer.vue";
import router from "./router";

import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Navigation,
    Showcase,
    Footer
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear'
    })
  },
  watch: {
    $route(to, from) {
      this.clearAlert();
    }
  }
};
</script>

<style>
p {
  letter-spacing: 0rem;
}

h1, h4 {
  text-transform: uppercase;;
}

.custom-container {
  width: 80%;
  margin: auto;
}

.text-gold {
  color: #999900;
}

.text-small {
  font-size: 0.8rem;
}

.bg-black {
  background: #1c1c1c;
}

.text-white {
  color: #fcf9f9 !important;
}

.nav-link {
  transition: ease-in-out 0.2s;
}

.bg-gold {
  background: #999900;
}

.btn {
  transition: ease-in-out 0.2s;
}

.font-weight-custom {
  font-weight: 100;
}

.letter-spacing-lg {
  letter-spacing: 0.5rem;
}

.letter-spacing-md {
  letter-spacing: 0.2rem;
}

.letter-spacing-sm {
  letter-spacing: 0.08rem;
}

.bg-lightgrey {
  background: #e5e5e5;
}

.bg-custom-white {
  background: #fcf9f9;
}

.btn {
  text-transform: uppercase;
  letter-spacing: 0.2rem;
}

.form-group, .form-check {
    text-transform: uppercase;
    letter-spacing: 0.2rem;
}

/* SPINNER */
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* MEDIA Q */
@media (min-width: 992px) {
  .container-fluid {
    width: 85%;
  }
}
</style>
