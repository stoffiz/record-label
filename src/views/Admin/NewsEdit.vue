<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
          
        <form class="lead" v-for="post in news" :key="post.id" v-on:submit.prevent="onSubmit">
          <Modal v-bind:news="post" />
          <h1 v-if="post.title" class="text-center display-4 mb-4">Edit: {{shortenText(post.title)}}</h1>
          <div class="form-group">
            <label class="text-uppercase" for="title">Title</label>
            <input id="title" type="text" v-model="post.title" class="form-control" />
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="body">Body</label>
            <textarea
              id="body"
              type="text"
              v-model="post.body"
              class="form-control"
              spellcheck="false"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="author">Author</label>
              <input id="author" type="text" v-model="post.author" class="form-control" />
            </div>
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="published">Published</label>
              <input
                id="published"
                type="text"
                readonly
                v-model="post.published"
                class="form-control"
              />
            </div>
          </div>
          <button class="btn btn-dark" type="submit">Update</button>
          <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#deleteModal">Delete
            <i class="fas fa-trash-alt ml-2"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../../components/Modal.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import router from "../../router";
import moment from "moment";

export default {
  props: ["id"],
  components: {
      Modal
  },
  computed: {
    ...mapState({
      news: state => state.news.all,
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions("news", ["getById", "updateNews"]),

    onSubmit: function() {
      this.news.news.updated = moment().format("YYYY-MM-DD");
      this.updateNews(this.news.news);
    },
    shortenText: function(text) {
      return text.slice(0, 20) + "..."
    }
  },
  beforeMount: function() {
    this.getById(this.id);
  }
};
</script>