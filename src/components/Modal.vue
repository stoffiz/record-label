<template>
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header border-0">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete: <br>
        <p v-if="release">{{release.artist}} - {{release.title}}</p>
        <p v-if="news">{{news.title}}</p>
        <p v-if="message">{{message.subject}}</p>
      </div>
      <div class="modal-footer border-0">
        <button type="button" class="btn btn-outline-dark" data-dismiss="modal">Close</button>
        <button v-on:click="deleteCurrent" type="button" data-dismiss="modal" class="btn btn-dark">Confirm</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
import router from "../router";

export default {
    name: "Modal",
    props: ["release", "news", "message"],
    methods: {
        ...mapActions("release", ["deleteRelease"]),
        ...mapActions("news", ["deleteNews"]),
        ...mapActions("message", ["deleteMessage"]),
    deleteCurrent: function() {
      if(this.release) {
        this.deleteRelease(this.release.id)
      }
      if(this.news) {
        this.deleteNews(this.news.id)
      }
      if(this.message) {
        this.deleteMessage(this.message.id)
      }
      router.back();
    }
  },
}
</script>