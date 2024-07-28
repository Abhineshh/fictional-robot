const server = "http://localhost:5000"

export const loginRoute =  `${server}/api/auth/login`;
export const registerRoute = `${server}/api/auth/register`;
export const logoutRoute = `${server}/api/auth/logout/`;

export const createEmployeeRoute = `${server}/api/emp/createEmployee`;
export const editEmployeeRoute =  `${server}/api/emp/editEmployee`;
export const getEmployeeListRoute = `${server}/api/emp/getEmployeeList`;
export const searchEmployeeListRoute = `${server}/api/emp/searchEmployee`;
export const deleteEmployeeRoute = `${server}/api/emp/deleteEmployee`;
