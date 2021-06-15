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
        <ul class="navbar-nav"></ul>
      </div>
    </nav>
    <hr class="bg-danger" />
    <h2 v-if="!!error" class="text-center">An error occured! {{ error }}</h2>
    <h2 class="text-center" v-if="isLoading">Authenticating...</h2>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3">
          <form
            @submit.prevent="formCheck"
            action="TheJoke.vue"
            class="mx-auto mt-5"
          >
            <div class="form-group">
              <label for="Email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter your username"
                v-model.trim="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model.trim="password"
                required
              />
            </div>
            <div class="form-group" v-if="mode === 'signup'">
              <label for="customFile">Choose a picture</label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                v-on:change="onFileChange"
              />
            </div>
            <p v-if="!formIsValid">
              Please enter a valid username and password(password must to be at
              least 6 characters).
            </p>
            <button class="btn btn-danger btn-block">
              {{ submitButtonCaption }}
            </button>
            <button
              type="button"
              @click="switchAuthMode"
              class="btn btn-danger btn-block"
            >
              {{ switchModeButtonCaption }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
      imageData: null,
      pictureurl: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.imageData = event.target.files[0];
    },
    async formCheck() {
      this.formIsValid = true;
      if (this.email === "" || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
        this.$router.replace("/search");
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try again later.";
      }
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.snapshot.ref.getDownloadURL().then((url) => {
        this.pictureurl = url;
      });
      //send data
      fetch(
        "https://movieapp-7442c-default-rtdb.europe-west1.firebasedatabase.app/userdatanew.json",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          //ide rakjuk be, hogy mit akarunk kuldeni a databaseba, de muszaj jsonna alakitani mert a firebase ezt varja el
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            img: this.imageData.name,
          }),
        }
      ) //ha 400-500hibauzenetet kapunk vmiert
        .then((response) => {
          if (response.ok) {
            //...
          } else {
            throw new Error("Could not save data");
          }
        }) //ez meg ha technikai hibak voltak a kodban
        .catch((error) => {
          console.log(error);
          this.error = error.message;
        });
      this.isLoading = false;
      this.inputValid = true;
      this.username = "";
      this.password = "";
    },

    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "SignUp";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "SignUp Instead";
      } else {
        return "Login Instead";
      }
    },
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
