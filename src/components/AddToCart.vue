<template>
  <validation-observer v-slot="{ invalid }">
    <v-dialog
      v-model="dialog"
      max-width="640px"
      :fullscreen="$vuetify.breakpoint.width < 640"
      scrollable
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          color="#70a401"
          class="font-weight-bold"
          style="color: aliceblue"
          small
          :width="width"
        >
          訂購
        </v-btn>
      </template>

      <v-card v-if="combo !== null">
        <v-toolbar dark color="primary">
          <v-toolbar-title>選擇客製內容</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text style="height: 800px">
          <v-img :src="combo.imageUrl" max-width="640px" />
          <v-card-title class="pl-4">{{ combo.name }}</v-card-title>
          <v-card-subtitle class="mt-0"
            >{{ combo.description }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text class="text-right font-weight-bold">
            $ {{ combo.price }}
          </v-card-text>

          <validation-provider
            v-for="(item, index) in combo.items"
            :key="`item-${index}`"
            :name="`item-${index}`"
            rules="required"
            mode="aggressive"
          >
            <product-option
              :item="item"
              ref="options"
              @update="updateTotalPrice"
              v-model="selected[index]"
            ></product-option>
          </validation-provider>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="addToCart"
            color="#70a401"
            id="checkout"
            block
            :disabled="invalid"
          >
            <div class="text-no-wrap text-center">
              加入購物車
              <span id="checkout-btn__total">$ {{ total() }}</span>
            </div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </validation-observer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ProductOption from "@/components/ProductOption.vue";
import {
  Combo,
  ComboItem,
  ComboItemOption,
  OptionSelectedCombo,
  SelectedProductSubItem,
} from "@/typings/types";

import { ValidationObserver, ValidationProvider } from "vee-validate";
import { get_combo } from "@/util/api";

@Component({
  components: { ProductOption, ValidationObserver, ValidationProvider },
})
export default class AddToCart extends Vue {
  async mounted() {
    this.combo = await get_combo(this.id);
    console.log(this.combo);
  }

  @Prop({ type: Number, required: true }) id!: number;
  @Prop({ type: [Number, String], required: false, default: undefined })
  width?: number | string;

  selected: ComboItemOption[] = [];
  dialog = false;
  $refs!: {
    options?: ProductOption[];
  };

  combo: Combo | null = null;

  total(): number {
    if (this.$refs.options === undefined) {
      return 0;
    }

    return this.$refs.options.reduce((accumulator, currentValue) => {
      if (currentValue.selected === null) {
        return accumulator;
      }

      return (
        accumulator +
        currentValue.selected.price +
        currentValue.selected.options.reduce((acc, curr) => {
          return acc + curr[0].price;
        }, 0)
      );
    }, this.combo?.price ?? 0);
  }

  updateTotalPrice() {
    this.$forceUpdate();
  }

  comboToOptionSelectedCombo(val: Combo): OptionSelectedCombo {
    return {
      id: val.id,
      name: val.name,
      price: val.price,
      items: val.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          selected: {
            id: item.options[0].id,
            name: item.options[0].name,
            price: item.options[0].price,
            options: item.options[0].options.map((subOption) => {
              return {
                id: subOption[0].id,
                name: subOption[0].name,
                price: subOption[0].price,
              } as SelectedProductSubItem;
            }),
          },
        };
      }),
    };
  }

  addToCart() {
    if (this.$refs.options === undefined) {
      return;
    }
    if (this.combo === null) {
      return;
    }
    const selected = this.comboToOptionSelectedCombo({
      ...this.combo,
      items: this.$refs.options.map((option) => {
        let selectedOption = {
          ...option.item,
          options: [option.selected ?? option.item.options[0]],
        } as ComboItem;
        console.log(selectedOption);
        return selectedOption;
      }),
    });
    this.$store.commit("ADD_TO_CART", selected);
    this.$store.commit("SET_CART_DRAWER", { cartDrawer: true });
    this.dialog = false;
  }
}
</script>

<style scoped lang="sass">
.v-dialog
  .v-card
    margin: 0

    .v-card__title
      text-align: left
      font-weight: 700

.v-btn
  font-size: 16px !important
  margin-right: 0 !important

  #checkout-btn__total
    position: absolute
    right: 0
    font-weight: 700
</style>
