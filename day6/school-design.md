# School Database Design

## Students
The students table stores information about each student, including their unique ID, name and email address. Each student has a unique email.

## Courses
The courses table stores information about the courses offered by the school. Each course has a unique ID and a name.

## Enrolments
The enrolments table records which students are enrolled in which courses. It also stores the grade a student receives for a course.

## Relationships
A student can have many enrolments, so there is a one-to-many relationship between students and enrolments. A course can also have many enrolments, creating a one-to-many relationship between courses and enrolments.

Students and courses have a many-to-many relationship because one student can take many courses and one course can have many students. The enrolments table is needed as a join table to connect students and courses and to store additional information such as the grade.

## Index
I would add an index on enrolments.student_id because it would make it faster to find all the courses enrolled in by a particular student.

## SQL or NoSQL
I would choose SQL for this school system because the data has clear relationships between students, courses and enrolments. SQL databases support primary keys, foreign keys, unique constraints and JOIN queries, which are useful for maintaining data consistency and retrieving related information.
