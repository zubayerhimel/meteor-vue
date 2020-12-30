import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Students = new Mongo.Collection("students");
export const Subjects = new Mongo.Collection("subjects");

Meteor.methods({
  addStudentsInfo(student) {
    return Students.insert(student);
  },
  deleteStudentInfo(studentId) {
    return Students.remove({ _id: studentId });
  },
  updateStudentInfo(student) {
    return Students.update(
      { _id: student._id },
      {
        $set: {
          name: student.name,
          email: student.email,
          phone_number: student.phone,
          date: student.date,
        },
      }
    );
  },
});
