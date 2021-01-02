const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');


const routes = express.Router();

/**
 * LOGIN
 */
routes.post('/session', sessionController.create);

/**
 * PROFILE
 */
routes.get('/profile', profileController.index);

/**
 * ONGS
 */
routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

/**
 * INCIDENTS
 */
routes.get('/incidents', incidentController.index);
routes.get('/incidents/:id', incidentController.show);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;