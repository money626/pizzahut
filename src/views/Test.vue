<template>
  <select-location-card></select-location-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProductIntroCard from "@/components/ProductIntroCard.vue";
import AddToCart from "@/components/AddToCart.vue";
import SelectLocationCard from "@/components/SelectLocationCard.vue";

@Component({
  components: { SelectLocationCard, AddToCart, ProductIntroCard },
})
export default class Test extends Vue {
  get listWidth() {
    if (this.$vuetify.breakpoint.lgAndUp) {
      return 1024;
    }
    return this.$vuetify.breakpoint.width;
  }
}
</script>

<style lang="sass" scoped>
.product-list
  //width: 1024px
  //margin: 0 auto
.card-list-container
  max-width: 1024px
</style>
