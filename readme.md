# GoIT Node.js Contacts API

Project provides users with API, for managing their contacts collection.

## Routes:

### Authentification:

#### POST `/api/users/signup`:

Request:

```javascript
POST /api/users/signup
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

Response:

```javascript
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### POST `/api/users/login`:

Request:

```javascript
POST /api/users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

Response:

```javascript
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### GET `/api/users/current`:

Request:

```javascript
GET / api / users / current;
Authorization: 'Bearer {{token}}';
```

Response:

```javascript
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "starter"
}
```

#### GET `/api/users/logout`:

Request:

```javascript
GET / api / users / logout;
Authorization: 'Bearer {{token}}';
```

Response:

```javascript
Status: 204 No Content
```

#### PATCH `/api/users/subscription`:

subscription must be one of following values: ['starter', 'pro', 'business']

Request:

```javascript
POST /api/users/subscription
Content-Type: application/json
RequestBody: {
  "subscription": "starter"
}
```

Response:

```javascript
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### PATCH `/api/users/avatars`:

subscription must be one of following values: ['starter', 'pro', 'business']

Request:

```javascript
POST /api/users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: file to upload
```

Response:

```javascript
SStatus: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "here should be link to the image"
}
```

### Contacts

#### GET `/api/contacts?page=1&limit=3&favorite=true`:

Request:

```javascript
GET / api / contacts;
Authorization: 'Bearer {{token}}';
```

Response:

```javascript
Status: 200 OK
Content-Type: application/json
ResponseBody: Array of objects with all contacts in collection, with optional
pagination and filtration by "favorite" field.
```

#### GET `/api/contacts/:contactId`:

Request:

Requires valid ID of the contact in collection.

```javascript
GET / api / contacts/:contactId;
Authorization: 'Bearer {{token}}';
```

Response:

```javascript
Status: 200 OK
Content-Type: application/json
ResponseBody: Object of contact details.
```

#### POST `/api/contacts`:

Request:

```javascript
POST /api/contacts
Content-Type: application/json
Authorization: 'Bearer {{token}}';
RequestBody: {
  "name": "Contact Name",
  "email": "sample@mail.com",
  "phone": "(111) 111-1111",
  "favorite": "true"
}
```

Response:

```javascript
Status: 201 OK
Content-Type: application/json
ResponseBody: Object of created contact details.
```

#### PUT `/api/contacts/:contactId`:

Request:

Requires valid ID of contact in collection

```javascript
PUT /api/contacts/:contactId
Content-Type: application/json
Authorization: 'Bearer {{token}}';
RequestBody: Object, with at least one field of the following
schema - {
  "name": "Contact Name",
  "email": "sample@mail.com",
  "phone": "(111) 111-1111",
  "favorite": "true"
}
```

Response:

```javascript
Status: 200 OK
Content-Type: application/json
ResponseBody: Object of updated contact details.
```

#### PATCH `/api/contacts/:contactId/favorite`:

Request:

Requires: valid ID of contact in collection.

```javascript
PATCH /api/contacts/:contactId/favorite
Content-Type: application/json
Authorization: 'Bearer {{token}}';
RequestBody: {
  "favorite": "true"
}
```

Response:

```javascript
Status: 201 OK
Content-Type: application/json
ResponseBody: Object of contact details with updated 'favorite' field.
```

#### DELETE `/api/contacts/:contactId`:

Request:

Requires valid ID of the contact in collection.

```javascript
DELETE / api / contacts/:contactId;
Authorization: 'Bearer {{token}}';
```

Response:

```javascript
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "message": "contact deleted"
}.
```

### Start comands:

- `npm start` &mdash; starts server in production mode
- `npm run start:dev` &mdash; starts server in development mode
- `npm run test` &mdash; starts jest testing
- `npm run lint` &mdash; starts code check with eslint
- `npm lint:fix` &mdash; starts code check with eslint and auto bugfix
