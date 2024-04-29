const ErrorMessage = (fieldName, minStrLength) => {
  return {
    'string.base': `${fieldName} should be a type of 'string'`,
    'string.min': `${fieldName} should have a minimum length of ${minStrLength}`,
    'array.base': `${fieldName} should be a type of 'array'`,
    'array.includes': `items in ${fieldName} array should be a type of 'string'`,
    'array.includesRequiredUnknowns': `missing required items in ${fieldName} array`,
    'number.base': `${fieldName} should be a type of 'number'`,
    'number.min': `${fieldName} field's value less than the allowed minimum value`,
    'any.only': `items in ${fieldName} array should match list of valid values`,
    'any.required': `missing required ${fieldName} field`,
  };
};

export default ErrorMessage;
