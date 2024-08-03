<template>
  <v-list-group
    :group="group"
    :prepend-icon="item.icon"
    :sub-group="subGroup"
    append-icon="mdi-menu-down"
    :color="
      $vuetify.theme.themes[isDark ? 'dark' : 'light'] !==
      'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'
        ? 'white'
        : 'grey darken-1'
    "
  >
    <template #activator>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </template>

    <ul>
      <template v-for="(child, i) in children">
        <item-sub-group
          v-if="child.children"
          :key="`sub-group-${i}`"
          :item="child"
        />
        <li v-else :key="`item-${i}`">
          <item :item="child" text />
        </li>
      </template>
    </ul>
  </v-list-group>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Item from "@/components/base/Item.vue";
import ItemSubGroup from "@/components/base/ItemSubGroup.vue";
import { IDrawerItem } from "@/typings/types";

@Component({
  components: { ItemSubGroup, Item },
})
export default class ItemGroup extends Vue {
  @Prop({ type: Object }) item!: IDrawerItem;
  @Prop({ type: Boolean, default: false }) subGroup!: boolean;
  @Prop({ type: Boolean, default: false }) text!: boolean;

  get children() {
    return this.item.children?.map((item) => ({
      ...item,
      link: !item.link ? undefined : item.link,
    }));
  }

  get group() {
    if (this.item.children) {
      return this.genGroup(this.item.children);
    }
    return undefined;
  }

  genGroup(children: IDrawerItem[]) {
    // TODO: fix function
    return children
      .filter((item) => item.link)
      .map((item) => {
        const parent = item.group || this.item.group;
        let group = `${parent}/`;

        if (item.children) {
          group = `${group}|${this.genGroup(item.children)}`;
        }

        return group;
      })
      .join("|");
  }

  isDark = false;
}
</script>

<style scoped lang="sass">
.v-list-group__activator
  p
    margin-bottom: 0

li
  list-style: none
  margin-left: 30px
  padding-left: 0
</style>
