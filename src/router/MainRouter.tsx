import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import PageNotFound from "../pages/404";
import Promoters from "../pages/Promoters";
import PromoterDetails from "../pages/Promoters/Details";
import Dashboard from "../pages/Dashboard";
import PromotersRating from "../pages/CashTurns/PromotersRating";
import Invoices from "../pages/Invoices";
import Signup from "../components/Auth/Signup";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        {/**
         * CashTurns
         */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/promoters-rating/:cashTurnId/invoices/:invoiceId"
          element={<PromotersRating />}
        />
        <Route path="/promoters" element={<Promoters />} />
        <Route path="/promoters/:id" element={<PromoterDetails />} />
        <Route
          path="/promoters/:promoterID/invoices/:invoiceID"
          element={<Invoices />}
        />

        <Route path="/signup" element={<Signup />} />

        {/**
         * Page 404 not found
         */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
