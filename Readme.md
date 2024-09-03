# Elbit Home Assignment

Welcome to the Elbit Home Assignment project! This repository provides an API for flight data using JavaScript. It employs the MVC (Model-View-Controller) pattern to structure the application.

## Overview

This project includes functionality to:

- Get number of all flights or number of inbound/outbound flights seperately.
- Get number flights by country's name.
- Fetch the most popular destination.
- Check if there is a possibilty fo a quick getaway.

## Installation

To get started, simply download and extract the zip file or clone the repository:

```bash
git clone https://github.com/yairnadler/ElbitHomeAssignment.git
cd ElbitHomeAssignment
```

## Getting Started

To run the API, open the terminal from the cloned repo and run the following:

```bash
docker build -t flight-api .
docker run -d -p 8080:8080 flight-api
```

Next, jump ahead to the following postman api https://elements.getpostman.com/redirect?entityId=34320237-9fbb2950-2d79-4008-a5a5-782f33012af4&entityType=collection where you can test all the routes of the API.
