# Miqueas
We are building a inventory management solution for the non-profit Miqueas 6.8. Miqueas 6.8 is a non profit that operates a children's home for kids without family support. They store school supplies and other materials for the children, but they need a way to keep track of them. Thus we are building an inventory management system for them to help better manage their supplies.

# Progressive Web App
One of the main challenges for this project is that the webapp needs to work offline. Progressive webapps are a solution to this problem, as they allow webapps to persist without connection to the internet. Google has a list of [standards](https://developers.google.com/web/progressive-web-apps/) that they use to qualify a webapp as persistent. This app is also designed to work on mobile devices, which is part of progressive webapp standards.

# NextJS
This app was made with [NextJS](https://nextjs.org/learn/basics/getting-started), which allows for a more intuitive routing system and other optimizations. NextJS also seamlessly incorporates React into its framework. NextJS also has package that has support for Progressive Web Apps, called [next-offline](https://github.com/hanford/next-offline). This package automatically deploys service workers to production builds, and takes care of a lot of the offline capabilities for us.


# How to Run
1. Run `npm install` in the root directory.
2. Then run `npm run dev` to start the app.
3. Navigate to [localhost:3000](localhost:3000) to see the app.

# Running the Backend Locally
1. Navigate to [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) and follow the directions to install mongodb. Make sure to run the command 'mongod --config /usr/local/etc/mongod.conf --fork' stated at the end of the instructions.
2. Install [MongoDB Compass](https://www.mongodb.com/download-center/compass)
3. Open MongoDB Compass and create a new connection.
4. Go to config.js and change dbUrl to mongodb://localhost:27017


