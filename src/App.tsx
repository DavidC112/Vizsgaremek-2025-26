import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { DashBoardPage } from "./pages/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute, PublicOnlyRoute } from "./utils/RouterGuard";
import { useAuthContext } from "./context/AuthContextProvider";
import ScrollToTop from "./utils/ScrollToTop";
import SignUpPage from "./pages/SignUpPage";
import PersistentLogin from "./utils/PersistentLogin";
import UserAdmin from "./components/AdminPage/UserAdmin";
import ActivityAdmin from "./components/AdminPage/ActivityAdmin";
import IngredientAdmin from "./components/AdminPage/IngredientAdmin";
import RecipeAdmin from "./components/AdminPage/RecipeAdmin";
import AdminPage from "./pages/AdminPage";

const App = () => {
  const { accessToken } = useAuthContext();

  console.log(accessToken ? "Logged in" : "Not logged in");

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PersistentLogin />}>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route
            path="/"
            element={accessToken ? <DashBoardPage /> : <LandingPage />}
          />

          <Route path="/admin" element={<AdminPage/>}>
            
            <Route index element={<Navigate to="activities" replace />} />
            <Route path="users" element={<UserAdmin/>}/>
            <Route path="activities" element={<ActivityAdmin/>}/>
            <Route path="ingredients" element={<IngredientAdmin/>}/>
            <Route path="recipes" element={<RecipeAdmin/>}/>
          </Route>

          <Route path="/register" element={<SignUpPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/details" element={<DashBoardPage />} />
            {/* TODO: Add elements */}
            <Route path="/recipes" />
            <Route path="/recipes/:id" />
            <Route path="/meal-plan" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
