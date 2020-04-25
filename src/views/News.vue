<template>
  <div class="bg-lightgrey">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h4 class="display-4 text-center">News</h4>
        </div>
        <div class="col-12 mb-4">
          <p class="lead m-1 letter-spacing-md">2020-04-05</p>
          <div class="card">
            <div class="card-header bg-white">
              <p
                class="lead mb-0 letter-spacing-md font-weight-bold text-uppercase text-gold"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div class="card-body pb-0">
              <p>{{text}}</p>
              <p>{{shortenText}}</p>
              <p>{{shortSummary(text)}}</p>
              <p
                class="letter-spacing-sm"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nemo asperiores vitae eligendi ex vel quia omnis illum dolore quasi. Expedita quibusdam id reiciendis hic quia eligendi doloribus excepturi illum accusantium tempora facere corporis molestias cumque natus adipisci quam culpa atque possimus, inventore eos debitis ipsa? A corrupti cum voluptatibus blanditiis voluptates laboriosam quo! Nesciunt dolores tempora reiciendis illum fugit consequuntur exercitationem, velit ratione rem dolorem sint accusamus itaque aperiam distinctio ullam! Fugiat possimus id numquam quo fugit soluta iusto ipsam aperiam aspernatur consectetur facere architecto illo ea laudantium tenetur rem, veniam accusamus esse deleniti neque dignissimos explicabo distinctio odit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nemo asperiores vitae eligendi ex vel quia omnis illum dolore quasi."
    }
  },
  methods: {
    shortSummary: function(text) {
      return text.slice(0, 10) + "..."
    }
  },
  computed: {
    shortenText: function() {
      return this.text.slice(0, 10) + " ..."
    }
  }
};
</script>
