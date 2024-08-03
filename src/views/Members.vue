<template>
  <v-container fluid class="member-container">
    <div v-if="memberData === null">
      <v-row>
        <v-spacer></v-spacer>
        <v-col>
          <v-img
            src="https://image.pizzahut.com.tw/static/members/pk_logo20220525.png"
            width="300px"
          ></v-img>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-col>
          <v-btn width="100%" color="#C8102E" to="/login">會員登入</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn width="100%" color="#C8102E" to="/register">加入會員</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <validation-observer v-slot="{ invalid }">
        <v-form @submit.prevent="update_data">
          <v-row> 電子信箱： {{ memberData.email }}</v-row>
          <v-row>
            姓名：
            <validation-provider
              class="provider"
              v-slot="{ errors, valid }"
              name="name"
              rules="required"
            >
              <v-text-field
                v-model="name"
                outlined
                dense
                class="pt-2"
                maxlength="20"
                counter
                :error-messages="errors"
                :success="valid"
              ></v-text-field>
            </validation-provider>
          </v-row>
          <v-row>
            <validation-provider
              class="provider"
              v-slot="{ errors, valid }"
              name="cellphone"
              rules="carrier"
            >
              <span>載具：</span>
              <v-text-field
                v-model="carrier"
                @keyup="carrier = carrier.toUpperCase()"
                outlined
                dense
                class="pt-2"
                maxlength="7"
                :error-messages="errors"
                :success="valid"
                prefix="/"
              ></v-text-field>
            </validation-provider>
          </v-row>
          <v-row>
            電話：
            <validation-provider
              class="provider"
              v-slot="{ errors, valid }"
              name="cellphone"
              rules="required|cellphone"
            >
              <v-text-field
                v-model="cellphone"
                outlined
                dense
                class="pt-2"
                maxlength="10"
                :error-messages="errors"
                :success="valid"
                required
              ></v-text-field>
            </validation-provider>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                color="#70a401"
                width="100%"
                class="text-h4"
                type="submit"
                :disabled="invalid"
              >
                更新資訊
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { update_member_data } from "@/util/api";

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class Members extends Vue {
  mounted() {
    this.name = this.memberData?.name ?? "";
    this.email = this.memberData?.email ?? "";
    this.cellphone = this.memberData?.cellphone ?? "";
    this.carrier = this.memberData?.carrier ?? "";
  }

  name = "";
  email = "";
  cellphone = "";
  carrier = "";

  get memberData() {
    return this.$store.state.memberData;
  }

  async update_data() {
    const carrier = this.carrier === "" ? null : this.carrier;
    const data = await update_member_data(this.name, this.cellphone, carrier);
  }
}
</script>

<style scoped lang="sass">
.member-container
  max-width: 439px

.v-btn
  margin: 0 !important
</style>
