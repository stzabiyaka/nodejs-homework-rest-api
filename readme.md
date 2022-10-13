## GoIT Node.js Contacts API

Project provides users with API, for managing their contacts collection.

### Routes:

#### GET `/api/contacts`:

Method: GET.

Requires: none.

Response: Status - 200, Body: Array of objects with all contacts in collection.

#### GET `/api/contacts/:contactId`:

Method: GET

Requires: valid ID of the contact in collection.

Response: Status - 200, Body: Object of contact details.

#### POST `/api/contacts`:

Method: POST

Requires: Object with following schema -

{ name (String, required), email (String, required, should be a valid email address), phone (String,
required, should match the pattern: (111) 111-1111), favorite (Boolean) }

Response: Status - 201, Body: Object of created contact details

#### PUT `/api/contacts/:contactId`:

Method: PUT

Requires: valid ID of contact in collection, Object, with at least one field of the following
schema -

{ name (String, required), email (String, required, should be a valid email address), phone (String,
required, should match the pattern: (111) 111-1111), favorite (Boolean) }

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
