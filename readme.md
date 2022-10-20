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

### Contacts

#### GET `/api/contacts?page=1&limit=3&favorite=true`:

Request:

```javascript
GET / api / contacts;
Authorization: 'Bearer {{token}}';
```

Response: Status - 200, Body: Array of objects with all contacts in collection, with optional
pagination and filtration by "favorite" field.

#### GET `/api/contacts/:contactId`:

Request:

```javascript
GET / api / contacts/:contactId;
Authorization: 'Bearer {{token}}';
```

Requires: valid ID of the contact in collection.

Response: Status - 200, Body: Object of contact details.

#### POST `/api/contacts`:

Method: POST

Requires: Object with following schema -

```javascript
{
    name (String, required),
    email (String, required, should be a valid email address),
    phone (String, required, should match the pattern: (111) 111-1111),
    favorite (Boolean) }
```

Response: Status - 201, Body: Object of created contact details

#### PUT `/api/contacts/:contactId`:

Method: PUT

Requires: valid ID of contact in collection, Object, with at least one field of the following
schema -

```javascript
{
    name (String, required),
    email (String, required, should be a valid email address),
    phone (String, required, should match the pattern: (111) 111-1111),
    favorite (Boolean) }
```

Response: Status - 200, Body: Object of updated contact details

#### PATCH `/api/contacts/:contactId/favorite`:

Method: PATCH

Requires: valid ID of contact in collection, Object, with required 'favorite' field

Response: Status - 200, Body: Object of contact details with updated 'favorite' field

#### DELETE `/api/contacts/:contactId`:

Method: DELETE

Requires: valid ID of contact in collection

Response: Status - 200, Body: message "contact deleted"

### Start comands:

- `npm start` &mdash; starts server in production mode
- `npm run start:dev` &mdash; starts server in development mode
- `npm run lint` &mdash; starts code check with eslint
- `npm lint:fix` &mdash; starts code check with eslint and auto bugfix
