const express = require('express');
const router = express.Router();
const controller = require('../../controllers/contacts');
const { controllerWrapper } = require('../../helpers');
const { validateBody, isValidId, authentificate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', authentificate, controllerWrapper(controller.listContacts));

router.get('/:contactId', authentificate, isValidId, controllerWrapper(controller.getContactById));

router.post(
  '/',
  authentificate,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.addContact)
);

router.put(
  '/:contactId',
  authentificate,
  isValidId,
  validateBody(schemas.updateSchema),
  controllerWrapper(controller.updateContact)
);

router.patch(
  '/:contactId/favorite',
  authentificate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateFavorite)
);

router.delete(
  '/:contactId',
  authentificate,
  isValidId,
  controllerWrapper(controller.removeContact)
);

module.exports = router;
