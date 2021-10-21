export function validateId(id) {
  id = id.trim().replaceAll("-", "");
  id = id.toUpperCase();
  var es = true;
  if (id.length !== 14) {
    es = false;
  } else {
    var RegExPattern = /^\d{13}[A-Z]{1}$/;
    if (!id.match(RegExPattern)) {
      es = false;
    } else {
      var sDay = id.substring(3, 5);
      var sMonth = id.substring(5, 7);
      var sYear = id.substring(7, 9);
      var aa = parseInt(sYear, 10);
      var mm = parseInt(sMonth, 10);
      var dd = parseInt(sDay, 10);
      if (aa >= 0 && aa <= 29) {
        aa += 2000;
      } else {
        aa += 1900;
      }
      var leap = false;
      if (aa % 2 === 0) {
        if (aa % 4 === 0) {
          leap = true;
        }
      }
      if (mm < 1 || mm > 12) {
        es = false;
      } else {
        switch (mm) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            if (dd < 1 || dd > 31) {
              return false;
            }
            break;
          case 2:
            if (leap) {
              if (dd < 1 || dd > 29) {
                es = false;
              }
            } else {
              if (dd < 1 || dd > 28) {
                es = false;
              }
            }
            break;
          default:
            if (dd < 1 || dd > 30) {
              es = false;
            }
            break;
        }
      }
    }
  }
  return es;
}

export const getbirthdate = (employee) => {
  if (!validateId(employee.personal_id)) {
    return;
  }
  let { personal_id } = employee;
  personal_id = personal_id.trim().replaceAll("-", "");

  var sDay = parseInt(personal_id.substring(3, 5), 10);
  var sMonth = parseInt(personal_id.substring(5, 7), 10);
  var sYear = parseInt(personal_id.substring(7, 9), 10);

  if (sYear >= 0 && sYear <= 10) {
    sYear += 2000;
  } else {
    sYear += 1900;
  }

  employee.birth = `${sYear}-${sMonth}-${sDay}`;
};
