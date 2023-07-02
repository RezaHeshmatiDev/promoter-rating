import { Grow } from "@mui/material";
import { CacheProvider } from "@emotion/react";

import MainRouter from "./router/MainRouter";
import ThemeProvider from "./theme/ThemeProvider";
import createEmotionCache from "./createEmotionCache";
import { SnackbarProvider } from "notistack";
import SnackHOC from "./components/Snack/SnackHOC";
import { SidebarProvider } from "./contexts/SidebarContext";
import { LoginProvider } from "./contexts/LoginContext";
import Auth from "./components/Auth/Auth";
import Socket from "./services/socket";

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
              <SnackHOC />
              <Auth />
              <Socket />
              <MainRouter />
            </SidebarProvider>
          </LoginProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
