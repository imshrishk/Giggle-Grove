import React from 'react';
import { ChakraProvider, Box, VStack, Grid } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ColorModeSwitcher } from "./ColorModeSwitcher"; // Named import
import customTheme from "./utils/customTheme";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Restaurants from "./pages/Restaurants";
import Orders from "./pages/Orders";

function App() {
  const token = localStorage.getItem("token");

  return (
    <ChakraProvider theme={customTheme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Box className="top-bar" mb={8}>
            <Navbar />
            <ColorModeSwitcher justifySelf="flex-end" className="colorMode-button" />
          </Box>
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/orders" element={token ? <Orders /> : <Navigate to="/signin" />} />
                <Route path="/restaurants" element={token ? <Restaurants /> : <Navigate to="/signin" />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </VStack>
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;