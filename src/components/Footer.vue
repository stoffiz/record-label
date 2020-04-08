<template>
  <div>
    <div class="footer">
      <div class="footer-absolute">
        <div class="container">
          <div class="row d-flex py-4 justify-content-between align-items-center">
            <div class="col-12 col-md-6 mb-3 mb-md-0">
              <h4 class="lead text-uppercase">Subscribe to out newsletter</h4>
              <p
                class="text-small"
              >Subscribe to get the latest information about new releases or other exiting news regarding the label. No junk news, only good news!</p>
              <form class="form-inline">
                <input type="text" id="email" class="form-control mb-2 mb-md-0 mr-1" placeholder="Email" />
                <button class="btn btn-dark">Subscribe!</button>
              </form>
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-md-end">
              <ul class="nav flex-column text-uppercase text-md-right">
                <li class="nav-item">
                  <a class="nav-link p-0" href="#">+4621121315</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link p-0" href="#">contact@cosmorecordings.com</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link p-0" href="#">Ordering & Payment</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link p-0" href="#">Shipping & Returns</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link p-0" href="#">FAQ</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom bg-black">
      <div class="container">
        <div class="row d-flex py-2 justify-content-between align-items-center">
          <div class="col">
            <span class="text-white text-small text-uppercase">© Cosmo Recordings | {{ currentYear }}</span>
          </div>
          <div class="col text-right">
            <a href="#" class="text-white mr-3"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-white mr-3"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-white mr-3"><i class="fab fa-facebook-f"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: function() {
    return {
      test: "Hello Christoffer Åström. Welcome to the website",
      year: ""
    };
  },
    computed: {
    currentYear: function() {
      let date = new Date().toLocaleDateString().split("/")
      return this.year = date[2]
    }
  }
}
</script>

<style scoped>
.footer {
  background: url("../assets/footer.jpg");
  width: auto;
  
}

.footer-absolute {
  background: rgba(153, 153, 80, 0.94);
  overflow: hidden;
  height: 100%;
}

.nav-link {
  color: #1c1c1c;
}

.nav-link:hover {
  color: #FCF9F9;
}

a i {
  transition: ease-in-out 0.2s;
}

a i:hover {
  color:#999900;
} 
</style>