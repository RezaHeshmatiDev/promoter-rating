import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FilterContext } from "../contexts/FilterContext";

const FilterMiddleware = () => {
  const location = useLocation();
  const { filters, clearFilters } = useContext(FilterContext);

  useEffect(() => {
    // Clear filters when pathname is not included on the filters location
    filters.forEach((item) => {
      if (!location.pathname.includes(item.location)) {
        clearFilters(item.location);
      }
    });
  }, [location.pathname]);

  return null;
};

export default FilterMiddleware;
