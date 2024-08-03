<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    mobile-breakpoint="960"
    app
    width="260"
    v-model="drawer"
    temporary
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img v-bind="props" />
    </template>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-title>
          <v-btn
            @click="drawer = false"
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
      <v-divider />
    </v-list>
    <v-list expand nav>
      <div />
      <template v-for="(item, i) in menuItems">
        <item-group v-if="item.children" :key="`group-${i}`" :item="item" />
        <item v-else :key="`item-${i}`" :item="item" />
      </template>
    </v-list>
    <div />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { IDrawerItem } from "@/typings/types";
import ItemSubGroup from "@/components/base/ItemSubGroup.vue";
import Item from "@/components/base/Item.vue";
import ItemGroup from "@/components/base/ItemGroup.vue";

@Component({
  components: { ItemGroup, Item, ItemSubGroup },
})
export default class MenuDrawer extends Vue {
  menuItems: IDrawerItem[] = [
    { title: "首頁", icon: "mdi-view-dashboard", link: "/" },
    { title: "訂購產品", icon: "mdi-view-dashboard", link: "/products" },
    {
      title: "會員專區",
      icon: " mdi-account",
      link: "",
      children: [
        {
          title: "會員資訊",
          icon: "",
          link: "/members",
        },
        {
          title: "會員訂單",
          icon: "",
          link: "/orderList",
        },
      ],
    },
  ];
  barColor = "#4CAF50";

  get drawer() {
    return this.$store.state.menuDrawer;
  }

  set drawer(val: boolean) {
    this.$store.commit("SET_MENU_DRAWER", { menuDrawer: val });
  }
}
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'
.close-drawer
  float: right
#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
</style>
