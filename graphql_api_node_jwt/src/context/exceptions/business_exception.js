export default class BusinessException extends Error {
  code = 422;
  message = this.message || "Business error has hapened";
}