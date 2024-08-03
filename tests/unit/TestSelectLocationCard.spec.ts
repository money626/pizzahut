import { shallowMount, Wrapper } from "@vue/test-utils";
import SelectLocationCard from "@/components/SelectLocationCard.vue";
import { stores } from "./fetchMockValues";
import flushPromises from "flush-promises";
import VueRouter from "vue-router";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(stores),
  })
) as jest.Mock;

describe("SelectLocationCard.vue", () => {
  it("should fetch stores data and filter store options", async () => {
    const wrapper: Wrapper<SelectLocationCard & { [key: string]: any }> =
      shallowMount(SelectLocationCard);
    await flushPromises();

    expect(fetch).toHaveBeenCalled();
    expect(wrapper.vm.stores).toEqual(stores.data);
    expect(wrapper.vm.city).toEqual("台北市");
    expect(wrapper.vm.district).toEqual("士林區");
    expect(wrapper.vm.cityOptions).toEqual(["台北市", "新北市"]);
    expect(wrapper.vm.districtOptions).toEqual(["士林區", "大同區"]);
  });

  it("should change district options and set store to null when city changed", async () => {
    const wrapper: Wrapper<SelectLocationCard & { [key: string]: any }> =
      shallowMount(SelectLocationCard);
    await flushPromises();

    wrapper.setData({ store: wrapper.vm.storeOptions[0] });

    expect(wrapper.vm.store).toEqual(stores.data[0]);

    wrapper.setData({ city: "新北市" });
    wrapper.vm.watchDistrictOptions();

    expect(wrapper.vm.store).toEqual(null);
    expect(wrapper.vm.districtOptions).toEqual(["八里區"]);
    expect(wrapper.vm.district).toEqual("八里區");
  });

  it("should be pushed to products after submit", async () => {
    const router = new VueRouter();
    const commit = jest.fn();
    const $store = { commit };

    const wrapper: Wrapper<SelectLocationCard & { [key: string]: any }> =
      shallowMount(SelectLocationCard, {
        router,
        mocks: { $store },
      });
    await wrapper.vm.submit();
    await flushPromises();
    expect(commit).toBeCalled();
    expect(wrapper.vm.$route.path).toEqual("/products");
  });
});
