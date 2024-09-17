import { Flex, Box } from "@chakra-ui/react";
import Toolbar, { ToolbarButton } from "../components/toolbar";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FaFire, FaGear } from "react-icons/fa6";
import Home from "./home";
import Settings from "./settings";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "home";
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = (page: string) => {
    navigate(`?page=${page}`);
  };

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Toolbar>
        <ToolbarButton icon={FaFire} onClick={() => handlePageChange("home")} />
        <ToolbarButton
          icon={FaGear}
          onClick={() => handlePageChange("settings")}
        />
      </Toolbar>
      <Box flexGrow={1}>{currentPage === "home" ? <Home /> : <Settings />}</Box>
    </Flex>
  );
};

export default Index;
