<template>
  <div>
    <the-header></the-header>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-black">
        <li class="breadcrumb-item">
          <a href="#" class="text-danger">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Search</li>
      </ol>
    </nav>
    <h2 class="text-center mt-5 mb-3">
      Unlimited movies, TV Shows, and more..
    </h2>
    <form id="searchForm" @submit.prevent="submit">
      <keep-alive>
        <input
          type="text"
          class="form-control w-50 mx-auto mb-5"
          id="searchText"
          placeholder="Search..."
          v-model="movie"
        />
      </keep-alive>
    </form>
    <hr class="bg-danger" />
    <div class="container">
      <p v-if="toggle" class="display-3 w-75 mx-auto text-center">
        Are you searching for a movie? You are in the right place!
      </p>
    </div>
    <div class="d-flex flex-row">
      <button
        v-if="!toggle"
        class="btn btn-danger text-center mr-2"
        @click="sortingYear"
      >
        Sort By Date
      </button>
      <button
        v-if="!toggle"
        class="btn btn-danger text-center"
        @click="sortingTitle"
      >
        Sort By Title
      </button>
    </div>
    <div class="row mx-auto" id="movies">
      <div
        v-for="mov in movies"
        :key="mov.imdbID"
        class="col-lg-2 my-2 py-2 border"
      >
        <div class="text-center">
          <img :src="mov.Poster" alt="1" class="img-fluid" />
          <h5 class="mt-3">{{ mov.Title }}</h5>
          <p>{{ mov.Type }}</p>
          <p>{{ mov.Year }}</p>
          <router-link :to="`/search/${mov.imdbID}`" class="btn btn-danger">
            More Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "./TheHeader.vue";
export default {
  components: { TheHeader },
  data() {
    return { movie: "", movies: [], title: [], toggle: true, sorting: null };
  },
  mounted() {
    /* this.axios
      .get("http://www.omdbapi.com/?t=inception&apikey=b76b385c")
      .then((response) => (this.movie = response.data))
      .then((response) => console.log(response));
      */
  },
  methods: {
    submit() {
      let movieName = this.movie;
      this.getMovie(movieName);
    },
    getMovie(movieName) {
      this.axios
        .get(`http://www.omdbapi.com?s=${movieName}&apikey=b76b385c`)
        .then((response) => {
          console.log(response);
          console.log(response.data.Search.imdbID);
          this.movies = response.data.Search;
          console.log(this.movies.Title);
          this.movies.forEach((value) => {
            console.log(value);
            this.title.push(value.Title);
          });
          console.log(this.title);
        })

        //.then((response) => console.log(response.imdbID))
        //.then((response) => (this.movies = response.data.Search))
        .catch((err) => console.log(err));
      this.toggle = false;
    },
    sortingYear() {
      this.movies.sort((a, b) => {
        return new Date(a.Year) - new Date(b.Year);
      });
      return this.movies;
    },
    sortingTitle() {
      this.movies.sort((a, b) => {
        if (a.Title < b.Title) return -1;
        if (a.Title > b.Title) return 1;
        return 0;
      });
    },
  },
};
</script>

<style scoped>
#movies img {
  width: 350px;
  height: 350px;
}
.bg-danger {
  height: 8px;
}
.bg-black {
  background-color: black;
}
</style>
