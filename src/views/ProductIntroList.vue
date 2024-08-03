<template>
  <v-container fluid class="card-list-container">
    <v-row>
      <v-col
        xs="6"
        sm="6"
        md="3"
        lg="3"
        v-for="i in 10"
        :key="i"
        class="px-1 py-2"
      >
        <product-intro-card></product-intro-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProductIntroCard from "@/components/ProductIntroCard.vue";

@Component({
  components: { ProductIntroCard },
})
export default class ProductIntroList extends Vue {}
</script>

<style scoped lang="sass">
.card-list-container
  max-width: 1024px
</style>
