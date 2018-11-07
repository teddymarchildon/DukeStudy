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

To generate the production dataset, you can run the queries in the folder named 'sql'. The first one is the create command, the following loads some test data into the database. After running those queries, the database is populated with some test data. 

## Functionality

The web app currently displays the data in the Student table and provides a way for users to modify their data.
