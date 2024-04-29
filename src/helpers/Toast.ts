import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const toastNotify = (msg, timeout) => {
  toast(msg, {
    position: "top-center",
    autoClose: timeout,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    pauseOnFocusLoss: false,
    progress: undefined ,
    style: {
      backgroundColor: "#FF4589",
      color: "#D9D9D9",
      borderRadius: "0.75em",
    },

  });}

export default toastNotify
