import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RouterConfig from "./Navigation/RouterConfig";
import FullScreenLoader from "./components/Loader/FullScreenLoader";

function App() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <BrowserRouter>
        <RouterConfig />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar="false"
          newestOnTop="true"
          closeOnClick
          rtl={false}
          draggable
          theme="light"
          limit="2"
        />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
