import Vue from "vue";
import Vuex from "vuex";
import { Member, OptionSelectedCombo, PickupInfo } from "@/typings/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuDrawer: false,
    cartDrawer: false,
    cart: Array<OptionSelectedCombo>(),
    memberData: null as Member | null,
    pickupInfo: null as PickupInfo | null,
    token: "",
  },
  getters: {
    menuDrawer: (state) => state.menuDrawer,
    cartDrawer: (state) => state.cartDrawer,
    cart: (state) => state.cart,
    memberData: (state) => state.memberData,
    pickupInfo: (state) => state.pickupInfo,
    token: (state) => state.token,
  },
  mutations: {
    // SET_MEMBER_DATA() {}

    SET_MENU_DRAWER(state, payload) {
      state.menuDrawer = payload.menuDrawer;
    },
    SET_CART_DRAWER(state, payload) {
      state.cartDrawer = payload.cartDrawer;
    },
    ADD_TO_CART(state, payload: OptionSelectedCombo) {
      state.cart.push(payload);
    },
    SET_PICKUP_INFO(state, payload: PickupInfo) {
      state.pickupInfo = payload;
    },
    CLEAR_ORDER_DATA(state) {
      state.cart = [];
      state.pickupInfo = null;
    },
    SET_TOKEN(state, payload) {
      state.token = payload.token;
    },
    SET_MEMBER_DATA(state, payload) {
      state.memberData = payload;
    },
  },
  actions: {},
  modules: {},
});
