class AuthTestData {
  constructor({ email, password, type }) {
    this.email = email;
    this.password = password;
    this.type = type;
  }

  missing(field) {
    if (this.hasOwnProperty(field)) {
      return {
        ...this,
        [field]: undefined,
      };
    } else {
      console.error(`Field "${fieldName}" does not exist on the object.`);
      return null;
    }
  }

  invalid(field, value) {
    if (this.hasOwnProperty(field)) {
      return {
        ...this,
        [field]: value,
      };
    } else {
      console.error(`Field "${fieldName}" does not exist on the object.`);
      return null;
    }
  }
}

export default AuthTestData;
