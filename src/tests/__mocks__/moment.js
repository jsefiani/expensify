// Require the original one and not the mocked one
const moment = require.requireActual('moment');

// Mocking the moment.js library
// Here we create a replica function in order to persist the time
export default (timestamp = 0) => {
    return moment(timestamp)
}