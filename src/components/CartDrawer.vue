<template>
  <v-navigation-drawer
    mobile-breakpoint="960"
    app
    width="329"
    v-model="cartDrawer"
    right
  >
    <v-list dense nav>
      <v-list-item class="close-btn">
        <v-list-item-title class="text-h6">
          <v-btn
            @click="cartDrawer = false"
            color="grey"
            dark
            icon
            x-small
            class="close-drawer"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-title>
      </v-list-item>
      <text-divider>購物車</text-divider>
      <v-list-item v-if="cart.length === 0">
        <v-list-item-content class="justify-center text-h4">
          您尚未購買任何餐點 !
        </v-list-item-content>
        <v-btn
          color="#e9ebee"
          width="100%"
          class="black--text text-h4 font-weight-bold"
          @click="addProduct"
        >
          新增餐點
        </v-btn>
      </v-list-item>
      <cart-list></cart-list>
    </v-list>

    <template #append v-if="cart.length">
      <div class="pa-2">
        <v-btn to="/checkout" color="#70a401" id="checkout" block>
          <div class="text-no-wrap text-center">
            立即結帳
            <span id="checkout-btn__total">$ {{ total() }}</span>
          </div>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartList from "@/components/CartList.vue";
import TextDivider from "@/components/TextDivider.vue";
import "@/util/class-component-hooks";
import { combosTotalPrice } from "@/util/util";

@Component({
  components: { TextDivider, CartList },
})
export default class CartDrawer extends Vue {
  total() {
    return combosTotalPrice(this.cart);
  }

  addProduct() {
    this.$router.push("/products");
    this.cartDrawer = false;
  }

  get cart() {
    return this.$store.state.cart;
  }

  get cartDrawer() {
    return this.$store.state.cartDrawer;
  }

  set cartDrawer(val: boolean) {
    this.$store.commit("SET_CART_DRAWER", { cartDrawer: val });
  }
}
</script>

<style scoped lang="sass">
#checkout
  .text-no-wrap
    font-size: 16px
    width: 100%

    span
      height: 100%

#checkout-btn__total
  position: absolute
  right: 0

.v-list-item
  display: block
  min-height: 20px

.close-btn.v-list-item
  min-height: 30px
</style>
