import { mount, } from "@vue/test-utils";
import App from "../../src/App.vue";
import Todo from "../../src/components/Todo.vue";

describe("App.vue", () => {
  test("renders title", () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain("TODO list");
  });

  test("renders todo component", () => {
    const wrapper = mount(App);
    const todoComponent = wrapper.findComponent(Todo);
    expect(todoComponent.exists()).toBeTruthy();
  });

  describe("calls", () => {
    test("clearList when clear button clicked", () => {
      const clearListMock = jest.spyOn(App.methods, "clearList");

      const wrapper = mount(App);
      const clearButton = wrapper.find("button.clear"); // this selector is not ideal - what happens if there are multiple buttons with the class 'clear'
      clearButton.trigger("click");
      expect(clearListMock).toHaveBeenCalled();
    });
  });
});
