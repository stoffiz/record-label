<template>
  <div>
    <div class="bg-lightgrey">
      <div class="container">
        <div class="row py-5">
          <div class="col-12">
            <h4 class="display-4 text-center mb-4">NEW RELEASES</h4>
            <p
              class="lead"
            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta odio laudantium impedit aliquam incidunt quod ex accusantium nisi ea non aspernatur magnam libero atque, temporibus culpa nesciunt sint veritatis. Sapiente fugiat dicta eos? Porro quo odio corporis in, cupiditate quae. Nisi repellendus cum eos omnis nobis, sit eum cumque ipsam.</p>
          </div>
        </div>
        <div v-if="releases.items" class="row d-flex justify-content-between pb-5">
          <div  v-for="release in latestReleases" :key="release.id" class="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0 text-center">
            <img :src="release.frontCover" class="rounded-circle" height="200" />
            <p class="text-center my-3 text-uppercase letter-spacing-lg">{{release.artist}} #{{release.catalogNr}}</p>
            <router-link :to="`/release/${release.id}`" class="btn btn-sm btn-outline-dark shadow-sm">Read more</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-custom-white">
      <div class="container">
        <div v-if="news.items" class="row py-5">
          <div v-for="news in latestNews" :key="news.id" class="col-12">
            <h4 class="display-4 text-center mb-5">LATEST NEWS</h4>
            <h2
              class="text-gold text-uppercase font-weight-light"
            >{{news.title}}</h2>
            <p class="mb-4">{{shortSummary(news.body)}}
            </p>
            <router-link :to="`/news/${news.id}`" class="btn btn-sm btn-dark">Read More</router-link>
            <router-link to="/news" class="btn btn-sm btn-outline-dark ml-2">All News</router-link>
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
      releases: state => state.release.all,
      news: state => state.news.all
    }),
    latestReleases: function() {
      //slice to get latest 3 releases
      return this.releases.items.slice(-3);
    },
    latestNews: function() {
      return this.news.items.slice(0, 1)
    }
  },
  methods: {
    ...mapActions("release", ["getAll"]),
    ...mapActions("news", {
      getAllNews: "getAll"
    }),
    shortSummary: function(text) {
      //return shorten summary of text that contains more than 1000 words//
      let shortText = text
      if(shortText.length < 1000) {
        return shortText
      }
      else {
        return shortText.slice(0, 1000) + "...";
      }
    }
  },
  beforeMount: function() {
    this.getAll();
    this.getAllNews();
  }
};
</script>
<style scoped>


.btn-shadow {
  box-shadow: 10px 10px 5px -8px rgba(0, 0, 0, 0.75);
}
</style>