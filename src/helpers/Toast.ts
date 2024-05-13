import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const toastNotify = (msg, timeout, type) => {
  toast.dismiss()
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
      backgroundColor: type === "warning" ? "#FF4589" : "#00A1B3",
      color: "#D9D9D9",
      borderRadius: "0.75em",
    },

  });}

export default toastNotify
