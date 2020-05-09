<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
        <form v-if="news.items" v-on:submit.prevent="onSubmit">
          <Modal v-bind:news="news.items" />
          <h4 class="text-center display-4 mb-4">Edit: {{shortenText(news.items.title)}}</h4>
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title" class="form-control" :class="{ 'is-invalid': $v.news.items.title.$error }" v-model.trim="$v.news.items.title.$model">
            <div class="invalid-feedback" v-if="!$v.news.items.title.required">Field is required</div>
          </div>
          <div class="form-group">
            <label for="body">Body</label>
            <textarea id="body" class="form-control" rows="5" spellcheck="false" :class="{ 'is-invalid': $v.news.items.body.$error }" v-model.trim="$v.news.items.body.$model"/>
            <div class="invalid-feedback" v-if="!$v.news.items.body.required">Field is required</div>
          </div>            
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
              <label for="author">Author</label>
              <input id="author" class="form-control" :class="{ 'is-invalid': $v.news.items.author.$error }" v-model.trim="$v.news.items.author.$model">
              <div class="invalid-feedback" v-if="!$v.news.items.author.required">Field is required</div>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="published">Published</label>
              <input id="published" class="form-control" readonly v-model="news.items.published">
            </div>
          </div>
          <button class="btn btn-dark" type="submit">Update</button>
          <div v-if="news.loading" class="spinner-border ml-2" role="status"></div>
          <button type="button" class="btn btn-outline-dark ml-2" data-toggle="modal" data-target="#deleteModal">Delete
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
import { required } from 'vuelidate/lib/validators'
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
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      } 
      else {
        this.news.items.updated = moment().format("YYYY-MM-DD");
        this.updateNews(this.news.items);
      }
    },
    shortenText: function(text) {
      return text.slice(0, 20)
    }
  },
  beforeMount: function() {
    this.getById(this.id);
  },
  validations: {
      news: { 
        items: {
          title: {required},
          body: {required},
          author: {required}
        }
      }
  }
};
</script>