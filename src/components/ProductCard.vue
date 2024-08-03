<template>
  <v-card @click="click">
    <v-img :src="src" width="100%" />
    <v-card-title class="title text-h4">
      {{ title }}
      <v-spacer></v-spacer>
      <add-to-cart
        width="70px"
        class="order-btn"
        ref="addToCart"
        :id="id"
      ></add-to-cart>
    </v-card-title>

    <v-card-text>{{ subtitle }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AddToCart from "@/components/AddToCart.vue";

@Component({
  components: { AddToCart },
})
export default class ProductCard extends Vue {
  $refs!: {
    addToCart: AddToCart;
  };
  @Prop({ type: Number, required: true }) id!: number;
  @Prop({ type: String, required: true }) src!: string;
  @Prop({ type: String, required: true }) title!: string;
  @Prop({ type: String, required: true }) subtitle!: string;

  click() {
    this.$refs.addToCart.dialog = true;
  }
}
</script>

<style scoped lang="sass">
.title
  font-weight: bold
  font-family: "微軟正黑體", system-ui

.order-btn
  margin-right: 0 !important
</style>
