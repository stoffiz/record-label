<template>
  <div class="bg-lightgrey">
    <div class="container">
      <div class="row py-5">
        <div class="col-12">
          <h4 class="display-4 text-center">News</h4>
        </div>
        <div v-if="news.loading">{{news.error}}</div>
        <div v-else v-for="post in news.items" :key="post.id" class="col-12 mb-4">
          <p class="lead m-1 letter-spacing-md">{{formatDate(post.published)}}</p>
          <div class="card">
            <div class="card-header bg-white">
              <p
                class="lead mb-0 letter-spacing-md font-weight-bold text-uppercase text-gold"
              >{{post.title}}</p>
            </div>
            <div class="card-body">
              <p class="font-weight-light">{{shortSummary(post.body)}}</p>
              <div class="text-right">
                <router-link :to="`/news/${post.id}`" class="btn btn-sm btn-outline-dark">Read More</router-link>
              </div>
            </div>
            <div class="card-footer text-secondary d-flex justify-content-between py-1 bg-white">
              <span class="small">Author: {{post.author}}</span>
              <span v-if="post.published != post.updated" class="small font-italic">Updated: {{formatDate(post.updated)}}</span>
            </div>
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
  name: "News",
  methods: {
    ...mapActions("news", {
      getAllNews: "getAll"
    }),
    formatDate: function(date) {
      return moment(date).format("YYYY-MM-DD")
    },
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
  computed: {
    ...mapState({
      news: state => state.news.all
    })
  },
  created: function() {
    this.getAllNews();
  }
};
</script>
