import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Students } from "./Models";

if (Meteor.isServer) {
  describe("Students", () => {
    describe("methods", () => {
      const userId = Random.id();
      let studentId;
      beforeEach(() => {
        Students.remove({});
        studentId = Tasks.insert({
          name: "John doe",
          email: "john@gmail.com",
          phone_number: 488339543,
          date: "2020-2-19",
        });
      });
    });
  });
}
