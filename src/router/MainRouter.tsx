import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import CashTurns from "../pages/CashTurns";
import PageNotFound from "../pages/404";
import Promoters from "../pages/Promoters";
import PromoterDetails from "../pages/Promoters/Details";
import Dashboard from "../pages/Dashboard";
import PromotersRating from "../pages/CashTurns/PromotersRating";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        {/**
         * CashTurns
         */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cash-turns" element={<CashTurns />} />
        <Route
          path="/promoters-rating/:cashTurnId"
          element={<PromotersRating />}
        />
        <Route path="/promoters" element={<Promoters />} />
        <Route path="/promoters/:id" element={<PromoterDetails />} />

        {/**
         * Page 404 not found
         */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
