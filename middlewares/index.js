const validateFields = require('./validate-fields');
const validateJSW = require('./validate-jwt');
const validateRol = require('./validate-role');


module.exports = {
    ...validateFields,
    ...validateJSW,
    ...validateRol
}