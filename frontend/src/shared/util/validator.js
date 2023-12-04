const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_BIRTHDATE = "BIRTHDATE";
const VALIDATOR_TYPE_PHONE = "PHONE";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_PASSWORD = "PASSWORD";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_BIRTHDATE = () => ({ type: VALIDATOR_TYPE_BIRTHDATE });
export const VALIDATOR_PHONE = () => ({ type: VALIDATOR_TYPE_PHONE });
export const VALIDATOR_PASSWORD = () => ({ type: VALIDATOR_TYPE_PASSWORD });

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_BIRTHDATE) {
      isValid = isValid && /^\d{4}\.\d{2}\.\d{2}$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PHONE) {
      isValid = isValid && /^\d{11}$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PASSWORD) {
      const uppercase = /[A-Z]/.test(value);
      const lowercase = /[a-z]/.test(value);
      const number = /\d/.test(value);
      const specialChar = /[@$!%*?&]/.test(value);

      const characterTypes = [uppercase, lowercase, number, specialChar];
      const countCharacterTypes = characterTypes.filter((type) => type).length;

      isValid =
        isValid &&
        countCharacterTypes >= 2 &&
        /^[A-Za-z\d@$!%*?&]{8,16}$/.test(value);
    }
  }
  return isValid;
};
