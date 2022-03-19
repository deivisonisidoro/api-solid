# api-solid

This is a project where I'm studying a little about SOLID


## Setup

Use command `yarn` to install all dependencies

### Run Developer Mode

Use the `yarn dev` command to run the application 

### Start Application

Use the `yarn dev:server` command to run the application

### Process Queue

Use the `yarn dev:queue` command to  process the queue

### Use System of Email and Typeorm

Remove ".example" from ".env.example" and put your credentials

### Make Migrations 

It exists a way of to run migration in the Typeorm, just type: `yarn typeorm migration:run`, with this command you will create the tables in you database

## Documentation

It is possible to see the documentations of project when access the end point: `http://localhost:3333/api-docs`