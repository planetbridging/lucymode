import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import TG from "./templateGenerator/tg";
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <TG />
      </ChakraProvider>
    </div>
  );
}

export default App;
