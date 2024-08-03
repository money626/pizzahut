<template>
  <v-container fluid class="forgot-pass-container">
    <v-row>
      <text-divider>會員登入</text-divider>
    </v-row>
    <v-form @submit.prevent="submit">
      <v-row class="justify-center align-center pt-4">
        <v-col cols="2" class="mt-n5">
          <v-subheader class="float-right text-h3">帳號</v-subheader>
        </v-col>
        <v-col cols="10" class="pb-0">
          <v-text-field
            v-model="email"
            label="帳號"
            placeholder="請輸入會員帳號(信箱)"
            outlined
            dense
            persistent-placeholder
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-center align-center">
        <v-col cols="2" class="mt-n5">
          <v-subheader class="float-right text-h3">密碼</v-subheader>
        </v-col>
        <v-col cols="10">
          <v-text-field
            v-model="password"
            label="密碼"
            placeholder="請輸入會員密碼"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            outlined
            dense
            persistent-placeholder
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-start align-center pl-14">
        <v-col cols="2">
          <v-checkbox
            v-model="stayLogin"
            label="保持登入"
            color="black"
          ></v-checkbox>
        </v-col>

        <router-link to="/forgot">忘記密碼?</router-link>
      </v-row>
      <v-row class="pl-14">
        <v-col>
          <v-btn type="submit" width="100%" class="text-h4" color="#70a401">
            送出
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="justify-end align-center">
        <v-col class="text-end">
          還不是會員嗎?
          <router-link to="/register">加入會員</router-link>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TextDivider from "@/components/TextDivider.vue";
import { get_member_data, login } from "@/util/api";

@Component({
  components: { TextDivider },
})
export default class Login extends Vue {
  email = "";
  password = "";

  stayLogin = true;
  showPassword = false;

  async submit() {
    const data = await login(this.email, this.password);
    if (data.token !== undefined) {
      const member_data = await get_member_data();
      if (member_data.email === this.email) {
        await this.$router.push({ path: "/" });
      }
    }
  }
}
</script>

<style scoped lang="sass">
.forgot-pass-container
  max-width: 870px

::v-deep .theme--light.v-label
  color: black !important
</style>
