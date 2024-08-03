<template>
  <v-list-item
    :to="item.link"
    :active-class="`primary ${!isDark ? 'black' : 'white'}--text`"
  >
    <v-list-item-icon v-if="item.icon">
      <v-icon v-text="item.icon" />
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title v-text="item.title" />
      <!--      <v-list-item-subtitle v-text="item.subtitle" />-->
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IDrawerItem } from "@/typings/types";

@Component({})
export default class Item extends Vue {
  @Prop({ type: Object, required: true }) item!: IDrawerItem;
  @Prop({ type: Boolean, default: false }) text!: boolean;

  isDark = true;
}
</script>

<style scoped></style>
