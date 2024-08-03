<template>
  <v-container fluid class="card-list-container">
    <v-row offset-md="2">
      <v-col
        sm="12"
        md="6"
        lg="6"
        v-for="combo in combos"
        :key="combo.id"
        class="px-1 py-2"
      >
        <product-card
          :id="combo.id"
          :src="combo.imageUrl"
          :title="combo.name"
          :subtitle="combo.description"
        ></product-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProductCard from "@/components/ProductCard.vue";
import { ComboInfo } from "@/typings/types";
import { get_combos_info } from "@/util/api";

@Component({
  components: { ProductCard },
})
export default class ProductList extends Vue {
  async mounted() {
    this.combos = await get_combos_info();
  }
  combos: ComboInfo[] = [
    {
      id: 1,
      imageUrl:
        "https://image.pizzahut.com.tw/dynamic/products/e17a88dbbd89f9b89e90c6bcdaea7fd8.jpg?v=2",
      name: "外帶買大送大 ‧ 外送買大送小",
      description: "單點比薩外帶買大比薩送大比薩。以價高者計價。",
    },
  ];
}
</script>

<style scoped lang="sass">
.card-list-container
  max-width: 1024px
</style>
