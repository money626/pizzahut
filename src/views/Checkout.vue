<template>
  <v-container fluid class="checkout-form-container">
    <v-row class="pt-2">
      <text-divider>餐點內容</text-divider>
    </v-row>
    <div v-if="cart.length === 0">
      <v-list>
        <v-list-item>
          <v-list-item-content class="justify-center text-h4">
            您尚未購買任何餐點 !
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn
            color="#e9ebee"
            width="100%"
            class="black--text text-h4 font-weight-bold"
            to="/products"
          >
            新增餐點
          </v-btn>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>
      <validation-observer v-slot="{ invalid }" ref="observer" class="observer">
        <v-form @submit.prevent="submit">
          <v-row>
            <v-col>
              <v-list>
                <v-list-group>
                  <template #activator>
                    <v-list-item>
                      <v-list-item-title class="font-weight-bold text-h4">
                        餐點內容
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <cart-list class="px-5" ref="cartList"></cart-list>
                </v-list-group>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold text-h4 px-4">
                    總計金額 <span class="float-right">$ {{ total() }}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <text-divider>訂購資料</text-divider>
          <v-list class="checkout-data" v-if="location !== null">
            <v-list-item>
              <v-list-item-title>
                <span class="field-name">取餐方式</span>
                {{ location.type }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="location.type === '外帶'">
              <v-list-item-title>
                <span class="field-name">取餐門市</span>
                {{ location.store.name }}： {{ location.store.address }}，
                {{ location.store.phone }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-else>
              <v-list-item-title>
                <span class="field-name">送餐地址</span>
                {{ location.address }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-container fluid>
                  <v-row class="px-0">
                    <v-col class="px-0 pt-4">
                      <span class="red--text">*</span>
                      <span class="field-name">預計取餐時間</span>
                      {{ pickupDate }}
                    </v-col>
                    <v-col cols="8">
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <validation-provider
                            v-slot="{ errors, valid }"
                            name="time"
                            rules="required"
                          >
                            <v-text-field
                              class="pa-0 ma-0"
                              v-model="time"
                              label="Picker in menu"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              :success="valid"
                              :error-messages="errors"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </validation-provider>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="time"
                          :allowed-hours="(v) => v >= new Date().getHours()"
                          :allowed-minutes="(v) => v % 5 === 0"
                          format="24hr"
                          @click:minute="$refs.menu.save(time)"
                        >
                        </v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>

                <span> </span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="member_id !== null">
              <v-list-item-title>
                <span class="field-name">會員編號</span>
                {{ member_id }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-container>
                <v-row>
                  <v-list-item-title>
                    <span class="red--text">*</span>
                    <span class="field-name">訂購人</span>
                  </v-list-item-title>
                </v-row>
                <v-row>
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
              </v-container>
            </v-list-item>
            <v-list-item>
              <v-container>
                <v-row>
                  <v-list-item-title>
                    <span class="red--text">*</span>
                    <span class="field-name">電子信箱</span>
                  </v-list-item-title>
                </v-row>
                <v-row>
                  <!--   TODO: change maxlength to match db max           -->
                  <validation-provider
                    class="provider"
                    v-slot="{ errors, valid }"
                    name="email"
                    rules="required|email"
                  >
                    <v-text-field
                      name="email"
                      v-model="email"
                      outlined
                      dense
                      class="pt-2"
                      :success="valid"
                      :error-messages="errors"
                      hint="若您使用Yahoo、PChome、Hotmail信箱，可能會發生收不到訂單明細，或被歸類為垃圾信件的狀況，請盡量使用其他信箱。"
                      maxlength="100"
                      persistent-hint
                      required
                    ></v-text-field>
                  </validation-provider>
                </v-row>
              </v-container>
            </v-list-item>
            <v-list-item>
              <v-container>
                <v-row>
                  <v-list-item-title>
                    <span class="red--text">*</span>
                    <span class="field-name">手機</span>
                  </v-list-item-title>
                </v-row>
                <v-row>
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
              </v-container>
            </v-list-item>
            <v-list-item>
              <v-container>
                <v-row>
                  <v-list-item-title>
                    <span class="red--text">*</span>
                    <span class="field-name">發票類型</span>
                  </v-list-item-title>
                </v-row>
                <v-row>
                  <validation-provider
                    class="provider"
                    v-slot="{ errors, valid }"
                    name="carrierType"
                    rules="required"
                  >
                    <v-select
                      :items="carrierTypes"
                      v-model="carrierType"
                      :error-messages="errors"
                      :success="valid"
                      outlined
                      dense
                      :hide-details="carrierType !== '列印電子發票'"
                    ></v-select>
                  </validation-provider>
                </v-row>
                <v-row v-if="carrierType === '手機載具條碼'">
                  <validation-provider
                    class="provider"
                    v-slot="{ errors, valid }"
                    name="cellphone"
                    rules="required|carrier"
                  >
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
                      required
                    ></v-text-field>
                  </validation-provider>
                </v-row>
              </v-container>
            </v-list-item>

            <v-list-item>
              <v-container>
                <v-row>
                  <v-list-item-title>
                    <span class="field-name">備註</span>
                  </v-list-item-title>
                </v-row>
                <v-row>
                  <validation-provider
                    class="provider"
                    v-slot="{ errors, valid }"
                    name="note"
                    rules="max:40"
                  >
                    <v-textarea
                      v-model="comments"
                      outlined
                      class="pt-2"
                      maxlength="40"
                      clearable
                      :error-messages="errors"
                      :success="valid"
                      hint="備註欄限制40字以內<br>
完成訂購後，系統會自動發送確認簡訊至您訂購資料中所填寫的手機號碼。"
                      persistent-hint
                      counter
                      required
                    >
                      <template #message="{ message, key }">
                        <div v-html="message" :key="key"></div>
                      </template>
                    </v-textarea>
                  </validation-provider>
                </v-row>
              </v-container>
            </v-list-item>
          </v-list>
          <v-row>
            <v-col>
              <v-btn
                color="#70a401"
                width="100%"
                class="text-h4"
                type="submit"
                :disabled="invalid"
              >
                送出訂單
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartList from "@/components/CartList.vue";
import TextDivider from "@/components/TextDivider.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { new_order } from "@/util/api";
import { Route } from "vue-router";
import store from "@/store";
import "@/util/class-component-hooks";
import { combosTotalPrice } from "@/util/util";

const carrierType = ["列印電子發票", "手機載具條碼", "捐贈發票"] as const;

@Component({
  components: {
    TextDivider,
    CartList,
    ValidationProvider,
    ValidationObserver,
  },
})
export default class Checkout extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: any) {
    if (store.state.pickupInfo === null) {
      next({ path: "/", query: { showMessage: "1" } });
    }
    next();
  }

  mounted() {
    this.email = this.$store.state.memberData?.email ?? "";
    this.cellphone = this.$store.state.memberData?.cellphone ?? "";
    this.name = this.$store.state.memberData?.name ?? "";
    this.carrier = this.$store.state.memberData?.carrier ?? "";
  }

  $refs!: {
    observer: InstanceType<typeof ValidationObserver>;
  };

  menu2 = false;

  name = "";
  email = "";
  cellphone = "";
  carrier = "";
  comments = "";
  time = "";

  carrierTypes = carrierType;
  carrierType: typeof carrierType[number] = "列印電子發票";

  total() {
    return combosTotalPrice(this.cart);
  }

  get member_id() {
    return this.$store.state.memberData?.id;
  }

  get cart() {
    return this.$store.state.cart;
  }

  get location() {
    return this.$store.state.pickupInfo?.location;
  }

  get pickupDate() {
    return this.$store.state.pickupInfo?.pickupTime;
  }

  async submit() {
    this.$refs.observer.validate();
    const response = await new_order(
      this.email,
      this.name,
      this.member_id,
      {
        location: this.location,
        pickupTime: `${this.pickupDate} ${this.time}`,
      },
      this.carrier,
      this.cellphone,
      this.comments,
      this.cart
    );
    this.$store.commit("CLEAR_ORDER_DATA");
    await this.$router.push({ name: "訂單內容", params: { id: response } });
  }
}
</script>

<style scoped lang="sass">
.checkout-form-container
  max-width: 640px
  background-color: white
  min-height: 100%

.checkout-data
  .v-list-item__title
    font-size: 16px

    .field-name
      font-weight: 700

.outline-radio
  border: 1px solid rgba(0, 0, 0, 0.87)
  border-radius: 4px
</style>
