export const ROUTES = {
  home: "/",
  userTaken: "/user-taken",
  roleSelection: "/role-selection",
  login: "/login",
  game: "/game/:id",
}

export const buildPathFromTemplate = (routeTemplate, params) => {
  let path = routeTemplate;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });
  return path;
};