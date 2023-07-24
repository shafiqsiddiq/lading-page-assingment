import { toast } from "react-toastify";

const ToastifyFunc = (message, type) => {
  type = type ? "success" : "error";
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export default ToastifyFunc;
