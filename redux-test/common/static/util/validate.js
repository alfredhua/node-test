

export function validate_phone(phone) {
  const myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (myreg.test(phone)) {
     return true;
  } else {
     return false;
  }
}

export function validate_email(email) {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(email)) {
      return true; 
  } else {
      return false;
  } 
}



