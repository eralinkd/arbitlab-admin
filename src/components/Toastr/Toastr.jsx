import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

import React from "react";
import styled from "styled-components";

const CustomToastContainer = styled(ToastContainer)`
  &&& {
    top: 70px;
  }
`;

const Toastr = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    notify(message, type) {
      const options = {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };

      const toastTypes = {
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warn: toast.warn,
        default: toast,
      };

      const showToast = toastTypes[type] || toastTypes.default;
      showToast(message, options);
    },
  }));

  return <CustomToastContainer />;
});

export default Toastr;
