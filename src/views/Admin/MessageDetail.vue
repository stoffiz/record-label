<template>
<div class="bg-lightgrey">
  <div class="container">
    <div v-if="messages" class="row py-5">
      <div v-for="message in messages" :key="message.id" class="col-12">
          <Modal v-bind:message="message" />
          <div class="card">
              <div class="card-body">
                <div class="mb-2 d-flex justify-content-between">
                    <p class="text-small mb-0 align-self-center">From: {{message.name}} | {{message.email}}</p>
                    <div>
                        <button v-on:click="markAsRead(message)" class="btn btn-sm btn-outline-dark mr-2 align-self-center">
                          <span v-if="!message.isRead">Mark as read</span>
                          <span v-if="message.isRead">Mark as unread</span>
                        </button>
                        <button v-on:click="markAsAnswered(message)" class="btn btn-sm btn-outline-dark mr-2">
                          <span v-if="!message.isAnswered">Mark as answered</span>
                          <span v-if="message.isAnswered">Mark as unanswered</span>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-dark" data-toggle="modal" data-target="#deleteModal">
                        <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                <hr>
                <p class="lead">{{message.subject}}</p>
                <p>{{message.question}}</p>
              </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Modal from "../../components/Modal.vue";
import { mapState, mapActions } from "vuex";
import router from "../../router";
import moment from "moment";

export default {
  props: ["id"],
  components: {
      Modal
  },
  computed: {
    ...mapState({
      messages: state => state.message.all      
    })
  },
  methods: {
    ...mapActions("message", ["getById", "updateMessage"]),
    onSubmit: function() {

    },
    markAsRead: function(item) {
      let message = item;
      message.isRead ? message.isRead = false : message.isRead = true;
      this.updateMessage(message);      
    },
    markAsAnswered: function(item) {
      let message = item;
      message.isAnswered ? message.isAnswered = false : message.isAnswered = true;
      this.updateMessage(message); 
    }
  },
  beforeMount: function() {
    this.getById(this.id);
  }
};
</script>