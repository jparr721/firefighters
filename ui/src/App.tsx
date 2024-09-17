import "./App.css";

import { Box } from "@chakra-ui/react";
import { Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages";
import NavBar, { NavBarProps } from "./components/navbar";
import React from "react";
import styles from "./styles";
import NotFound from "./components/not-found";

export default function App() {
  return (
    <Box backgroundColor={styles.colors.primary}>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Box>
  );
}

const Layout: React.FC = () => {
  const routes: NavBarProps = {
    items: [{ name: "Home", href: "/" }],
  };

  return (
    <div>
      <NavBar {...routes} />
      <Box
        borderWidth={1}
        borderColor={styles.colors.border}
        background={styles.colors.secondary}
      >
        <Outlet />
      </Box>
    </div>
  );
};
