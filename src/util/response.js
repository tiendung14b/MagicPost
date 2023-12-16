import Toast from "../ui/Toast/Toast";

const statusCode = {
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422
}

const responseToast = (response, toast) => {
  console.log(response);
  if (response.status === statusCode.OK) {
    Toast.success(response.data?.message, toast);
  } else if (response.status === statusCode.CREATED) {
    Toast.success(response.data?.message, toast);
  } else if (response.status === statusCode.NO_CONTENT) {
    Toast.success(response.data?.message, toast);
  } else if (response.status === statusCode.BAD_REQUEST) {
    Toast.warn(response.data?.message, toast);
  } else if (response.status === statusCode.UNAUTHORIZED) {
    Toast.warn(response.data?.message, toast);
  } else if (response.status === statusCode.NOT_FOUND) {
    Toast.warn(response.data?.message, toast);
  } else if (response.status === statusCode.CONFLICT) {
    Toast.warn(response.data?.message, toast);
  } else if (response.status === statusCode.FORBIDDEN) {
    Toast.warn(response.data?.message, toast);
  } else if (response.status === statusCode.UNPROCESSABLE_ENTITY) {
    Toast.warn(response.data?.message, toast);
  } else if (response.status === statusCode.INTERNAL_SERVER_ERROR) {
    Toast.error(response.data?.message, toast);
  }
}

export default responseToast;