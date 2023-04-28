export const dataFormatter = async document => {
  return await document.docs.map(item => {
    return item._data;
  });
};
