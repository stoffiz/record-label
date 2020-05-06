<template>
  <div>
    <div class="footer">
      <div class="footer-absolute">
        <div class="container">
          <div class="row d-flex py-4 justify-content-between align-items-center">
            <div class="col-12 col-md-6 col-lg-5 mb-3 mb-md-0">
              <h4 class="lead text-uppercase text-center text-md-left">Subscribe to our newsletter</h4>
              <p
                class="text-small text-center text-md-left"
              >Subscribe to get the latest information about new releases or other exiting news regarding the label. No junk news, only good news!</p>
              <form v-on:submit.prevent="subscribe">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" aria-describedby="subscribeAddon" placeholder="Email" :class="{ 'is-invalid': $v.subscribeValue.$error }" v-model.trim="$v.subscribeValue.$model">
                  <div class="input-group-append">
                    <button class="btn btn-dark" id="subscribeAddon">
                      <span v-if="!hasSubscribed">Subscribe</span>
                      <span v-if="hasSubscribed">Thank You!</span>
                    </button>
                  </div>
                  <div class="invalid-feedback text-dark text-uppercase letter-spacing-md" v-if="!$v.subscribeValue.required">Field is required</div>
                  <div class="invalid-feedback text-dark text-uppercase letter-spacing-md" v-if="!$v.subscribeValue.email">Valid email address please</div>
                  
                </div>
              </form>
            </div>
            <div class="col-12 col-md-6 col-lg-7 d-flex justify-content-center justify-content-md-end">
              <ul class="nav flex-column text-uppercase text-center text-md-right">
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
import { required, email } from 'vuelidate/lib/validators'
import moment from 'moment';

export default {
    data: function() {
    return {
      subscribeValue: "",
      hasSubscribed: false,
    };
  },
  computed: {
    currentYear: function() {
      return moment().format("YYYY")
    }
  },
  methods: {
    subscribe: function() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      } 
      else {
        this.hasSubscribed = true;
      }
    }
  },
  validations: {
    subscribeValue: {required, email}
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