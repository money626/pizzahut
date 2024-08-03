<template>
  <v-app>
    <app-bar></app-bar>
    <menu-drawer></menu-drawer>
    <cart-drawer></cart-drawer>

    <v-main style="height: 100vh">
      <v-container fluid id="main-container">
        <v-lazy>
          <router-view></router-view>
        </v-lazy>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { VAppBar } from "vuetify/lib/components";
import MenuDrawer from "@/components/MenuDrawer.vue";
import CartDrawer from "@/components/CartDrawer.vue";
import AppBar from "@/components/AppBar.vue";
import { importRules } from "@/util/formValidation";

importRules();

@Component({
  components: {
    AppBar,
    CartDrawer,
    MenuDrawer,
    VAppBar,
  },
})
export default class Index extends Vue {}
</script>

<style lang="sass">
.v-main
  font-family: "微軟正黑體",system-ui
.provider
  width: 100%
#main-container
  background: #f1f2f4 url(https://storage.googleapis.com/pizzahut-tw-web/static/style/background_2018.jpg) fixed right .25rem center !important
  min-height: 100%
.v-lazy
  min-height: 90vh
</style>
