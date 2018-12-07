# DukeStudy

These instructions are for Mac users!

Final Project for CS316

A Social Study Tool for Duke Students based on Database Management.

To run, you must have the latest version of Nodejs installed, as well as npm.

After cloning the repository and navigating to the project root, run

```
npm install
```

to install all dependencies.

Be sure the PostgreSQL server is running before navigating to the site. Without the server up and running, the database cannot accept queries.

After ensuring the database server is running, in the project directory, run

```
npm run dev
```

then in your browser, navigate to localhost:3000

## Database and Server

We are running a PostgreSQL database. The Postgres server is hosted on a Google Cloud VM as specified at the IP address specified in the db/config file. If you would like to change that to be your own server, you may update the config file with your credentials for your database.

### Generation of Production database

To generate the production database, connect to the Postgres Server and then at a psql command prompt, you should run the commands located in load_large_database.sql file. **Be sure to update the filepath in the COPY commands with your file path**. These commands will copy all the large CSV files into the proper database attributes.
