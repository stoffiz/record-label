<template>
    <div class="bg-lightgrey">
        <div v-for="release in releases" :key="release.id" class="container py-5">
            <div class="row">
                <div class="col-12">
                    <h4 class="display-4 d-block">Recording #{{release.catalogNr}}</h4>
                </div>
            </div>
            <div class="row">
                <div  class="col-12 col-lg-6 mb-2 mb-lg-0">
                    <img :src="release.frontCover" width="100%" alt="">
                    <router-link to="/shop" class="btn btn-sm btn-block btn-outline-dark text-uppercase letter-spacing-lg mt-2">Buy now</router-link>
                </div>
                <div  class="col-12 col-lg-6">
                    <div class="card">
                        <div class="card-body py-2">
                            <p class="lead text-gold text-uppercase letter-spacing-sm mb-0">{{release.artist}} - {{release.title}}</p>
                            <p class="font-italic letter-spacing-sm">Format: {{release.format}} | Quantity: {{release.quantity}}</p>
                            <p class="text-small">{{release.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from 'moment';
import router from "../router";

export default {
    name: "Release",
    props: ['id'],
      computed: {
    ...mapState({
      releases: state => state.release.one
    }),
    formatDate: function(date) {
      return date.moment().format("YYYY-MM-DD")
    }
  },
  methods: {
    ...mapActions("release", ["getById"]),
  },
  created: function() {
      this.getById(this.id)
  },
  beforeRouteUpdate: function(to, from, next) {
    this.getById(to.params.id);
    next();
  }

}
</script>