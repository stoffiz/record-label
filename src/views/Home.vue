<template>
  <div>
    <div class="bg-lightgrey">
      <div class="container">
        <div class="row py-5">
          <div class="col">
            <h4 class="display-4 text-center">New Releases</h4>
            <p
              class="lead"
            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta odio laudantium impedit aliquam incidunt quod ex accusantium nisi ea non aspernatur magnam libero atque, temporibus culpa nesciunt sint veritatis. Sapiente fugiat dicta eos? Porro quo odio corporis in, cupiditate quae. Nisi repellendus cum eos omnis nobis, sit eum cumque ipsam.</p>
          </div>
        </div>
        <div v-if="releases.items" class="row d-flex justify-content-between pb-5">
          <div  v-for="release in latestReleases" :key="release.id" class="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0 text-center">
            <img :src="release.frontCover" class="rounded-circle" height="200" />
            <p class="text-center my-3 text-uppercase letter-spacing-lg">{{release.artist}} #{{release.catalogNr}}</p>
            <router-link :to="`/release/${release.id}`" class="btn btn-sm btn-outline-dark shadow-sm letter-spacing-md">Read more</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-custom-white">
      <div class="container">
        <div class="row py-5">
          <div class="col-12 col-md-10">
            <h2
              class="text-gold text-uppercase font-weight-light"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
            <p class="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta odio laudantium impedit aliquam incidunt quod ex accusantium nisi ea non aspernatur magnam libero atque, temporibus culpa nesciunt sint veritatis. Sapiente fugiat dicta eos? Porro quo odio corporis in, cupiditate quae. Nisi repellendus cum eos omnis nobis, sit eum cumque ipsam.
              aliquam incidunt quod ex accusantium nisi ea non aspernatur magnam libero atque, temporibus culpa nesciunt sint veritatis. Sapiente fugiat dicta eos? Porro quo odio corporis in, cupiditate quae. Nisi repellendus cum eos omnis nobis, sit eum cumque ipsam.
            </p>
            <a href="#" class="btn btn-sm btn-dark letter-spacing-sm text-uppercase">Shop now</a>
            <a href="#" class="btn btn-sm btn-outline-dark letter-spacing-sm text-uppercase ml-2">Contact</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Home",
  data: function() {
    return {
      releaseslatest: []
    }
  },
  computed: {
    ...mapState({
      releases: state => state.releases.all,
    }),
    latestReleases: function() {
      //reverse array for latest release
      //split to get latest 3
      return this.releases.items.reverse().slice(0, 3);
    }
  },
  methods: {
    ...mapActions("releases", ["getAll"]),
  },
  beforeMount: function() {
    this.getAll();
  }
};
</script>
<style scoped>


.btn-shadow {
  box-shadow: 10px 10px 5px -8px rgba(0, 0, 0, 0.75);
}
</style>