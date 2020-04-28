<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
      <div class="container">
        <!-- <a class="navbar-brand" href="#"><img src="../assets/round_mountain_logo.png" width="auto" height="85" class="d-inline-block align-top" alt=""></a> -->
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
              <a class="dropdown-item" href="#">All Releases</a>
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
        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->
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
      releases: state => state.releases.nav,
    })
  },
  methods: {
    ...mapActions("releases", ["getAll"]),
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    },
  },
  beforeMount: function() {
    this.getAll();
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