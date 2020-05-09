<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
        <form v-on:submit.prevent="onSubmit">
          <h4 class="text-center display-4 mb-4">Add News</h4>
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title" class="form-control" :class="{ 'is-invalid': $v.newsPost.title.$error }" v-model.trim="$v.newsPost.title.$model">
            <div class="invalid-feedback" v-if="!$v.newsPost.title.required">Field is required</div>
          </div>
          <div class="form-group">
            <label for="body">Body</label>
            <textarea id="body" class="form-control" spellcheck="false" rows="5" :class="{ 'is-invalid': $v.newsPost.body.$error }" v-model.trim="$v.newsPost.body.$model"/>
            <div class="invalid-feedback" v-if="!$v.newsPost.body.required">Field is required</div>
          </div>            
          <div class="form-group">
            <label for="author">Author</label>
            <input id="author" class="form-control" :class="{ 'is-invalid': $v.newsPost.author.$error }" v-model.trim="$v.newsPost.author.$model">
            <div class="invalid-feedback" v-if="!$v.newsPost.author.required">Field is required</div>
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
import { required } from 'vuelidate/lib/validators'
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
     this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      } 
      else {
      this.newsPost.published = moment().format("YYYY-MM-DD");
      this.newsPost.updated = this.newsPost.published
      this.addNews(this.newsPost)
      }
    }
  },
  validations: {
    newsPost: {
        title: {required},
        body: {required},
        author: {required}
    }
  }
};
</script>