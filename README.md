# Quick-Credit

Quick Credit is an online lending platform that provides short term soft loans to individuals.This
helps solve problems of financial inclusion as a way to alleviate poverty and empower low
income earners.

# Build Status

Build status of continous integration i.e travis, coveralls and codeclimate

[![Build Status](https://travis-ci.org/IsaiahRn/Quick-Credit.svg?branch=develop)](https://travis-ci.org/IsaiahRn/Quick-Credit)
[![Coverage Status](https://coveralls.io/repos/github/IsaiahRn/Quick-Credit/badge.svg?branch=develop)](https://coveralls.io/github/IsaiahRn/Quick-Credit?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d6c07e49f18ef60e092c/maintainability)](https://codeclimate.com/github/IsaiahRn/Quick-Credit/maintainability)


# Motivation

This App is a challenge that will contritube greatly to my journey of becoming a world class developer

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Here is the environment prerequisite for the web app

```
NodeJS
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be


- Clone the repository `git clone https://github.com/IsaiahRn/Quick-Credit.git`
- Run `npm install` to install node packages
- Run `npm run dev-start` to start the web app 


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

- Run `npm test`

### Endpoints
Using Postman to access these endpoints

| Endpoint                   | Methods   | Functionalities        |
| ---------------------------|-----------|------------------------|
| /api/v1/auth/login         | POST      | Login registered user  |
| /api/v1/auth/signup        | POST      | Register a new User    |
| /api/v1/users/<:user-email>/verify    | PATCH | Verify a user account  |
| /api/v1/loans/`<:loan-id>`     | GET  | Get a specific loan application  |
| /api/v1/loans?status=`approved`&repaid=`false`        | GET      | Get all current loans, not fully repaid   |
| /api/v1/loans?status=`approved`&repaid=`true`        | GET      | Get all repaid loans  |
| /api/v1/loans         | GET      | Get all loan applications  |
| /api/v1/loans/`<:loan-id>`/repayments       | GET      | View loan repayment history    |
| /api/v1/loans       | POST      | Create a loan application    |
| /api/v1/loans/`<:loan-id>`       | PATCH      | Approve or reject a loan application    |
| /api/v1/loans/`<:loan-id>`/repayment       | POST      | Create a loan repayment record    |


## Built With

* HTML
* Javascript
* CSS
* NodeJS / Express

### UI templates

Preview UI template here[ UI Template](https://isaiahrn.github.io/Quick-Credit/UI/index.html)


## Authors

* **Isaie Runoro**
[Github Profile](https://github.com/IsaiahRn)


## Acknowledgments

* [Andela](http://andela.com)
* Olawale Aladeusi (https://www.codementor.io/olawalealadeusi896/building-simple-api-with-es6-krn8xx3k6)
* [Brad Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
