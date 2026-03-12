import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { DashBoardPage } from "./pages/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute, PublicOnlyRoute } from "./utils/RouterGuard";
import { useAuthContext } from "./context/AuthContextProvider";
import ScrollToTop from "./utils/ScrollToTop";
import SignUpPage from "./pages/SignUpPage";
import PersistentLogin from "./utils/PersistentLogin";
import RecipesListPage from "./pages/RecipesListPage";
import RecipePage from "./pages/RecipePage";
import Layout from "./utils/Layout";
import MealPlanPage from "./pages/MealPlanPage";
import AddRecipePage from "./pages/AddRecipePage";

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
              <Route path="/recipes" element={<RecipesListPage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/recipe/add" element={<AddRecipePage />} />
              <Route path="/meal-plan" element={<MealPlanPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
