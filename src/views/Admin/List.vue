<template>
  <div class="container">
    <h1 class="text-center display-4 my-5">Admin</h1>
    <div v-if="releases.loading" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    <!-- RELEASES -->
    <div class="row my-5">
      <div class="col d-flex justify-content-between mb-2">
        <span class="align-self-end lead text-gold letter-spacing-sm">RELEASES</span>
        <span><router-link to="/admin/release/add" class="btn btn-secondary">Add new release <i class="fas fa-record-vinyl ml-2"></i></router-link></span>
      </div>
      <div class="col-12 table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="bg-light">
            <tr>
              <th class="lead letter-spacing-sm">Edit</th>
              <th class="lead letter-spacing-sm">Artist</th>
              <th class="lead letter-spacing-sm">Title</th>
              <th class="lead letter-spacing-sm">Release Date</th>
              <th class="lead letter-spacing-sm">Format</th>
              <th class="lead letter-spacing-sm">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="release in releases.items" :key="release.id">
              <th><router-link :to="`/admin/release/edit/${release.id}`" class="btn btn-block btn-sm btn-light"> <i class="fas fa-cog"></i></router-link></th>
              <td>{{release.artist}}</td>
              <td>{{release.title}}</td>
              <td>{{formatDate(release.releaseDate)}}</td>
              <td>{{release.format}}</td>
              <td>{{release.quantity}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- NEWS POSTS -->
    <div class="row mb-5">
      <div class="col d-flex justify-content-between mb-2">
        <span class="align-self-end lead text-gold letter-spacing-sm">NEWS POSTS</span>
        <span><router-link to="/admin/news/add" class="btn btn-secondary">Add News <i class="fas fa-newspaper ml-2"></i></router-link></span>
        </div>
      <div class="col-12 table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="bg-light">
            <tr>
              <th class="lead letter-spacing-sm">Edit</th>
              <th class="lead letter-spacing-sm">Title</th>
              <th class="lead letter-spacing-sm">Published</th>
              <th class="lead letter-spacing-sm">Updated</th>
              <th class="lead letter-spacing-sm">Author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in news.items" :key="post.id">
              <th><router-link :to="`/admin/news/edit/${post.id}`" class="btn btn-block btn-sm btn-light"> <i class="fas fa-cog"></i></router-link></th>
              <td>{{shortenText(post.title)}}</td>
              <td>{{formatDate(post.published)}}</td>
              <td>{{formatDate(post.updated)}}</td>
              <td>{{post.author}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Messages -->
    <div class="row mb-5">
      <div class="col d-flex justify-content-between mb-2">
        <span class="align-self-end lead text-gold letter-spacing-sm">MESSAGES</span>
        </div>
      <div class="col-12 table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="bg-light">
            <tr>
              <th class="lead letter-spacing-sm">View</th>
              <th class="lead letter-spacing-sm">Subject</th>
              <th class="lead letter-spacing-sm">From</th>
              <th class="lead letter-spacing-sm">Email</th>
              <th class="lead letter-spacing-sm">Answered</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="message in messages.items" :key="message.id">
              <th><router-link :to="`/admin/message/detail/${message.id}`" class="btn btn-block btn-sm btn-light"> <i class="far fa-eye"></i></router-link></th>
              <td v-bind:class="{'font-weight-bold': !message.isRead}">{{message.subject}}</td>
              <td>{{message.name}}</td>
              <td>{{message.email}}</td>
              <td class="text-center"><i v-if="message.isAnswered" class="fas fa-check"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../../components/Modal.vue"
import { mapState, mapActions, mapMutations } from "vuex";
import moment from "moment";

export default {
  components: {
    Modal
  },
  data: function() {
    return {
      releases2: []
    };
  },
  computed: {
    ...mapState({
      releases: state => state.release.all,
      news: state => state.news.all,
      messages: state => state.message.all
    })
  },
  methods: {
    ...mapActions("release", ["getAll", "deleteRelease"]),
    ...mapActions("news", {
      getAllNews: "getAll"
    }),
    ...mapActions("message", {
      getAllMessages: "getAll"
    }),
    formatDate: function(date) {
      return moment(date).format("YYYY-MM-DD")
    },
    shortenText: function(text) {
      return text.slice(0, 20) + "..."
    }
  },
  beforeMount: function() {
    this.getAll();
    this.getAllNews();
    this.getAllMessages();
  }
};
</script>

<style scoped>
  .text-dark i:hover {
    color: #999900;
  }
</style>