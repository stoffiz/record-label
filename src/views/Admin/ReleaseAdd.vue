<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-12">
        <form v-on:submit.prevent="onSubmit">
          <h1 class="text-center display-4 mb-4">Add new release</h1>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
                <label for="artist">Artist</label>
                <input id="artist" class="form-control" :class="{ 'is-invalid': $v.newRelease.artist.$error }" v-model.trim="$v.newRelease.artist.$model">
                <div class="invalid-feedback" v-if="!$v.newRelease.artist.required">Field is required</div>
            </div>
            <div class="form-group col-12 col-md-6">
                <label for="title">Title</label>
                <input id="title" class="form-control" :class="{ 'is-invalid': $v.newRelease.title.$error }" v-model.trim="$v.newRelease.title.$model">
                <div class="invalid-feedback" v-if="!$v.newRelease.title.required">Field is required</div>
            </div>
          </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" class="form-control" :class="{ 'is-invalid': $v.newRelease.description.$error }" v-model.trim="$v.newRelease.description.$model" />
            <div class="invalid-feedback" v-if="!$v.newRelease.description.required">Field is required</div>
        </div>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="format">Format</label>
              <select id="format" type="text" v-model="newRelease.format" class="form-control" :class="{ 'is-invalid': $v.newRelease.format.$error }" v-model.trim="$v.newRelease.format.$model">
                <option value="LP">LP</option>
                <option value="Cassette">Cassette</option>
                <option value="CD">CD</option>
                <option value="Digital">Digital</option>
              </select>
              <div class="invalid-feedback" v-if="!$v.newRelease.format.required">Field is required</div>
            </div>
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="releaseDate">Release Date (YYYY-MM-DD)</label>
              <input id="releaseDate" class="form-control" :class="{ 'is-invalid': $v.newRelease.releaseDate.$error }" v-model.trim="$v.newRelease.releaseDate.$model"/>
              <small id="frontCoverHelp" class="form-text text-small text-muted">Incorrect date and todays date will be set</small>
              <div class="invalid-feedback" v-if="!$v.newRelease.releaseDate.required">Field is required</div>
            </div>
          </div>
        <div class="form-group">
            <label class="text-uppercase" for="catalogNr">Catalog Number</label>
            <input id="catalogNr" class="form-control" :class="{ 'is-invalid': $v.newRelease.catalogNr.$error }" v-model.trim="$v.newRelease.catalogNr.$model"/>
            <div class="invalid-feedback" v-if="!$v.newRelease.catalogNr.required">Field is required</div>
            <div class="invalid-feedback" v-if="!$v.newRelease.catalogNr.numeric">Only numbers 0-9</div>
        </div>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
                <label class="text-uppercase" for="quantity">Quantity</label>
                <input id="quantity" class="form-control" :class="{ 'is-invalid': $v.newRelease.quantity.$error }" v-model.trim="$v.newRelease.quantity.$model"/>
                <div class="invalid-feedback" v-if="!$v.newRelease.quantity.required">Field is required</div>
                <div class="invalid-feedback" v-if="!$v.newRelease.quantity.numeric">Only numbers 0-9</div>
            </div>
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="price">Price (EUR)</label>
                <input id="price" class="form-control" :class="{ 'is-invalid': $v.newRelease.price.$error }" v-model.trim="$v.newRelease.price.$model"/>
                <div class="invalid-feedback" v-if="!$v.newRelease.price.required">Field is required</div>
                <div class="invalid-feedback" v-if="!$v.newRelease.price.decimal">Numbers 0-9 and decimals only</div>
                <div class="invalid-feedback" v-if="!$v.newRelease.price.between">Must be at least €{{$v.newRelease.price.$params.between.min}}</div>
            </div>
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="quantity">Front Cover</label>
            <input id="frontCover" type="text" aria-describedby="fronCoverHelp" v-model="newRelease.frontCover" class="form-control" />
            <small id="frontCoverHelp" class="form-text text-small text-muted">Eg. /assets/img/forest01.jpg</small>
          </div>
          <button class="btn btn-dark" type="submit">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { required, between, numeric, decimal } from 'vuelidate/lib/validators'
import router from "../../router";
import moment from 'moment';

export default {
  props: ["id"],
  data: function() {
    return {
      newRelease: {
        artist: "",
        title: "",
        description: "",
        format: "",
        releaseDate: "",
        catalogNr: "",
        quantity: "",
        frontCover: "",
        price: ""
      }
    };
  },
  computed: {
    ...mapState({
      releases: state => state.release.all,
    })
  },
  methods: {
    ...mapActions("release", ["addRelease"]),
    
    onSubmit: function() {
    this.$v.$touch()
    if (this.$v.$invalid) {
        return;
    } 
    else {
        if(!moment(this.newRelease.releaseDate, "YYYY-MM-DD").isValid()) {
            this.newRelease.releaseDate = moment().format("YYYY-MM-DD");
        }
        this.addRelease(this.newRelease)
    }

    }
  },
  validations: {
    newRelease: {
      artist: {required},
      title: {required},
      description: {required},
      format: {required},
      releaseDate: {required},
      catalogNr: {required, numeric},
      quantity: {required, numeric},
      
      price: {required, decimal, between: between(5, 10000)}
    }
  }
};
</script>