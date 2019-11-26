<template>
  <div>
    <div class="my-5 row justify-content-center">
      <ValidationObserver
        ref="observer"
        class="col-md-6"
        v-slot="{ invalid }"
        tag="form"
      >
        <div class="form-group">
          <label for="useremail">Email</label>
          <ValidationProvider
            name="電子信箱欄位"
            rules="required|email"
            v-slot="{ errors, invalid }"
          >
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.length > 0 }"
              name="email"
              id="useremail"
              v-model="form.user.email"
              placeholder="請輸入 Email"
              required
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <ValidationProvider
            name="姓名欄位"
            rules="required"
            v-slot="{ errors }"
          >
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.length > 0 }"
              name="name"
              id="username"
              v-model="form.user.name"
              placeholder="輸入姓名"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <ValidationProvider
            name="電話欄位"
            rules="required|numeric"
            v-slot="{ errors }"
          >
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors.length > 0 }"
              id="usertel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <ValidationProvider
            name="收件人地址欄位"
            rules="required"
            v-slot="{ errors }"
          >
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.length > 0 }"
              name="address"
              id="useraddress"
              v-model="form.user.address"
              placeholder="請輸入地址"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  props: ["formData"],
  data() {
    return {
      form: this.formData
    };
  }
};
</script>
