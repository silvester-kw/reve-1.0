export const valiateFields = (data, requiredFields) => {
  for (let field of requiredFields) {

    if (!data[field]) {
      return false;
    } else if (typeof data[field] === "string" && data[field].trim() === "") {
      return false;
    } else if (typeof data[field] === "object" && Object.keys(data[field]).length === 0) {
      return false;
    } else if (Array.isArray(data[field]) && data[field].length === 0) {
      return false;
    }
  }

  return true;
}
