import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { DashBoardPage } from "./pages/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import {
  AdminRoute,
  ProtectedRoute,
  PublicOnlyRoute,
} from "./utils/RouterGuard";
import { useAuthContext } from "./context/AuthContextProvider";
import ScrollToTop from "./utils/ScrollToTop";
import SignUpPage from "./pages/SignUpPage";
import PersistentLogin from "./utils/PersistentLogin";
import UserAdmin from "./components/AdminPage/UserAdmin";
import ActivityAdmin from "./components/AdminPage/ActivityAdmin";
import IngredientAdmin from "./components/AdminPage/IngredientAdmin";
import RecipeAdmin from "./components/AdminPage/RecipeAdmin";
import AdminPage from "./pages/AdminPage";
import RecipesListPage from "./pages/RecipesListPage";
import RecipePage from "./pages/RecipePage";
import Layout from "./utils/Layout";
import MealPlanPage from "./pages/MealPlanPage";
import AddRecipePage from "./pages/AddRecipePage";
import StatisticsPage from "./pages/StatisticsPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const { accessToken } = useAuthContext();

  console.log(accessToken ? "Logged in" : "Not logged in");

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PersistentLogin />}>
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route
              path="/"
              element={accessToken ? <DashBoardPage /> : <LandingPage />}
            />
            <Route path="/register" element={<SignUpPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="/stats" element={<StatisticsPage />} />
              <Route path="/recipes" element={<RecipesListPage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/recipe/add" element={<AddRecipePage />} />
              <Route path="/meal-plan" element={<MealPlanPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />}>
                <Route index element={<Navigate to="users" replace />} />
                <Route path="users" element={<UserAdmin />} />
                <Route path="activities" element={<ActivityAdmin />} />
                <Route path="ingredients" element={<IngredientAdmin />} />
                <Route path="recipes" element={<RecipeAdmin />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
