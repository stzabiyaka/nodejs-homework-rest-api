const express = require('express');
const { controllerWrapper } = require('../../helpers');
const { validateBody, authentificate } = require('../../middlewares');
const controller = require('../../controllers/auth');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validateBody(schemas.signSchema), controllerWrapper(controller.signUp));

router.post('/login', validateBody(schemas.signSchema), controllerWrapper(controller.signIn));

router.get('/current', authentificate, controllerWrapper(controller.getCurrentUser));

router.get('/logout', authentificate, controllerWrapper(controller.signOut));

router.patch(
  '/subscription',
  authentificate,
  validateBody(schemas.updateSubscriptionSchema),
  controllerWrapper(controller.updateUserSubscription)
);

module.exports = router;
