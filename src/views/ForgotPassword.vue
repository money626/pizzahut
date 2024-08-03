<template>
  <v-container fluid class="forgot-pass-container">
    <v-row>
      <text-divider>忘記密碼</text-divider>
    </v-row>
    <validation-observer v-slot="{ invalid }" ref="form">
      <v-form @submit.prevent="verifyEmail">
        <v-row class="justify-center align-center pt-4">
          <v-col cols="2" class="mt-n5">
            <v-subheader class="float-right text-h3">帳號</v-subheader>
          </v-col>
          <v-col cols="10" class="pb-0">
            <validation-provider
              v-slot="{ errors, valid }"
              class="provider"
              name="email"
              rules="email|required"
            >
              <v-text-field
                v-model="email"
                label="帳號"
                placeholder="請輸入會員帳號(信箱)"
                :error-messages="errors"
                :success="valid"
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
              確定
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
import { emailUsed } from "@/util/api";

@Component({
  components: { TextDivider, ValidationObserver, ValidationProvider },
})
export default class ForgotPassword extends Vue {
  email = "";

  async verifyEmail() {
    console.log(await emailUsed(this.email));
  }
}
</script>

<style scoped lang="sass">
.forgot-pass-container
  max-width: 870px
</style>
