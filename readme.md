# MuzzPlayer

Muzzplayer is an online music player that has a small collection of musics in it.
This project is made using React as frontend and NodeJS as Backend. AWS as PaaS also being used.

Live at: (Muzzplayer.vercel.app)

## Frontend [React-Typescript+SWR]

[Modules and packages used]

- React-Vite
- NextUI
- Tailwind CSS
- Swiper
- Framer Motion
- zod

## Backend [NodeJS-Express-Mongoose]

[Modules and packages used]

- NodeJS
- ExpressJS
- Mongoose
- zod
- aws-sdk:s3

To Start this project

- clone the project, it has two folders, client and server
- client has the frontend
- server has the backend
- To start client side, navigate to client by `cd /client` and hit `npm run dev` or `npm run` [for production]
- To start server side, navigate to server by `cd /server` and hit `npm start` [same for production]
- Client starts at `http://localhost:5173` and Server starts at `http://localhost:3200`

## Set up the environment variables

[Frontend]:
/// example →

- VITE_SERVER_API=(http://localhost:3200)

[Backend]:
/// example →

JWT_SECRET = "secret"
AWS_ACCESSKEYID="ACCESSKEYID"
AWS_SECRETKEY="SECRETKEY"
AWS_REGION="REGION"
AWS_BUCKET_NAME="BUCKET_NAME"

## Features

- User can create account
- User can upload songs
- User can listen to songs
- User can search for songs
- Songs can be sorted
- Secure auth
- Songs uploaded to cloud for 24/7 availibility
