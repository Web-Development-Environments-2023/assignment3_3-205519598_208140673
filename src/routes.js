import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/myrecipespage",
    name: "myrecipespage",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/favoritespage",
    name: "favoritespage",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "/familypage",
    name: "familypage",
    component: () => import("./pages/FamilyPage"),
  },
  {
    path: "/model",
    name: "model",
    component: () => import("./components/CreateRecipeModal"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },

];

export default routes;
