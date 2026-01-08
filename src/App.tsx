import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage";
import { DetailsPage } from "./pages/DetailsPage";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute, PublicOnlyRoute } from "./utils/RouterGuard";
import { useAuthContext } from "./context/AuthContextProvider";


const App = () => {
  const {accessToken} = useAuthContext();

  console.log(accessToken ? "Logged in" : "Not logged in");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={accessToken ? <DetailsPage /> : <LandingPage />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/details" element={<DetailsPage />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App