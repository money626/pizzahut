<template>
  <v-container class="order-list-container">
    <v-list>
      <v-row class="text-center" v-if="orders.length === 0">
        <v-col>目前無訂單</v-col>
      </v-row>
      <div v-for="(order, index) in orders" :key="order.id">
        <v-row>
          <v-list-item
            class="pa-3"
            :to="{ name: '訂單內容', params: { id: order.id } }"
          >
            <v-list-item-content>
              <v-container fluid>
                <v-row>
                  <v-col> 訂單編號：{{ order.id }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="3"> 姓名： {{ order.name }}</v-col>
                  <v-col> 電子信箱： {{ order.email }}</v-col>
                  <v-col cols="3"> 電話：{{ order.phone }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="3"> 取餐時間： {{ order.pickupTime }}</v-col>
                  <v-col v-if="order.store === null"> 取餐方式：外送 </v-col>
                  <v-col v-else> 取餐方式：外帶 </v-col>
                  <v-col v-if="order.store === null">
                    地址：{{ order.address }}
                  </v-col>
                  <v-col v-else> 取餐店家：{{ order.store.name }} </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    備註：
                    {{ order.comments }}
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-row>
        <v-divider v-if="index !== orders.length - 1"></v-divider>
      </div>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { OrderData } from "@/typings/types";
import { get_member_orders, get_order_detail } from "@/util/api";
import { Route } from "vue-router";
import "@/util/class-component-hooks";
import store from "@/store";

@Component({})
export default class Orders extends Vue {
  async beforeRouteEnter(to: Route, from: Route, next: any) {
    if (store.state.memberData === null) {
      next("/login");
    }
    next();
  }
  async mounted() {
    this.orders = await get_member_orders();
  }

  orders: OrderData[] = [];
}
</script>

<style scoped lang="sass">
.order-list-container
  width: 1000px
  max-width: 1000px
</style>
