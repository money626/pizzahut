<template>
  <v-card class="card">
    <v-img :src="image_url" height="auto" width="100%"></v-img>
    <v-card-title class="title">
      {{ title }}
    </v-card-title>
    <v-card-text>
      {{ description }}
    </v-card-text>
    <v-card-actions>
      <v-btn color="#70a401" class="order-btn" width="100%" small>
        了解更多
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class ProductIntroCard extends Vue {
  image_url =
    "https://image.pizzahut.com.tw/dynamic/content/5e02a3747815ff85cf5a3085f7d38fdd.jpg";
  title = "北海道起司海鮮盛宴比薩";
  description = "外帶買大送大、外送買大送小(大 $850、小$600  )";
}
</script>

<style scoped lang="sass">
.title
  font-weight: bold
  font-family: "微軟正黑體", system-ui
  font-size: 1em!important
.order-btn
  color: aliceblue
  font-weight: bold
</style>
