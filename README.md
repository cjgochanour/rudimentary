# Rudimentary

## Summary

Rudimentary is a web-app for percussion instructors and students. The goal of the app is to provide an easy-to-use interface to track student progress in various exercises.

### Features

-   Separate registration to distinguish student from instructor. A student must select an instructor during registration
-   Library with 40 built-in rudiments
-   Instructors may add more exercises to the library. Only the instructor and their students will see the custom rudiments
-   Metronome on each rudiment's page
-   Each rudiment has a leaderboard that displays the top entry from each student with the same instructor
-   Leaderboard access is granted by an instructor to each student individually
-   Students and instructors on behalf of a student may make entries on a rudiment's page. Student entries require instructor approval
-   Instructors may view a list of their students
-   Each student has a "profile" page in which all of their entries are displayed
-   A student's entire entry history may be downloaded as a .CSV

## How To Use

#### Warning

The login method is for demonstration purposes only and in its current form is _not_ secure. Please do not create an account with your personal email address.

### Instructions

1. Clone the repo to your local machine
2. Clone the [API](https://github.com/cjgochanour/rudimentary-api)
3. Host the API using [json-server](https://github.com/typicode/json-server) on port 8088
4. Install dependencies with `npm install` in the project directory.
5. Host the project using `npm start` in the project directory.

#### Demo Users

Login as an instructor with `neil@rush.net`
Login as a student with `c@banks.com`

## Planning Documents

-   [Initial wireframe](https://miro.com/app/board/uXjVORVGzTk=/?invite_link_id=310315477357)
-   [Entity-Relationship Diagram](https://dbdiagram.io/d/61e205a74bca010ae98dcd5e)
-   [Issues](https://github.com/cjgochanour/rudimentary/issues?q=is%3Aissue+is%3Aclosed)
