import { Flex, Heading, VStack, Box } from "@chakra-ui/react";
import Toolbar, { ToolbarButton } from "../components/toolbar";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { getFoobar, getFoobarError } from "../queries/foobar";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import LoadingScreen from "../components/loading-screen";

interface HomeProps {
  foobarQuery: UseQueryResult<any, unknown>;
  foobarErrorQuery: UseQueryResult<any, unknown>;
}

const Home = ({ foobarQuery, foobarErrorQuery }: HomeProps) => {
  return foobarQuery.isLoading || foobarErrorQuery.isLoading ? (
    <LoadingScreen what="foobar" />
  ) : (
    <>
      <VStack>
        <Heading>Home</Heading>

        <pre style={{ color: "white" }}>
          {JSON.stringify(foobarQuery.data, null, 2)}
        </pre>
        <pre style={{ color: "red" }}>
          {JSON.stringify(foobarErrorQuery.error, null, 2)}
        </pre>
      </VStack>
    </>
  );
};

const Settings = () => {
  return <Heading>Settings</Heading>;
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "home";
  const [currentPage, setCurrentPage] = useState(page);

  const foobarQuery = useQuery({
    queryKey: ["foobar"],
    queryFn: getFoobar,
  });
  const foobarErrorQuery = useQuery({
    queryKey: ["foobarError"],
    queryFn: getFoobarError,
  });

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = (page: string) => {
    navigate(`?page=${page}`);
  };

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Toolbar>
        <ToolbarButton icon={FaHome} onClick={() => handlePageChange("home")} />
        <ToolbarButton
          icon={FaGear}
          onClick={() => handlePageChange("settings")}
        />
      </Toolbar>
      <Box flexGrow={1}>
        {currentPage === "home" ? (
          <Home foobarQuery={foobarQuery} foobarErrorQuery={foobarErrorQuery} />
        ) : (
          <Settings />
        )}
      </Box>
    </Flex>
  );
};

export default Index;
