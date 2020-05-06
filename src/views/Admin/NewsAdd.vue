<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
        <form class="lead" v-on:submit.prevent="onSubmit">
          <h4 class="text-center display-4 mb-4">Add News</h4>
            <div class="form-group">
              <label class="text-uppercase" for="title">Title</label>
              <input id="title" type="text" v-model="newsPost.title" class="form-control" />
            </div>          
          <div class="form-group">
            <label class="text-uppercase" for="body">Body</label>
            <textarea
              id="body"
              type="text"
              v-model="newsPost.body"
              class="form-control"
              spellcheck="false"
            />
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="author">Author</label>
            <input id="author" type="text" v-model="newsPost.author" class="form-control" />
          </div>
          <button class="btn btn-dark" type="submit">Add</button>
          <div v-if="news.loading" class="spinner-border ml-2" role="status"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import router from "../../router";
import moment from 'moment';

export default {
  props: ["id"],
  data: function() {
    return {
      newsPost: {
        title: "",
        body: "",
        author: "",
        published: "",
        updated: "",
      }
    };
  },
  computed: {
    ...mapState({
      news: state => state.news.all,
    })
  },
  methods: {
    ...mapActions("news", ["addNews"]),
    
    onSubmit: function() {
      this.newsPost.published = moment().format("YYYY-MM-DD");
      this.newsPost.updated = this.newsPost.published
      this.addNews(this.newsPost)
    }
  },
  beforeMount: function() {}
};
</script>