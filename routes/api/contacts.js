const express = require('express');
const router = express.Router();
const controller = require('../../controllers/contacts');
const { controllerWrapper } = require('../../helpers');
const { validateFields, validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', controllerWrapper(controller.listContacts));

router.get('/:contactId', isValidId, controllerWrapper(controller.getContactById));

router.post('/', validateFields(schemas.addSchema), controllerWrapper(controller.addContact));

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.updateSchema),
  controllerWrapper(controller.updateContact)
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateFields(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateFavorite)
);

router.delete('/:contactId', isValidId, controllerWrapper(controller.removeContact));

module.exports = router;
