export const emailValidator = email => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(email);
};

export const userNameValidator = name => {
  return name.trim().length > 3;
};

export const phoneNumberValidator = number => {
  if (/^\d+$/.test(number.trim())) {
    return number.trim().length === 10;
  } else {
    return false;
  }
};

export const passwordValidator = password => {
  return password.trim().length > 7;
};
