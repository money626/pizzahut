import { createLocalVue, mount, shallowMount, Wrapper } from "@vue/test-utils";
import TextDivider from "@/components/TextDivider.vue";
import CartListItem from "@/components/CartListItem.vue";
import flushPromises from "flush-promises";
import SelectLocationCard from "@/components/SelectLocationCard.vue";
import Vuetify from "vuetify/lib";
import { TRUE } from "sass";

const productData = {
  id: 5,
  name: "單點買大送小送好禮-外送",
  price: 0,
  items: [
    {
      id: 1,
      name: "1個大比薩",
      price: 0,
      selected: {
        id: 1,
        name: "哈辣墨西哥比薩-大",
        price: 595,
        options: [{ id: 1, name: "熔岩起司漢堡餅皮", price: 120 }],
      },
    },
    {
      id: 2,
      name: "1個小比薩",
      price: 0,
      selected: {
        id: 5,
        name: "和風章魚燒-小",
        price: 0,
        options: [{ id: 10, name: "熔岩起司漢堡餅皮", price: 120 }],
      },
    },
  ],
};

describe("CartListItem.vue", () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should calculate price of product correctly", async () => {
    const wrapper: Wrapper<CartListItem & { [key: string]: any }> =
      shallowMount(CartListItem, {
        propsData: { product: productData },
      });
    expect(wrapper.vm.total()).toBe(835);
  });

  it("should have modify btn if canModify is true", async () => {
    const wrapper: Wrapper<CartListItem & { [key: string]: any }> =
      shallowMount(CartListItem, {
        propsData: { product: productData },
      });
    expect(wrapper.text()).toContain("修改");

    wrapper.setProps({ canModify: false });
    await flushPromises();
    expect(wrapper.text()).not.toContain("修改");
  });

  it("should have mdi-close btn if canRemove is true", async () => {
    const wrapper: Wrapper<CartListItem & { [key: string]: any }> =
      shallowMount(CartListItem, {
        propsData: { product: productData },
      });
    expect(wrapper.text()).toContain("mdi-close");

    await wrapper.setProps({ canRemove: false });
    expect(wrapper.text()).not.toContain("mdi-close");
  });

  it("should", async () => {
    const App = localVue.component("App", {
      components: { CartListItem },
      template: `
        <div data-app>
        <CartListItem :product="product" />
        </div>
      `,
      data() {
        return {
          product: productData,
        };
      },
    });
    const wrapper = mount(App, { localVue, vuetify, attachTo: document.body });
    const cartListItem: Wrapper<CartListItem & { [key: string]: any }> =
      wrapper.findComponent(CartListItem) as Wrapper<
        CartListItem & { [key: string]: any }
      >;
    expect(cartListItem.vm.confirmRemoveDialog).toBe(false);

    await cartListItem.find("#remove-btn").trigger("click");
    await cartListItem.vm.$nextTick();
    expect(cartListItem.vm.confirmRemoveDialog).toBe(true);
    expect(cartListItem.emitted().remove).not.toBeTruthy();

    await cartListItem.find("#confirm-remove-btn").trigger("click");
    expect(cartListItem.emitted().remove).toBeTruthy();
  });
});
