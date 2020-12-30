import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Students = new Mongo.Collection("students");
export const Subjects = new Mongo.Collection("subjects");

Meteor.methods({
  // Students
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

  // Subjects
  addSubjectInfo(subject) {
    return Subjects.insert(subject);
  },
  deleteSubjectInfo(subjectId) {
    return Subjects.remove({ _id: subjectId });
  },
  updateSubjectInfo(subject) {
    return Subjects.update(
      {
        _id: subject._id,
      },
      {
        $set: {
          subject_name: subject.subject_name,
          students: subject.students,
        },
      }
    );
  },
});
