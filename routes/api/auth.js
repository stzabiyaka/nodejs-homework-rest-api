const express = require('express');
const { controllerWrapper } = require('../../helpers');
const { validateBody, authentificate, upload } = require('../../middlewares');
const controller = require('../../controllers/auth');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validateBody(schemas.signSchema), controllerWrapper(controller.signUp));

router.get('/verify/:verificationToken', controllerWrapper(controller.verifyEmail));

router.post(
  '/verify',
  validateBody(schemas.resendVerifyEmailSchema),
  controllerWrapper(controller.resendVereifyEmail)
);

router.post('/login', validateBody(schemas.signSchema), controllerWrapper(controller.signIn));

router.get('/current', authentificate, controllerWrapper(controller.getCurrentUser));

router.get('/logout', authentificate, controllerWrapper(controller.signOut));

router.patch(
  '/subscription',
  authentificate,
  validateBody(schemas.updateSubscriptionSchema),
  controllerWrapper(controller.updateUserSubscription)
);

router.patch(
  '/avatars',
  authentificate,
  upload.single('avatar'),
  controllerWrapper(controller.updateUserAvatar)
);

module.exports = router;
