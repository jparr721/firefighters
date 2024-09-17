import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./components/button";
import { tableTheme } from "./components/table";
import { headingTheme } from "./components/heading";
import { breadcrumbTheme } from "./components/breadcrumb";

export const theme = extendTheme({
  components: {
    Button: buttonTheme,
    Table: tableTheme,
    Heading: headingTheme,
    BreadcrumbItem: breadcrumbTheme,
    BreadcrumbLink: breadcrumbTheme,
    Breadcrumb: breadcrumbTheme,
  },
});
