function addCommaToNumber(number) {
  if (number === null || number === undefined) {
      return '';
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default addCommaToNumber;
