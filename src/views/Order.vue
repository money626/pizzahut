<template>
  <v-container fluid class="order-container">
    <v-list v-if="order !== null">
      <div v-for="(product, i) in order.products" :key="`product-${i}`">
        <cart-list-item
          :product="product"
          :can-modify="false"
          :can-remove="false"
        ></cart-list-item>
        <v-divider
          v-if="order.products.length !== i + 1"
          class="pb-2"
        ></v-divider>
      </div>
      <v-list-item>
        <v-list-item-title class="font-weight-bold text-h4">
          總計金額 <span class="float-right">$ {{ total }}</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <span class="field-name">訂單編號：</span>
          {{ order.id }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>
          <span class="field-name">訂餐者姓名：</span>
          {{ order.name }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <span class="field-name">信箱：</span>
          {{ order.email }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <span class="field-name">電話：</span>
          {{ order.phone }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <span class="field-name">取餐時間：</span>
          {{ pickupTime }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <span class="field-name">備註：</span>
          {{ order.comments }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "@/util/class-component-hooks";
import CartListItem from "@/components/CartListItem.vue";
import { FullOrderData } from "@/typings/types";
import { Route } from "vue-router";
import { get_order_detail } from "@/util/api";
import { combosTotalPrice } from "@/util/util";

@Component({
  components: { CartListItem },
})
export default class Order extends Vue {
  async beforeRouteEnter(to: Route, from: Route, next: any) {
    const order = await get_order_detail(parseInt(to.params.id));
    next((vm: Order) => (vm.order = order));
  }

  order: FullOrderData | null = null;

  get total() {
    if (this.order === null) return 0;
    return combosTotalPrice(this.order.products);
  }

  get pickupTime() {
    if (this.order === null) return null;
    const time = new Date(this.order.pickupTime);
    return `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日 ${time.getHours()}:${time.getMinutes()}`;
  }
}
</script>

<style scoped lang="sass">
.field-name
  font-weight: 700
.order-container
  max-width: 640px
  background-color: white
  min-height: 100%
</style>
