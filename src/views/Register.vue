<template>
  <v-container fluid class="forgot-pass-container">
    <v-row>
      <v-img
        src="https://image.pizzahut.com.tw/static/members/campaign/pk_banner_rg_20100713.jpg"
        width="220px"
      ></v-img>
    </v-row>
    <v-row>
      <text-divider>加入會員</text-divider>
    </v-row>
    <validation-observer v-slot="{ invalid }" ref="form">
      <v-form @submit.prevent="submit">
        <v-row class="justify-center align-center pt-4">
          <v-col cols="2" class="mt-n5">
            <v-subheader class="float-right text-h3">信箱</v-subheader>
          </v-col>
          <v-col cols="10" class="pb-0">
            <validation-provider
              v-slot="{ errors, valid }"
              class="provider"
              name="email"
              rules="required|email|emailUsed"
            >
              <v-text-field
                v-model="email"
                label="信箱"
                placeholder="請輸入信箱"
                :error-messages="errors"
                :success="valid"
                :success-messages="valid ? ['此信箱可以使用'] : []"
                outlined
                dense
                persistent-placeholder
                validate-on-blur
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row class="justify-center align-center">
          <v-col cols="2" class="mt-n5">
            <v-subheader class="float-right text-h3">密碼</v-subheader>
          </v-col>
          <v-col cols="10">
            <validation-provider
              v-slot="{ errors, valid }"
              class="provider"
              name="password"
              rules="required"
              vid="password"
            >
              <v-text-field
                v-model="password"
                label="密碼"
                placeholder="請輸入密碼"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :success="valid"
                :error-messages="errors"
                outlined
                dense
                persistent-placeholder
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row class="justify-center align-center">
          <v-col cols="2" class="mt-n5">
            <v-subheader class="float-right text-h3">確認密碼</v-subheader>
          </v-col>
          <v-col cols="10">
            <validation-provider
              v-slot="{ errors, valid }"
              class="provider"
              name="confirmPassword"
              rules="required|confirmed:password"
              mode="aggressive"
            >
              <v-text-field
                v-model="confirmPassword"
                label="確認密碼"
                placeholder="請再次輸入密碼"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                :error-messages="errors"
                :success="valid"
                @click:append="showConfirmPassword = !showConfirmPassword"
                outlined
                dense
                persistent-placeholder
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row class="pl-14">
          <v-col>
            <v-btn
              type="submit"
              width="100%"
              class="text-h4"
              color="#70a401"
              :disabled="invalid"
            >
              註冊
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </validation-observer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TextDivider from "@/components/TextDivider.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { register } from "@/util/api";

@Component({
  components: { TextDivider, ValidationProvider, ValidationObserver },
})
export default class Register extends Vue {
  email = "";
  password = "";
  confirmPassword = "";

  showPassword = false;
  showConfirmPassword = false;

  async submit() {
    const success = await register(this.email, this.password);
    if (success) {
      await this.$router.push({ name: "登入" });
    }
  }
}
</script>

<style scoped lang="sass">
.forgot-pass-container
  max-width: 870px
</style>
