export default {
  set(data) {
    this.data = data;
  },
  get() {
    return this.data;
  },
  data: [],
  setRootView(rootView) {
    this.rootView = rootView;
  },
  getRootView() {
    return this.rootView;
  }
};
