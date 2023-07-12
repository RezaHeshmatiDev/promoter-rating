import { useState, ReactNode, createContext, useEffect } from "react";
import { Filter } from "../components/Table/Table";

interface FilterContext {
  selectedFilterChanged(filer: Filter): void;
  getFilter(): Filter | undefined;
  clearFilters(location?: string): void;
  filters: FilterProps[];
}

export const FilterContext = createContext<FilterContext>({} as FilterContext);

interface Props {
  children: ReactNode;
}

interface FilterProps {
  filter: Filter;
  location: string;
}

export function FilterProvider({ children }: Props) {
  const [filters, setFilters] = useState<FilterProps[]>([]);

  const selectedFilterChanged = (filter: Filter) => {
    const previousFilters = [...filters];

    const index = filters.findIndex(
      (item) =>
        item.filter.filterCol === filter.filterCol ||
        item.location === window.location.pathname
    );

    if (index >= 0) {
      previousFilters[index].filter = filter;
      setFilters(previousFilters);
      return;
    }

    setFilters([
      ...previousFilters,
      { filter, location: window.location.pathname },
    ]);
  };

  const clearFilters = (location: string = window.location.pathname) => {
    const previousFilters = [...filters];

    console.log(location, "clear");
    const newFilters = previousFilters.filter(
      (item) => item.location !== location
    );

    setFilters(newFilters);
  };

  /**
   * @returns {Filter | undefined}
   */
  const getFilter = (): Filter | undefined => {
    const currentLocation = window.location.pathname;
    return filters.find((item) => item.location == currentLocation)?.filter;
  };

  return (
    <FilterContext.Provider
      value={{ filters, selectedFilterChanged, getFilter, clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
}
