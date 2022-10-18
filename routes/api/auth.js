const express = require('express');
const { controllerWrapper } = require('../../helpers');
const { validateFields } = require('../../middlewares');
const controller = require('../../controllers/auth');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validateFields(schemas.signUpSchema), controllerWrapper(controller.signUp));

router.post('/login', validateFields(schemas.signInSchema), controllerWrapper(controller.signIn));

module.exports = router;
