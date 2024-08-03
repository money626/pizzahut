<template>
  <v-card>
    <v-img :src="option.imageUrl" width="100%" />
    <v-card-title class="py-4 px-4 text-h4">
      {{ option.name }}
    </v-card-title>

    <v-card-text>{{ option.description }}</v-card-text>
    <v-card-actions>
      <v-container fluid>
        <v-row
          class="py-0"
          v-for="(subOption, i) in option.options"
          :key="`option-${i}`"
        >
          <v-col class="py-0">
            <!-- 修改label           -->
            <v-select
              v-model="selects[i]"
              :items="subOption"
              :item-text="itemText"
              label="請選擇餅皮"
              full-width
              dense
              return-object
              class="ma-0 py-0"
            />
          </v-col>
        </v-row>
        <v-row class="py-0 mt-0">
          <v-col>
            <v-btn
              color="#70a401"
              class="order-btn"
              width="100%"
              small
              @click="change"
            >
              更換
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ComboItemOption, ProductSubOption } from "@/typings/types";

@Component({})
export default class ProductOptionCard extends Vue {
  @Prop({ type: Object, required: true }) option!: ComboItemOption;
  mounted() {
    this.selects = this.option.options.map((item) => item[0]);
  }
  selects: ProductSubOption[] = [];

  itemText = (item: ProductSubOption) =>
    item.price === 0 ? item.name : `${item.name} +$ ${item.price}`;

  change() {
    let selected: ComboItemOption = {
      ...this.option,
      options: this.selects.map((item) => [item]),
    };
    this.$emit("update", selected);
  }
}
</script>

<style scoped lang="sass">
.v-card__title
  text-align: left !important
  font-weight: 700 !important
  font-size: 16px !important


.order-btn
  color: aliceblue
  font-weight: bold
</style>
