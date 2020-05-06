<template>
  <div class="bg-lightgrey">
    <div class="container">
        <div v-if="releases.items" class="row py-5 d-flex justify-content-between pb-5">
            <div class="col-12 text-center mb-4">
                <h4 class="display-4">All Releases</h4>
            </div>
            <div v-for="release in releases.items" :key="release.id" class="col-12 col-md-6 col-lg-4 mb-5 text-center"> 
                <div>
                    <router-link :to="`/release/${release.id}`">
                        <img :src="release.frontCover" class="rounded-circle" height="200" />
                    </router-link>
                    <p class="text-center mt-3 mb-0 pb-0 text-uppercase letter-spacing-md">#{{release.catalogNr}} {{release.artist}}</p>
                    <p class="text-center mb-2 text-small font-italic letter-spacing-md">{{release.title}}</p>
                    <!-- <router-link :to="`/release/${release.id}`" class="btn btn-sm btn-outline-dark shadow-sm letter-spacing-md">Read more</router-link> -->
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "Releases",
  computed: {
    ...mapState({
      releases: state => state.release.all
    }),
    formatDate: function(date) {
      return date.moment().format("YYYY-MM-DD");
    }
  },
  methods: {
    ...mapActions("release", ["getAll"])
  },
  created: function() {
    this.getAll();
  }
};
</script>

<style scoped>
    p {
        color: #000;
        
    }

    a:hover {
        text-decoration: none !important;
        color: #999900 !important;
    }

    a img {
        transition: ease-in-out 0.2s;

        
    }

    a img:hover {
        filter:blur(1px)
    }

</style>