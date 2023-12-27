# MuzzPlayer

Muzzplayer is an online music player that has a small collection of musics in it.
This project is made using React as frontend and NodeJS as Backend. AWS as PaaS also being used.

Live at: (Muzzplayer.vercel.app)

## Frontend [Typescript+SWR]

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

Set up the environment variables

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
