import { useContext } from "react";
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
import { LoginContext } from "../contexts/LoginContext";
import Auth from "../components/Auth/Auth";

const MainRouter = () => {
  const { getUserData } = useContext(LoginContext);

  const isAdmin = getUserData()?.role === "admin";

  return (
    <Router>
      <Routes>
        {isAdmin ? (
          <>
            {/**
             * CashTurns
             */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/promoters" element={<Promoters />} />
            <Route path="/promoters/:id" element={<PromoterDetails />} />
            <Route
              path="/promoters/:promoterID/invoices/:invoiceID"
              element={<Invoices />}
            />

            <Route path="/signup" element={<Signup />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <Navigate
                  to="/promoters-rating/undefiend/invoices/undefiend"
                  replace
                />
              }
            />
            <Route
              path="/promoters-rating/:cashTurnId/invoices/:invoiceId"
              element={<PromotersRating />}
            />
          </>
        )}

        <Route path="/auth" element={<Auth />} />

        {/**
         * Page 404 not found
         */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
