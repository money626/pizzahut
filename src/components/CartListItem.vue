<template>
  <v-list-item class="pt-2">
    <v-row>
      <v-col cols="8" class="pr-0">
        <v-list-item-title class="font-weight-bold text-wrap text-h5">
          {{ product.name }}
        </v-list-item-title>
      </v-col>
      <v-col cols="4" class="text-end">
        <v-btn x-small class="mr-4" v-if="canModify">修改</v-btn>
        <!-- confirm remove cart item -->
        <v-dialog
          max-width="800"
          v-model="confirmRemoveDialog"
          v-if="canRemove"
        >
          <template #activator="{ on }">
            <v-btn icon x-small color="grey" dark v-on="on" id="remove-btn">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-btn
              icon
              absolute
              top
              right
              fab
              style="background-color: white"
              @click="confirmRemoveDialog = false"
            >
              <v-btn icon absolute class="ma-0">
                <v-icon size="30">mdi-close</v-icon>
              </v-btn>
            </v-btn>
            <v-card-title class="text-h4">
              確定要刪除「{{ product.name }}」嗎？
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#70a401"
                small
                min-width="80px"
                @click="remove"
                id="confirm-remove-btn"
              >
                確定
              </v-btn>
              <v-btn
                color="#70a401"
                small
                min-width="80px"
                @click="confirmRemoveDialog = false"
                >取消</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-list-item-content>
      <v-list class="pt-1 pl-1 pb-0">
        <v-list-item
          v-for="(item, j) in product.items"
          :key="`product-item-${j}`"
          class="py-0"
        >
          <v-list-item-title>{{ item.selected.name }}</v-list-item-title>
          <v-list-item-content class="py-1">
            <v-list class="py-0">
              <v-list-item
                v-for="(option, k) in item.selected.options"
                :key="`option-${k}`"
                class="py-1"
              >
                <v-list-item-title>{{ option.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="font-weight-bold text-h5">
        小計： <span class="float-right">$ {{ total() }}</span>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { OptionSelectedCombo } from "@/typings/types";

@Component({})
export default class CartListItem extends Vue {
  @Prop({ type: Object, required: true }) product!: OptionSelectedCombo;
  @Prop({ type: Boolean, default: true }) canModify!: boolean;
  @Prop({ type: Boolean, default: true }) canRemove!: boolean;

  confirmRemoveDialog = false;
  confirmModifyDialog = false;

  total() {
    return this.product.items.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.price +
        currentValue.selected.price +
        currentValue.selected.options.reduce((acc, curr) => {
          return acc + curr.price;
        }, 0)
      );
    }, this.product.price);
  }

  remove() {
    this.confirmRemoveDialog = false;
    this.$emit("remove");
  }
}
</script>

<style scoped lang="sass">
.v-list-item
  display: block
  min-height: 5px
::v-deep .v-dialog
  overflow: visible
</style>
