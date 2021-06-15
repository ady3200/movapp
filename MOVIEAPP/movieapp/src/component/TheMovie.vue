<template>
  <div>
    <the-header></the-header>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-black">
        <li class="breadcrumb-item">
          <router-link to="/search" class="text-danger">Home</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/search" class="text-danger">Search</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ moviedetails.Title }}
        </li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-lg-6 text-center">
        <img :src="this.moviedetails.Poster" />
      </div>
      <div class="col-lg-6">
        <h2>{{ this.moviedetails.Title }}</h2>
        <hr class="bg-danger" />
        <p class="my-4">
          <span class="font-weight-bold text-danger">Genre:</span>
          {{ this.moviedetails.Genre }}
        </p>
        <p class="my-4">
          <span class="font-weight-bold text-danger">Year:</span>
          {{ this.moviedetails.Year }}
        </p>
        <p class="my-4">
          <span class="font-weight-bold text-danger">Language:</span>
          {{ this.moviedetails.Language }}
        </p>
        <p class="my-4">
          <span class="font-weight-bold text-danger">Actors:</span>
          {{ this.moviedetails.Actors }}
        </p>
        <p class="my-4">
          <span class="font-weight-bold text-danger">Plot:</span>
          {{ this.moviedetails.Plot }}
        </p>
        <p class="my-4">
          <span class="font-weight-bold text-danger">Director:</span>
          {{ this.moviedetails.Director }}
        </p>
        <p class="my-4">
          <span class="font-weight-bold text-danger">Writer:</span>
          {{ this.moviedetails.Writer }}
        </p>
        <p class="my-4">
          <span class="font-weight-bold text-danger">IMDB Rating:</span>
          {{ this.moviedetails.imdbRating }}
        </p>
        <div class="star-widget d-flex flex-row">
          <input type="radio" name="rate" id="rate-1" />
          <label for="rate-1" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-2" />
          <label for="rate-2" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-3" />
          <label for="rate-3" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-4" />
          <label for="rate-4" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-5" />
          <label for="rate-5" class="fas fa-star"></label>
        </div>
      </div>
    </div>
    <hr class="bg-danger" />
  </div>
</template>

<script>
import TheHeader from "./TheHeader.vue";

export default {
  components: { TheHeader },
  data() {
    return {
      moviedetails: "",
    };
  },
  created() {
    this.axios
      .get(`http://www.omdbapi.com?i=${this.$route.params.id}&apikey=b76b385c`)
      .then((response) => {
        console.log(response);
        this.moviedetails = response.data;
        console.log(this.moviedetails);
      })
      .catch((err) => console.log(err));
  },
  methods: {},
  computed: {},
};
</script>

<style>
.star-widget input {
  display: none;
}
.star-widget label {
  font-size: 20px;
  color: #444;
  padding: 10px;
  transition: all 0.2 ease;
  float: left;
}
input:not(:checked) ~ label:hover,
input:not(:checked) ~ label:hover ~ label {
  color: #fd4;
}
input:checked ~ label {
  color: #fd4;
}
input#rate-1:checked ~ label {
  color: #fe7;
  text-shadow: 0 0 20px #952;
}
.bg-black {
  background-color: black;
}
</style>
