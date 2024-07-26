export const checkNameField = (value, helpers) => {
  const strings = value.split(' ');
  if (strings.length < 2) {
    return helpers.message('The name field must contain at least two words');
  }
  for (let str of strings) {
    if (str === '') {
      return helpers.message('Words in the name field must be separated by one space');
    }
  }
  return value;
};
