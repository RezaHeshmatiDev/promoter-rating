import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import Home from "../pages/Home";
import PageNotFound from "../pages/404";
import Promoters from "../pages/Promoters";
import PromoterDetails from "../pages/Promoters/Details";
import Dashboard from "../pages/Dashboard";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        {/**
         * Home
         */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/promoters" element={<Promoters />} />
        <Route path="/promoters/:id" element={<PromoterDetails />} />

        {/**
           Page 404 not found
           */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
