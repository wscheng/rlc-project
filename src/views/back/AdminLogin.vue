<template>
  <div class="admin-login text-center" style="background-color: #f1ede9;">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">管理者登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      />
      <button class="btn btn-lg btn-block btn-primary" type="submit">登入</button>
      <router-link
        :to="{ name: 'Home'}"
        style="background-color: #a6bbc2"
        class="btn btn-lg btn-info btn-block"
      >回到前台</router-link>
      <p class="mt-5 mb-3 text-muted">
        &copy; Copyright
        2019- RLC
        <a href="mailto:maxmaman@gmail.com">wscheng</a>
      </p>
    </form>
  </div>
</template>

<script>
import Vue from "vue";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      const api = `${Vue.prototype.$_API_SITE}/admin/signin`;
      console.warn("api=", api);
      const vm = this;
      this.$http.post(api, vm.user).then(response => {
        console.warn(response.data);
        if (response.data.success) {
          vm.$router.push("/admin/product");
        }
      });
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.admin-login {
  height: 100vh;
  padding-top: 10vh;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
