# DukeStudy
Final Project for CS316

A Social Study Tool for Duke Students based on Database Management.

To run, you must have the latest version of Nodejs installed, as well as npm.

After cloning the repository and navigating to the project root, run

```
npm install
```

to install all dependencies. From there, in the project directory, run

```
npm run dev
```

then in your browser, navigate to localhost:3000

## Database

We are running a PostgreSQL database. Before running the website, the Postgres server must be started, and your credentials must be entered in the server file.

### Generation of Production database

To generate the production database, at a psql command prompt, you should run the commands located in load_large_database.sql file. **Be sure to update the filepath in the COPY commands with your file path**. We have a csv with all of the course data right now. We are still querying for other data, but the process will be the same with that new data.

## Functionality

The web app currently displays the data in the test version of Student table and provides a way for users to modify their data. The next steps include adding a way for Users to view courses.
