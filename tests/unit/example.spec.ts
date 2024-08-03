import { createLocalVue, shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import SelectLocationCard from "@/components/SelectLocationCard.vue";
import Vuetify from "vuetify/lib";
import Vuex from "vuex";
import { stores } from "./fetchMockValues";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(stores),
  })
) as jest.Mock;

// const localVue = createLocalVue();
//
// localVue.use(Vuex);

describe("SelectLocationCard.vue", () => {
  it("should fetch store data", () => {
    const wrapper = shallowMount(SelectLocationCard);
    expect(fetch).toHaveBeenCalled();
  });
});
