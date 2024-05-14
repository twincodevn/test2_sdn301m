const express = require('express')
const router = express.Router()
const tourController = require('./../controllers/tourController.js')
// routing
router.route('/top-5-cheap').get(tourController.aliasTopTour, tourController.getAllTours)
router.route('/tour-stats').get(tourController.getTourStats)
router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.addTour)
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour)

module.exports = router
