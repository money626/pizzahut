<template>
  <v-container fluid>
    <v-snackbar timeout="-1" absolute top :value="snackbar">
      請先選擇取餐方式
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-row class="top" justify="center">
      <v-col cols="6" align="center">
        <select-location-card></select-location-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" align="center">
        <v-container fluid>
          <v-row class="text-h3" justify="center">熱門主打</v-row>
          <v-row justify="center">
            <v-carousel
              cycle
              hide-delimiters
              height="372px"
              style="width: 630px"
            >
              <v-carousel-item
                v-for="(carouselItem, i) in carouselItems"
                :key="`carousel-${i}`"
                :src="carouselItem.img"
                :href="carouselItem.to"
              >
              </v-carousel-item>
            </v-carousel>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SelectLocationCard from "@/components/SelectLocationCard.vue";
import { Route } from "vue-router";

interface CarouselItem {
  img: string;
  to: string;
}

interface CarouselItemGroup {
  previous: CarouselItem;
  current: CarouselItem;
  next: CarouselItem;
}

@Component({
  components: { SelectLocationCard },
})
export default class Home extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: any) {
    next((vm: Home) => {
      vm.snackbar = vm.$route.query.showMessage === "1";
    });
  }

  get carouselItemsGroups() {
    let myCarouselItemsGroups: CarouselItemGroup[] = [];
    const len = this.carouselItems.length;
    for (let i = 0; i < len; i++) {
      myCarouselItemsGroups.push({
        previous: this.carouselItems[(i - 1 + len) % len],
        current: this.carouselItems[i],
        next: this.carouselItems[(i + 1) % len],
      });
    }
    return myCarouselItemsGroups;
  }

  snackbar = false;

  carouselItems: CarouselItem[] = [
    {
      img: "https://image.pizzahut.com.tw/dynamic/ad/d833e03c628c0f550066191a56ce8cf0.jpg",
      to: "https://www.pizzahut.com.tw/promotions/?parent_id=2276&ppid=3047&fm=bt&urlname=homepage_m2_0614&fm=hpb&sq=2",
    },
    {
      img: "https://image.pizzahut.com.tw/dynamic/ad/6af08931b2259ff7f43d245a07f659cf.jpg",
      to: "https://www.pizzahut.com.tw/promotions/?parent_id=1648&ppid=958&fm=bt&urlname=homepage_m3_0614&fm=hpb&sq=3",
    },
    {
      img: "https://image.pizzahut.com.tw/dynamic/ad/2b1869c62946affcd9e48b6d01389976.jpg",
      to: "https://www.pizzahut.com.tw/promotions/?parent_id=1648&ppid=957&urlname=homepage_m4_0614&fm=hpb&sq=4",
    },
    {
      img: "https://image.pizzahut.com.tw/dynamic/ad/666328ae6a689e6937ccffc3b42cdff0.jpg",
      to: "https://www.pizzahut.com.tw/promotions/?parent_id=268&ppid=1165&urlname=homepage_m1_0614&fm=hpb&sq=1",
    },
  ];
}
</script>

<style scoped lang="sass">
.top
  width: 100%
  height: 380px
  background: url(https://image.pizzahut.com.tw/dynamic/ad/31787f4c795fb857d691c25fd6ef3847.jpg)
</style>
