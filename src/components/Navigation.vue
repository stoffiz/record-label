<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
      <div class="container">
        <!-- <a class="navbar-brand" href="#"><img src="../assets/round_mountain_logo.png" width="auto" height="85" class="d-inline-block align-top" alt=""></a> -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav m-auto text-uppercase">
          <li class="nav-item mr-4">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item d-none d-lg-block"><span class="nav-link">|</span></li>
          <li class="nav-item ml-lg-4 mr-4">
            <router-link to="/news" class="nav-link">News</router-link>
          </li>
          <li class="nav-item d-none d-lg-block"><span class="nav-link">|</span></li>
          <li class="nav-item ml-lg-4 mr-4 dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Releases
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/releases" class="dropdown-item">All Releases</router-link>
              <router-link to="/release/1" class="dropdown-item">Release#1</router-link>
              <router-link to="/release/2" class="dropdown-item">Release#2</router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item d-none d-lg-block"><span class="nav-link">|</span></li>
          <li class="nav-item ml-lg-4 mr-4">
            <a class="nav-link" href="#">Shop</a>
          </li>
          <li class="nav-item d-none d-lg-block"><span class="nav-link">|</span></li>
          <li class="nav-item ml-lg-4">
            <a class="nav-link" href="#">Contact</a>
          </li>
        </ul>
        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data: function () {
    return {
      path: '',
      username: 'Stoffe'
    }
  },
  methods: {
  subIsActive(input) {
    const paths = Array.isArray(input) ? input : [input]
    return paths.some(path => {
      return this.$route.path.indexOf(path) === 0 // current path starts with this path string
    })
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

.nav-link {
  letter-spacing: 0.5rem;
}

.nav-link:hover {
  color:#999900 !important;
}

</style>