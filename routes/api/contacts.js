const express = require('express');
const router = express.Router();
const controller = require('../../controllers/contacts');
const { controllerWrapper } = require('../../helpers');
const { validateFields, validateBody } = require('../../middlewares');
const schemas = require('../../schemas/contact');

router.get('/', controllerWrapper(controller.listContacts));

router.get('/:contactId', controllerWrapper(controller.getContactById));

router.post(
  '/',
  validateBody(),
  validateFields(schemas.addSchema),
  controllerWrapper(controller.addContact)
);

router.put('/:contactId', validateBody(), controllerWrapper(controller.updateContact));

router.delete('/:contactId', controllerWrapper(controller.removeContact));

module.exports = router;
