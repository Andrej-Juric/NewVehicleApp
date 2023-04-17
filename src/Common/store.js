import { observable } from "mobx";

const makeStore = observable({
  makes: [],

  addMake(make) {
    this.makes.push(make);
  },

  get makesCount() {
    return this.makes.length;
  },
});

export default makeStore;
