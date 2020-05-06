<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between text-uppercase" id="navbarSupportedContent">
        <span class="nav-item">
          <router-link to="/" class="nav-link px-0">Home</router-link>
        </span>
        <span class="nav-item d-none d-lg-block">|</span>
        <span class="nav-item">
          <router-link to="/news" class="nav-link px-0">News</router-link>
        </span>
        <span class="nav-item d-none d-lg-block">|</span>
        <span class="nav-item dropdown">
          <a class="nav-link dropdown-toggle px-0" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Releases
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div v-for="release in releases.items" :key="release.id">
            <router-link :to="`/release/${release.id}`" class="dropdown-item">#{{release.catalogNr}} | {{release.artist}}</router-link>
            </div>
            <div class="dropdown-divider"></div>
            <router-link to="/releases" class="dropdown-item" >All Releases</router-link>
          </div>
        </span>
        <span class="nav-item d-none d-lg-block">|</span>
        <span class="nav-item">
          <router-link to="/shop" class="nav-link px-0">Shop</router-link>
        </span>
        <span class="nav-item d-none d-lg-block">|</span>
        <span class="nav-item">
          <router-link to="/contact" class="nav-link px-0">Contact</router-link>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: 'Navigation',
  data: function () {
    return {
      path: '',
      username: 'Stoffe'
    }
  },
    computed: {
    ...mapState({
      releases: state => state.release.nav,
    })
  },
  methods: {
    ...mapActions("release", ["getAll", "getById"]),
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    },
  },
  beforeMount: function() {
    this.getAll();
    
  },
  watch: {
    $route(to, from) {
      this.getAll();
    }
  }
}
</script>

<style scoped>

/* .router-link-active {
  color: #FCF9F9 !important;
} */

.router-link-exact-active {
  color: #FCF9F9 !important;
}

.dropdown-item.router-link-exact-active {
  color: #999900 !important;
}

.test-active {
  color:#FCF9F9 !important;
}

.nav-item {
  color:#BBB;
}

.nav-link {
  letter-spacing: 0.5rem;
  color: #BBB
}

.nav-link:hover {
  color:#999900 !important;
}

</style>