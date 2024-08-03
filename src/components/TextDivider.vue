<template>
  <v-container fluid>
    <v-row class="align-center">
      <div style="width: 3%"></div>
      <v-divider></v-divider>
      <div style="width: 3%"></div>
      <div
        class="font-weight-bold text-center"
        :style="`font-size: ${fontSize};`"
      >
        <slot></slot>
      </div>
      <div style="width: 3%"></div>
      <v-divider></v-divider>
      <div style="width: 3%"></div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class TextDivider extends Vue {
  @Prop({ type: String, default: "22px" }) fontSize!: string;
}
</script>

<style scoped></style>
