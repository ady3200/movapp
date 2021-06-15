<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand  font-weight-bold" href="#"
        ><img src="../img/ka.jpg" alt="ka" class="img-fluid ka" /> KA Films</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/search" class="nav-link text-danger" href="#"
              >Home</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">Email: {{ email }}</a>
          </li>
          <li class="nav-item">
            <router-link @click="logout" to="/login" class="nav-link" href="#"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <hr class="bg-danger" />
  </div>
</template>

<script>
//import firebase from "firebase";
export default {
  data() {
    return {
      id: "",
      email: "",
      password: "",
      //  url: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    getData() {
      fetch(
        "https://movieapp-7442c-default-rtdb.europe-west1.firebasedatabase.app/userdatanew.json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          for (const id in data) {
            (this.id = id),
              (this.email = data[id].email),
              (this.password = data[id].password);
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.error = "Failed to fetch data. Please try again later.";
        });
    },
  },
  mounted() {
    //  firebase
    //  .storage()
    //  .ref(this.results.img)
    //  .getDownloadURL()
    //  .then((url) => {
    //    this.url = url;
    //  });
    this.getData();
  },
};
</script>
<style scoped>
.bg-danger {
  height: 8px;
}
.ka {
  width: 40px;
  height: 40px;
}
</style>
