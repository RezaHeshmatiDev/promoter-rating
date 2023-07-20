import { Grow, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";

import MainRouter from "./router/MainRouter";
import ThemeProvider from "./theme/ThemeProvider";
import createEmotionCache from "./createEmotionCache";
import SnackHOC from "./components/Snack/SnackHOC";
import { SidebarProvider } from "./contexts/SidebarContext";
import { LoginProvider } from "./contexts/LoginContext";
import Socket from "./services/socket";
import { FilterProvider } from "./contexts/FilterContext";
import DialogAlert from "./components/DialogAlert";
import { HeaderProvider } from "./contexts/HeaderContext";

const clientSideEmotionCache = createEmotionCache();

const App = () => {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={3}
          preventDuplicate
          autoHideDuration={2000}
          hideIconVariant
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={Grow}
        >
          <LoginProvider>
            <SidebarProvider>
              <HeaderProvider>
                <FilterProvider>
                  <CssBaseline />
                  <SnackHOC />
                  <Socket />
                  <DialogAlert />
                  <MainRouter />
                </FilterProvider>
              </HeaderProvider>
            </SidebarProvider>
          </LoginProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
