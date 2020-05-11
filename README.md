# feker

Steps For Setup followed by curl requests
npm i 

-> Signup User
curl -X POST \
  http://localhost:9001/users/signup \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 16773f9e-f221-4090-8554-6373d14dd0e5' \
  -H 'cache-control: no-cache' \
  -d '{
	"userId":"12",
	"email":"r.b@gmail.com",
	"password":"password"
}'

-> Login User

curl -X POST \
  http://localhost:9001/users/login \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"email":"r.b@gmail.com",
	"password":"password"
	
}'

-> Delete User

curl -X DELETE \
  http://localhost:9001/users/12 \
  -H 'Authorization: Bearer <Enter Token Here>' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
