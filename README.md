# SphereEngine
A node-express application that uses a JWF token system for login/registration with mongoDB backend and utilises SphereEngine to add/detele/edit questions.
#note
MongoDB needs to be added with username and password as query in for authetication, problme.js file is set to run in port 3001 for edit/add testcases to problem,
app.js file runs in localhost 3000 for login,register and add/delete questions, /login ->login , and so on for routing to different pages. Dockerimage was composed.
To start the project cd/workdir & run npm app.js || run npm problem.js
npm server.js connect with mongodb backend for auth , application is buggy as of now!
