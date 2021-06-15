<template>
  <div class="container mx-auto mt-5">
    <div class="row">
      <div class="col-lg-6 offset-lg-3">
        <h3>Registration</h3>
        <hr class="bg-danger" />
        <form @submit.prevent="formValidation">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            v-model="username"
          />
          <p v-if="invalidInput">Please enter an username!</p>
          <label for="password">Username</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
          />
          <p v-if="invalidInput">Please enter a password!</p>
          <button class="btn btn-danger btn-block mt-3">Register</button>
          <router-link
            to="/login"
            class="btn btn-outline-secondary btn-block mt-3"
          >
            Login Instead
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      invalidInput: false,
    };
  },
  methods: {
    formValidation() {
      if (this.username === "" || this.password === "") {
        this.invalidInput = true;
        return;
      }
      this.invalidInput = false;

      fetch(
        "https://movieapp-7442c-default-rtdb.europe-west1.firebasedatabase.app/userdata.json",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: this.username,
            password: this.password,
          }),
        }
      );

      this.username = "";
      this.password = "";
    },
  },
};
</script>
