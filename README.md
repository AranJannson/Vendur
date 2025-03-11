# Vendur

Vendur is a simple, lightweight, and easy-to-use e-commerce platform. It is built with Next.js 15 and Typescript.

## Features

- **Product Management**: Add, edit, and delete products.
- **Order Management**: View and manage orders.
- **User Management**: View and manage users.
- **Payment Gateway**: Accept payments.
- **Authentication**: Sign in and sign up with email and password.
- **Role-based Access Control**: Define roles and permissions for users/organisations.
- **Analytics**: View sales, user data and more.
- **Admin Panel**: Manage your store from a simple and intuitive admin panel.
- **Organisation Management**: Multiple companies and sellers can use the platform and manage their products.

## Pre-requisites
- Node.js
- Docker Desktop

## Installation and Usage

#### 1. Clone the repository:
- SSH: *git@github.com:AranJannson/AdvancedWeb.git*
- HTTPS: *https://github.com/AranJannson/AdvancedWeb.git*

#### 2. Install the dependencies and Run (Frontend):
```bash
npm install yarn

cd '.\NextJS (Frontend)\'

yarn install

# Start the frontend
yarn dev

```

#### 3. Install the dependencies and Run (Microservices):

```bash
cd '.\Microservices\'

# cd into microservice of choice (For this example, I am using the Catalog microservice)
cd '.\Catalog\'

npm install

# Make sure docker is running in the background
# Start the microservice
docker-compose up --build

# Stop the microservice
docker-compose down

# You can view the console in the container for the current microservice by opening docker desktop and clicking on the container.
# Each microservice has its own console and own port.

```

## Default Routes

- **Frontend**: http://localhost:3000
- **Admin Microservice**: http://localhost:5078
- **Catalog Microservice**: http://localhost:8000
- **Analytics Microservice**: http://localhost:8001
- **Payment Microservice**: http://localhost:8002
