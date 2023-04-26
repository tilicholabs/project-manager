export const dataFormatter = document => {
  let data = [];
  document.docs.map(item => {
    data.push(item._data);
  });
  return data;
};
