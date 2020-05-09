<template>
  <div class="container">
    <em v-if="releases.loading">Loading users...</em>
    <div class="row my-5">
      <div class="col-12">
        <form v-if="releases.items" v-on:submit.prevent="onSubmit">
        <Modal v-bind:release="releases.items"/>
          <h4 class="text-center display-4 mb-4">Edit Release# {{releases.items.catalogNr}}</h4>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
                <label for="artist">Artist</label>
                <input id="artist" class="form-control" :class="{ 'is-invalid': $v.releases.items.artist.$error }" v-model.trim="$v.releases.items.artist.$model">
                <div class="invalid-feedback" v-if="!$v.releases.items.artist.required">Field is required</div>
            </div>
            <div class="form-group col-12 col-md-6">
                <label for="title">Title</label>
                <input id="title" class="form-control" :class="{ 'is-invalid': $v.releases.items.title.$error }" v-model.trim="$v.releases.items.title.$model">
                <div class="invalid-feedback" v-if="!$v.releases.items.title.required">Field is required</div>
            </div>
          </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" class="form-control" :class="{ 'is-invalid': $v.releases.items.description.$error }" v-model.trim="$v.releases.items.description.$model" />
            <div class="invalid-feedback" v-if="!$v.releases.items.description.required">Field is required</div>
        </div>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="format">Format</label>
              <select id="format" type="text" v-model="releases.items.format" class="form-control" :class="{ 'is-invalid': $v.releases.items.format.$error }" v-model.trim="$v.releases.items.format.$model">
                <option value="LP">LP</option>
                <option value="Cassette">Cassette</option>
                <option value="CD">CD</option>
                <option value="Digital">Digital</option>
              </select>
              <div class="invalid-feedback" v-if="!$v.releases.items.format.required">Field is required</div>
            </div>
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="releaseDate">Release Date (YYYY-MM-DD)</label>
              <input id="releaseDate" class="form-control" :class="{ 'is-invalid': $v.releases.items.releaseDate.$error }" v-model.trim="$v.releases.items.releaseDate.$model"/>
              <small id="frontCoverHelp" class="form-text text-small text-muted">Incorrect date and todays date will be set</small>
              <div class="invalid-feedback" v-if="!$v.releases.items.releaseDate.required">Field is required</div>
            </div>
          </div>
        <div class="form-group">
            <label class="text-uppercase" for="catalogNr">Catalog Number</label>
            <input id="catalogNr" class="form-control" :class="{ 'is-invalid': $v.releases.items.catalogNr.$error }" v-model.trim="$v.releases.items.catalogNr.$model"/>
            <div class="invalid-feedback" v-if="!$v.releases.items.catalogNr.required">Field is required</div>
            <div class="invalid-feedback" v-if="!$v.releases.items.catalogNr.numeric">Only numbers 0-9</div>
        </div>
          <div class="form-row">
            <div class="form-group col-12 col-md-6">
                <label class="text-uppercase" for="quantity">Quantity</label>
                <input id="quantity" class="form-control" :class="{ 'is-invalid': $v.releases.items.quantity.$error }" v-model.trim="$v.releases.items.quantity.$model"/>
                <div class="invalid-feedback" v-if="!$v.releases.items.quantity.required">Field is required</div>
                <div class="invalid-feedback" v-if="!$v.releases.items.quantity.numeric">Only numbers 0-9</div>
            </div>
            <div class="form-group col-12 col-md-6">
              <label class="text-uppercase" for="price">Price (EUR)</label>
                <input id="price" class="form-control" :class="{ 'is-invalid': $v.releases.items.price.$error }" v-model.trim="$v.releases.items.price.$model"/>
                <div class="invalid-feedback" v-if="!$v.releases.items.price.required">Field is required</div>
                <div class="invalid-feedback" v-if="!$v.releases.items.price.decimal">Numbers 0-9 and decimals only</div>
                <div class="invalid-feedback" v-if="!$v.releases.items.price.between">Must be at least €{{$v.releases.items.price.$params.between.min}}</div>
            </div>
          </div>
          <div class="form-group">
            <label class="text-uppercase" for="quantity">Front Cover</label>
            <input id="frontCover" type="text" aria-describedby="fronCoverHelp" v-model="releases.items.frontCover" class="form-control" />
            <small id="frontCoverHelp" class="form-text text-small text-muted">Eg. /assets/img/forest01.jpg</small>
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
import { required, between, numeric, decimal } from 'vuelidate/lib/validators'
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
        releases: state => state.release.one,
        alert: state => state.alert,
        cart: state => state.cart
        }),
        formatDate: function(date) {
        return date.moment().format("YYYY-MM-DD")
        }
    },
    methods: {
        ...mapActions("release", ["getById", "updateRelease", "deleteRelease"]),
        ...mapActions("cart", ["add"]),
        onSubmit: function() {
        if(!moment(this.releases.items.releaseDate, "YYYY-MM-DD").isValid()) {
            this.releases.items.releaseDate = moment().format("YYYY-MM-DD");
        }
        this.updateRelease(this.releases.items);
        //this.getById(this.id)
        },
        deleteCurrentRelease: function() {
            this.deleteRelease(this.id)
            router.back();
        },
    },
    beforeMount: function() {
        this.getById(this.id);
    },
    validations: {
        releases: {
            items: {
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
    }
};
</script>