<template>
  <v-list>
    <div v-for="(product, i) in cart" :key="`product-${i}`">
      <cart-list-item
        :product="product"
        @remove="remove(i)"
        :can-modify="false"
      ></cart-list-item>
      <v-divider v-if="cart.length !== i + 1" class="pb-2"></v-divider>
    </div>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartListItem from "@/components/CartListItem.vue";

@Component({
  components: { CartListItem },
})
export default class CartList extends Vue {
  remove(index: number) {
    this.cart.splice(index, 1);
  }

  get cart() {
    return this.$store.state.cart;
  }
}
</script>

<style scoped lang="sass"></style>
