<template>
  <v-card max-width="750px">
    <v-card-actions>
      <v-container>
        <validation-observer v-slot="{ invalid }">
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <validation-provider
                      v-slot="{ errors, valid }"
                      name="pickupDate"
                      rules="required"
                    >
                      <v-text-field
                        v-model="dateFormatted"
                        label="送達日期"
                        :hide-details="errors.length === 0"
                        readonly
                        prepend-icon="mdi-calendar"
                        :success="valid"
                        :error-messages="errors"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </validation-provider>
                  </template>

                  <v-date-picker
                    v-model="date"
                    :allowed-dates="allowedDates"
                    no-title
                    locale="zh-cn"
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <validation-provider
                  v-slot="{ errors, valid }"
                  name="locationType"
                  rules="required"
                >
                  <v-select
                    :items="locationTypes"
                    v-model="locationType"
                    outlined
                    :hide-details="errors.length === 0"
                    dense
                    :error-messages="errors"
                    :success="valid"
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col v-if="locationType === '外送'" cols="9">
                <validation-provider
                  v-slot="{ errors, valid }"
                  name="address"
                  rules="required"
                >
                  <v-text-field
                    v-model="address"
                    label="外送地址"
                    outlined
                    :hide-details="errors.length === 0"
                    flat
                    dense
                    :error-messages="errors"
                    :success="valid"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col v-if="locationType === '外帶'" cols="4">
                <v-select
                  outlined
                  hide-details
                  flat
                  dense
                  :items="cityOptions"
                  v-model="city"
                ></v-select>
              </v-col>
              <v-col v-if="locationType === '外帶'" cols="4">
                <v-select
                  outlined
                  hide-details
                  dense
                  :items="districtOptions"
                  v-model="district"
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="locationType === '外帶'">
              <v-col>
                <validation-provider
                  v-slot="{ errors, valid }"
                  name="store"
                  rules="required"
                >
                  <v-select
                    v-model="store"
                    :items="storeOptions"
                    outlined
                    return-object
                    :hide-details="errors.length === 0"
                    item-text="name"
                    :error-messages="errors"
                    :success="valid"
                  >
                    <template #item="{ item, on, attrs }">
                      <v-list-item
                        three-line
                        class="select-item"
                        v-on="on"
                        v-bind="attrs"
                      >
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold text-h4">
                            {{ item.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.address }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            <v-icon small>mdi-phone</v-icon>
                            {{ item.phone }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <template #selection="{ item, on, attrs }">
                      <v-list-item
                        two-line
                        class="select-item"
                        v-on="on"
                        v-bind="attrs"
                      >
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold text-h4">
                            {{ item.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.address }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-select>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="3">
                <v-btn
                  color="#70A401"
                  width="100%"
                  class="text-h3"
                  type="submit"
                  :disabled="invalid"
                >
                  前往訂餐
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-form>
        </validation-observer>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { get_stores } from "@/util/api";
import {
  Store,
  locationTypes,
  locationType,
  PickupInfo,
} from "@/typings/types";
import { ValidationObserver, ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class SelectLocationCard extends Vue {
  async mounted() {
    this.locationType = "外帶";
    this.stores = await get_stores();
    this.cityOptions = [...new Set(this.stores.map((item) => item.city))];
    this.city = this.stores[0].city;
    this.district = this.stores[0].district;
  }

  menu1 = false;
  dateFormatted = "";
  date = "";

  locationTypes = locationTypes;
  locationType: locationType = "外送";
  address = "";
  store: Store | null = null;

  city = "";
  cityOptions: string[] = [];

  district = "";

  get districtOptions() {
    return this.stores
      .filter((item) => item.city === this.city)
      .map((item) => item.district);
  }

  @Watch("districtOptions")
  watchDistrictOptions() {
    this.district = this.districtOptions[0];
    this.store = null;
  }

  get storeOptions() {
    return this.stores.filter(
      (item) => item.city === this.city && item.district === this.district
    );
  }

  stores: Store[] = [];

  @Watch("date")
  watchDate() {
    this.dateFormatted = this.formatDate(this.date);
  }

  allowedDates(val: string) {
    const today = new Date(new Date().toLocaleDateString());
    const twoWeekAfter = new Date(today);
    twoWeekAfter.setDate(today.getDate() + 14);
    const valDate = new Date(val);
    return valDate >= today && valDate <= twoWeekAfter;
  }

  formatDate(date: string) {
    if (!date) return "";
    let dateObj = new Date(date);
    const today = new Date(new Date().toLocaleDateString());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [month, day] = [dateObj.getMonth(), dateObj.getDate()];
    const weekday = ["日", "一", "二", "三", "四", "五", "六"][
      dateObj.getDay()
    ];
    if (dateObj.valueOf() - today.valueOf() === 28800000) {
      return `今天，${month}月${day}日（${weekday}）`;
    } else if (dateObj.valueOf() - tomorrow.valueOf() === 28800000) {
      return `明天，${month}月${day}日（${weekday}）`;
    }
    return `${month}月${day}日（${weekday}）`;
  }

  async submit() {
    this.$store.commit("SET_PICKUP_INFO", {
      pickupTime: this.date,
      location:
        this.locationType === "外送"
          ? {
              type: this.locationType,
              address: this.address,
            }
          : {
              type: this.locationType,
              store: this.store,
            },
    } as PickupInfo);
    await this.$router.push("/products");
  }
}
</script>

<style lang="sass">
.v-date-picker-header
  .v-btn
    color: rgba(0, 0, 0, 0.54) !important
    background-color: white !important

.select-item
  height: 64px
  font-size: 16px
</style>
