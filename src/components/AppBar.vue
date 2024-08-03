<template>
  <v-app-bar id="app-bar" app height="50px" color="#fff">
    <v-app-bar-nav-icon @click="menuDrawer = true"></v-app-bar-nav-icon>
    <v-toolbar-title class="hidden-sm-and-down" v-text="$route.name" />
    <v-spacer></v-spacer>
    <router-link to="/">
      <v-img
        src="https://image.pizzahut.com.tw/static/logo/h_logo.png"
        max-width="137.31px"
        max-height="27px"
      />
    </router-link>
    <v-spacer></v-spacer>
    <v-btn icon to="/members">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn icon @click="cartDrawer = true">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class AppBar extends Vue {
  get cartDrawer() {
    return this.$store.state.cartDrawer;
  }

  set cartDrawer(val: boolean) {
    this.$store.commit("SET_CART_DRAWER", { cartDrawer: val });
  }

  get menuDrawer() {
    return this.$store.state.menuDrawer;
  }

  set menuDrawer(val: boolean) {
    this.$store.commit("SET_MENU_DRAWER", { menuDrawer: val });
  }
}
</script>

<style scoped lang="sass">
.v-toolbar__content
  .v-btn
    margin-right: 5px!important
</style>
