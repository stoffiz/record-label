<template>
  <div class="container">
    
    <em v-if="releases.loading">Loading users...</em>
    <div class="row my-5">
      <div class="col-12">
        <form
          v-for="release in releases"
          :key="release.id"
          class="lead"
          v-on:submit.prevent="onSubmit"
        >
        <Modal v-bind:release="release"/>
          <h1 class="text-center display-4 mb-4">Edit Cat# {{release.catalogNr}}</h1>
          <input type="hidden" v-model="release.id" />
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="artist">Artist</label>
              <input id="artist" type="text" v-model="release.artist" class="form-control" />
            </div>
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="title">Title</label>
              <input id="title" type="text" v-model="release.title" class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="description">Description</label>
            <textarea
              id="description"
              type="text"
              v-model="release.description"
              class="form-control"
              spellcheck="false"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="format">Format</label>
              <select id="format" type="text" v-model="release.format" class="form-control">
                <option value="LP">LP</option>
                <option value="Cassette">Cassette</option>
                <option value="CD">CD</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="releaseDate">Release Date</label>
              <input id="releaseDate" v-model="release.releaseDate" class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="catalogNumber">Catalog Number</label>
            <input id="catalogNumber" type="text" v-model="release.catalogNr" class="form-control" />
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="quantity">Quantity</label>
            <input id="quantity" type="text" v-model="release.quantity" class="form-control" />
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="quantity">Front Cover</label>
            <input id="frontCover" type="text" aria-describedby="fronCoverHelp" v-model="release.frontCover" class="form-control" />
            <small id="frontCoverHelp" class="form-text text-small text-muted">Eg. ../assets/img/cover.png</small>
          </div>
          <button class="btn btn-dark mr-2" type="submit">
            <div v-if="releases.loading" class="spinner-border spinner-border-sm mr-2" role="status"></div>
            Update
          </button>
          <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#deleteModal">
            Delete <i class="fas fa-trash-alt ml-2"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../../components/Modal.vue"
import { mapState, mapActions, mapMutations } from "vuex";
import router from "../../router";
import moment from 'moment';

export default {
  props: ["id"],
  components: {
    Modal
  },
  data: function() {
    return {
      currentRelease: []
    };
  },
  computed: {
    ...mapState({
      releases: state => state.releases.all,
      alert: state => state.alert,
      cart: state => state.cart
    }),
    formatDate: function(date) {
      return date.moment().format("YYYY-MM-DD")
    }
  },
  methods: {
    ...mapActions("releases", ["getById", "updateRelease", "deleteRelease"]),
    ...mapActions("cart", ["add"]),
    onSubmit: function() {
      if(!moment(this.releases.release.releaseDate, "YYYY-MM-DD").isValid()) {
        this.releases.release.releaseDate = moment().format("YYYY-MM-DD");
      }
      this.updateRelease(this.releases.release);
      //this.getById(this.id)
    },
    deleteCurrentRelease: function() {
      this.deleteRelease(this.id)
      router.back();
    },
  },
  beforeMount: function() {
    this.getById(this.id);
  }
};
</script>