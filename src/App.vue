<template>
  <div id="app">
    <Navigation />
    <Showcase v-bind:activeRoute="currentRoute" />
    <div>
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Showcase from "@/components/Showcase.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navigation,
    Showcase,
    Footer
  },
  data: function() {
    return {
      test: "Hello Christoffer Åström. Welcome to the website",
      testing: "",
      route: this.$route.name
    };
  },
  computed: {
    currentUser: function() {
      return (this.testing = window.Date());
    },
    currentRoute: function() {
      return this.$route.name
    }
  }
};
</script>

<style>
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

@media (min-width: 992px) {
  .container-fluid {
    width: 85%;
  }
}
</style>
