<template>
  <v-dialog v-model="dialog" fullscreen>
    <template #activator="{ on, attrs }">
      <v-card class="my-3" v-if="selected === null" v-on="on">
        <v-card-title>
          <span> 請選擇{{ item.name }}</span>
          <v-icon color="green" large right v-on="on" class="pt-1"
            >mdi-plus</v-icon
          >
        </v-card-title>
      </v-card>
      <v-card class="my-3" v-else>
        <v-card-title>請選擇{{ item.name }}</v-card-title>
        <v-card-actions>
          <v-container fluid>
            <v-row>
              <v-col>
                <div class="pl-4" style="width: 100%" v-on="on" v-bind="attrs">
                  {{ selected.name }}
                  <span v-if="selected.price > 0" class="additional-price">
                    +{{ selected.price }}
                    <v-btn small class="mr-1 ml-2">修改</v-btn>
                  </span>
                  <span v-else class="additional-price">
                    <v-btn small class="mr-1">修改</v-btn>
                  </span>
                </div>
              </v-col>
            </v-row>
            <v-row
              v-for="(selectedOption, i) in selected.options"
              :key="`selected-option-${i}`"
            >
              <v-col>
                <div class="pl-4" style="width: 100%" v-on="on" v-bind="attrs">
                  {{ selectedOption[0].name }}
                  <span
                    v-if="selectedOption[0].price > 0"
                    class="additional-price crust-additional"
                  >
                    +{{ selectedOption[0].price }}
                  </span>
                  <span v-else class="additional-price">
                    <v-btn small class="mr-1">修改</v-btn>
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </template>
    <v-card>
      <v-toolbar color="white">
        <v-toolbar-title class="font-weight-bold" v-if="selected === null">
          請選擇：{{ item.name }}
        </v-toolbar-title>
        <v-toolbar-title class="font-weight-bold" v-else>
          您選擇的產品是：{{ selected.name }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false" color="grey">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(option, i) in item.options"
            :key="`combo-item-option-${i}`"
            sm="4"
            md="3"
            lg="2"
          >
            <option-card @update="updateSelected" :option="option" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import OptionCard from "@/components/ProductOptionCard.vue";
import { ComboItem, ComboItemOption } from "@/typings/types";

@Component({
  components: { OptionCard },
})
export default class ProductOption extends Vue {
  @Prop({ type: Object, required: true }) item!: ComboItem;
  @Prop({ type: Object, default: null }) value!: ComboItemOption | null;

  mounted() {
    // this.selected = this.item.options ? this.item.options[0] : this.selected;
    if (this.selected === null) {
      return;
    }
    this.$emit("update");
  }

  dialog = false;
  selected: ComboItemOption | null = null;

  updateSelected(val: ComboItemOption) {
    this.selected = val;
    this.dialog = false;
    this.$emit("update");
    this.$emit("input", val);
  }
}
</script>

<style scoped lang="sass">
.v-dialog
  .v-card
    margin: 0
    .v-card__title
      padding-bottom: 24px
      text-align: left
      font-weight: 700
.additional-price
  display: inline-block
  float: right
.crust-additional
  margin-right: 66px
</style>
