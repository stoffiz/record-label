<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
        <form class="lead" v-on:submit.prevent="onSubmit">
          <h1 class="text-center display-4 mb-4">Add new release</h1>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="artist">Artist</label>
              <input id="artist" type="text" v-model="newRelease.artist" class="form-control" />
            </div>
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="title">Title</label>
              <input id="title" type="text" v-model="newRelease.title" class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="description">Description</label>
            <textarea
              id="description"
              type="text"
              v-model="newRelease.description"
              class="form-control"
              spellcheck="false"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="format">Format</label>
              <select id="format" type="text" v-model="newRelease.format" class="form-control">
                <option value="LP">LP</option>
                <option value="Cassette">Cassette</option>
                <option value="CD">CD</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="releaseDate">Release Date</label>
              <input id="releaseDate" v-model="newRelease.releaseDate" class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="catalogNumber">Catalog Number</label>
            <input
              id="catalogNumber"
              type="text"
              v-model="newRelease.catalogNr"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="quantity">Quantity</label>
            <input id="quantity" type="text" v-model="newRelease.quantity" class="form-control" />
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="quantity">Front Cover</label>
            <input id="frontCover" type="text" aria-describedby="fronCoverHelp" v-model="newRelease.frontCover" class="form-control" />
            <small id="frontCoverHelp" class="form-text text-small text-muted">Eg. ../assets/img/cover.png</small>
          </div>
          <button class="btn btn-dark" type="submit">Update</button>
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
      newRelease: {
        arist: "",
        title: "",
        description: "",
        format: "",
        releaseDate: "",
        catalogNr: "",
        quantity: "",
        frontCover: ""
      }
    };
  },
  computed: {
    ...mapState({
      releases: state => state.releases.all,
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions("releases", ["addRelease"]),
    
    onSubmit: function() {
      if(!moment(this.newRelease.releaseDate, "YYYY-MM-DD").isValid()) {
        this.newRelease.releaseDate = moment().format("YYYY-MM-DD");
      }
      this.addRelease(this.newRelease)
    }
  },
  beforeMount: function() {}
};
</script>