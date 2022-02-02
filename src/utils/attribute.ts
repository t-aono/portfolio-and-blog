export const attribute = (name: string, value: string, condition: boolean) => {
  if (typeof condition === 'undefined') {
    condition = true;
  }
  return condition ? { [name]: value } : null;
};

export default attribute;
