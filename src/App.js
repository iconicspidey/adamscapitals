import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e6f9ff",
      100: "#c2e2f2",
      200: "#9ecbeb",
      300: "#7ab3e3",
      400: "#579bdd",
      500: "#3a77c5",
      600: "#2c5b9e",
      700: "#1d3e78",
      800: "#0f2351",
      900: "#000c2b",
    },
    accent: {
      50: "#fff7e6",
      100: "#ffe1b2",
      200: "#ffc07f",
      300: "#ff9e4c",
      400: "#ff7d1a",
      500: "#e65a00",
      600: "#b34600",
      700: "#813100",
      800: "#4f1e00",
      900: "#1e0a00",
    },
    dark: {
      50: "#f5f5f5",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#262626",
      900: "#0d0d0d",
    },
  },
});

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
