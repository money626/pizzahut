import { shallowMount, Wrapper } from "@vue/test-utils";
import TextDivider from "@/components/TextDivider.vue";

describe("TextDivider.vue", () => {
  test("text equals to default slot", () => {
    const wrapper = shallowMount(TextDivider, { slots: { default: "TEST" } });

    expect(wrapper.text()).toEqual("TEST");
  });

  test("default font size equals to 22px", () => {
    const wrapper = shallowMount(TextDivider, { slots: { default: "TEST" } });

    expect(
      getComputedStyle(
        wrapper.find("div.text-center").element
      ).getPropertyValue("font-size")
    ).toEqual("22px");
  });

  test("font size equals to propsData", () => {
    const wrapper: Wrapper<TextDivider & { [key: string]: any }> = shallowMount(
      TextDivider,
      { slots: { default: "TEST" }, propsData: { fontSize: "20vh" } }
    );

    expect(
      getComputedStyle(
        wrapper.find("div.text-center").element
      ).getPropertyValue("font-size")
    ).toEqual("20vh");
  });
});
