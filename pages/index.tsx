import type { NextPage } from "next";
import Navbar from "../Components/Navbar";
import { Box } from "@chakra-ui/layout";
const Home: NextPage = () => {
  return (
    <>
      <Navbar />

      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        Hello World
      </Box>
    </>
  );
};

export default Home;
