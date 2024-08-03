<template>
  <item-group :item="item" text sub-group></item-group>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ItemGroup from "@/components/base/ItemGroup.vue";
import { IDrawerItem } from "@/typings/types";

@Component({
  components: { ItemGroup },
})
export default class ItemSubGroup extends Vue {
  @Prop({ type: Object }) item!: IDrawerItem;
}
</script>

<style scoped></style>
