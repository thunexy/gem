export const getFormattedDate = dob => {
  const dObj = new Date(dob);
  return (
    `${dObj.getDate()}`.padStart(2, '0') +
    '-' +
    `${dObj.getMonth() + 1}`.padStart(2, '0') +
    '-' +
    `${dObj.getFullYear()}`
  );
};

export const getReversedFormattedDate = dob => {
  const dObj = new Date(dob);
  return (
    `${dObj.getFullYear()}` +
    '-' +
    `${dObj.getMonth() + 1}`.padStart(2, '0') +
    '-' +
    `${dObj.getDate()}`.padStart(2, '0')
  );
};
