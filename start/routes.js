'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// User
// Create
Route.post('register', 'UserController.create')
// login
Route.post('login', 'UserController.login')
Route.post('refreshToken', 'UserController.refreshT')
Route.get('loggedIn', 'UserController.loggedIn').middleware('auth')
Route.get('loginCheck', 'UserController.loginCheck').middleware('auth')
Route.post('logout', 'UserController.logout').middleware('auth')
// Read
Route.get('getUser/:id', 'UserController.show').middleware(['auth'])
Route.get('getAllUsers', 'UserController.index').middleware('auth')
// Update
Route.put('update', 'UserController.update').middleware(['auth'])
// Delete
Route.delete('delete', 'UserController.destroy').middleware(['auth'])


Route.group(() => {
  // Sensors
  Route.post('newSensor', 'SensorController.create')
  // Flowerpot
  Route.post('newFlowerpot', 'FlowerpotController.create')
  // Category
  Route.post('newCategory', 'CategoryController.create')
  // Measure
  Route.post('newMeasure', 'MeasurementController.create')
  // FlowerpotSensor
  Route.post('newFlowerpotSensor', 'FlowerpotSensorController.create')
  // Garden
  Route.post('newGarden', 'GardenController.create')

  // Sensors
  Route.get('Sensor/index', 'SensorController.index')
  // Flowerpot
  Route.get('Flowerpot/index', 'FlowerpotController.index')
  // Category
  Route.get('Category/index', 'CategoryController.index')
  // Measure
  Route.get('Measure/index', 'MeasurementController.index')
  // FlowerpotSensor
  Route.get('FlowerpotSensor/index', 'FlowerpotSensorController.index')
  // Garden
  Route.get('Garden/index', 'GardenController.index')

  // Sensors
  Route.get('Sensor/show', 'SensorController.show')
  // Flowerpot
  Route.get('Flowerpot/show', 'FlowerpotController.show')
  // Category
  Route.get('Category/show', 'CategoryController.show')
  // Measure
  Route.get('Measure/show', 'MeasurementController.show')
  // FlowerpotSensor
  Route.get('FlowerpotSensor/show', 'FlowerpotSensorController.show')
  // FlowerpotSensor
  Route.get('Garden/show', 'GardenController.show')

  // Sensors
  Route.put('Sensor/update', 'SensorController.update')
  // Flowerpot
  Route.put('Flowerpot/update', 'FlowerpotController.update')
  // Category
  Route.put('Category/update', 'CategoryController.update')
  // Measure
  Route.put('Measure/update', 'MeasurementController.update')
  // FlowerpotSensor
  Route.put('FlowerpotSensor/update', 'FlowerpotSensorController.update')
  // Garden
  Route.put('Garden/update', 'GardenController.update')

  // Sensors
  Route.delete('Sensor/delete', 'SensorController.destroy')
  // Flowerpot
  Route.delete('Flowerpot/delete', 'FlowerpotController.destroy')
  // Category
  Route.delete('Category/delete', 'CategoryController.destroy')
  // Measure
  Route.delete('Measure/delete', 'MeasurementController.destroy')
  // FlowerpotSensor
  Route.delete('FlowerpotSensor/delete', 'FlowerpotSensorController.destroy')
  // Garden
  Route.delete('Garden/delete', 'GardenController.destroy')

  // Sensors
  Route.post('Sensor/', 'SensorController.index')
  // Flowerpot
  Route.post('Flowerpot/', 'FlowerpotController.index')
  // Category
  Route.post('Category/', 'CategoryController.index')
  // Measure
  Route.post('Measure/', 'MeasurementController.index')
  // FlowerpotSensor
  Route.post('FlowerpotSensor/', 'FlowerpotSensorController.index')

  // Measurements
  Route.get('Measure/showDate', 'MeasurementController.showByDate')


  // Flowerpot
  Route.get('Flowerpot/showFLSN', 'FlowerpotController.showFlowerpotSensor')
  // Flowerpot
  Route.get('Flowerpot/showByName', 'FlowerpotController.showByName')
  // Flowerpot
  Route.get('Flowerpot/showByCategory', 'FlowerpotController.showByType')
  // Flowerpot
  Route.get('Flowerpot/showByGarden', 'FlowerpotController.showByGarden')

  // Sensor
  Route.get('Sensor/showMeasure', 'SensorController.showSensorMeasurements')
  // Sensor
  Route.get('Sensor/showHumidity', 'SensorController.showSensorHumidity')
  // Sensor
  Route.get('Sensor/showByName', 'SensorController.showByName')
  // Sensor
  Route.get('Sensor/showByType', 'SensorController.showByType')
  // Sensor
  Route.get('Sensor/showByDate', 'SensorController.sensorMeasureByDate')

  // Garden
  Route.get('Garden/showByUser', 'GardenController.showByUser')

}).prefix('api/')
