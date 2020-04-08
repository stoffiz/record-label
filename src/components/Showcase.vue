<template>
  <div class="showcase">
    <div class="container py-5">
      <div class="row justify-content-center">
        <img src="../assets/cosmo_logo_gold.png" alt="" height="200">
        <div v-if="activeRoute == 'Home' " class="col-12 col-md-8">
          <p
            class="lead text-white text-center"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur provident earum optio aut nostrum, amet perferendis non ipsam quo exercitationem recusandae sequi quia minima necessitatibus sed accusantium numquam illo culpa id soluta nihil nemo suscipit.</p>
        </div>
      </div>
      <div v-if="activeRoute == 'Home'" class="row mt-4 d-flex justify-content-center">
        <div class="col-12 col-md-8 text-center">
          <a href="#" class="btn btn-dark mr-3">Artists</a>
          <a href="#" class="btn btn-outline-dark text-white">Read More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    activeRoute: String
  },
  data: function() {
    return {
      test: this.$route.name
    };
  }
};
</script>

<style scoped>
.showcase {
  background: url("../assets/showcase_webiste.jpg");
  background-size: cover !important;
  width: auto;
}
</style>