import { API_URL } from "../config";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: API_URL,
  withCredentials: true,
});

const setupAxiosInterceptors = (toastrRef) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API call failed. Error: ", error);
      // localStorage.removeItem("jwtToken");
      if (toastrRef && toastrRef.current) {
        toastrRef.current.notify("Что-то пошло не так...", "error");
      } else {
        console.log("toastrRef BROKEN!!!!!!", toastrRef);
      }
      return new Promise(() => {});
    }
  );
};

export { axiosInstance, setupAxiosInterceptors };

// transfer
export const putTransferCancel = async (id) => {
  const response = await axiosInstance.put(`/transfer/cancel/${id}`);
  return response.data;
};

export const getTransferById = async (id) => {
  const response = await axiosInstance.get(`/transfer/${id}`);
  return response.data;
};

export const getAllTransfers = async () => {
  const response = await axiosInstance.get(`/transfer/getAll`);
  return response.data;
};

export const getAllTransfersByUserId = async (userId) => {
  const response = await axiosInstance.get(`/transfer/getAll/${userId}`);
  return response.data;
};

// users
export const postUserWithdrawBalance = async (userId, amount) => {
  const response = await axiosInstance.post(
    `/users/withdrawBalance/${userId}`,
    {
      amount,
    }
  );
  return response.data;
};

export const postUserTranferBalance = async (userId, amount) => {
  const response = await axiosInstance.post(
    `/users/transferBalance/${userId}`,
    {
      amount,
    }
  );
  return response.data;
};

export const postUserReplenishBalance = async (userId, amount) => {
  const response = await axiosInstance.post(
    `/users/replenishBalance/${userId}`,
    {
      amount,
    }
  );
  return response.data;
};

export const postUserRemoveAdmin = async (userId) => {
  const response = await axiosInstance.post(`/users/removeAdmin`,
    {
      email: userId
    }
  );
  return response.data;
};

export const postUserBanUserStructure = async (userId, ban) => {
  const response = await axiosInstance.post(`/users/banUserStructure/${userId}`, {
    ban,
  });
  return response.data;
};

export const postUserBanUser = async (userId, ban) => {
  const response = await axiosInstance.post(`/users/banUser/${userId}`, {
    ban,
  });
  return response.data;
};

export const postUserAppointAdminByTg = async (userId) => {
  const response = await axiosInstance.post(
    `/users/appointAdminByTg/${userId}`
  );
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get(`/users`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const getUserInfo = async (email) => {
  const response = await axiosInstance.get(`/users/userInfo/${123}`);
  return response.data;
};

// payment
export const putWithdrawCancel = async (id) => {
  const response = await axiosInstance.put(`/payment/withdraw/cancel/${id}`);
  return response.data;
}
export const putPaymentConfirm = async (id) => {
  const response = await axiosInstance.put(`/payment/confirm/${id}`);
  return response.data;
};

export const getAllWithdraws = async () => {
  const response = await axiosInstance.get(`/payment/withdraw`);
  return response.data;
};

export const getAllWithdrawsByUserId = async (userId) => {
  const response = await axiosInstance.get(`/payment/withdraw/${userId}`);
  return response.data;
};

export const getAllReplenishments = async () => {
  const response = await axiosInstance.get(`/payment/replenishment`);
  return response.data;
};

export const getAllReplenishmentsByUserId = async (userId) => {
  const response = await axiosInstance.get(`/payment/replenishment/${userId}`);
  return response.data;
};

// authentication
export const postLogin = async (email, password) => {
  const response = await axiosInstance.post(`/auth/login`, {
    email,
    password,
  });
  return response.data;
};

// ligament coll
export const getLigamentCollByUserId = async (userId) => {
  const response = await axiosInstance.get(`/ligamentColl/getByUser/${userId}`);
  return response.data;
};

export const getLigamentCollByLigamentId = async (id) => {
  const response = await axiosInstance.post(`/ligamentColl/${id}`);
  return response.data;
};

export const getAllLigamentColls = async () => {
  const response = await axiosInstance.get(`/ligamentColl/getAll`);
  return response.data;
};

export const getLigamentCollCancel = async (id) => {
  const response = await axiosInstance.get(`/ligamentColl/cancel/${id}`);
  return response.data;
};

// ligament
export const getLigament = async (id) => {
  const response = await axiosInstance.get(`/ligament/${id}`);
  return response.data;
};

export const putLigament = async (id, data) => {
  const response = await axiosInstance.put(`/ligament/${id}`, data);
  return response.data;
};

export const deleteLigament = async (id) => {
  const response = await axiosInstance.delete(`/ligament/${id}`);
  return response.data;
};

export const postLigament = async (data) => {
  const response = await axiosInstance.post(`/ligament`, data);
  return response.data;
};

export const getAllLigaments = async () => {
  const response = await axiosInstance.get(`/ligament/getAll`);
  return response.data;
};

// subscription
export const getSubscriptionInfo = async (level) => {
  const response = await axiosInstance.get(`/subscription/${level}`);
  return response.data;
};

export const putSubscription = async (level, data) => {
  const response = await axiosInstance.put(`/subscription/${level}`, data);
  return response.data;
};

export const deleteSubscription = async (level) => {
  const response = await axiosInstance.delete(`/subscription/${level}`);
  return response.data;
};

export const getSubscription = async () => {
  const response = await axiosInstance.get(`/subscription`);
  return response.data;
};

export const postSubscription = async (data) => {
  const response = await axiosInstance.post(`/subscription`, data);
  return response.data;
};

// promocode
export const postPromocode = async (data) => {
  const response = await axiosInstance.post(`/promocode`, data);
  return response.data;
};

export const getAllPromocodes = async () => {
  const response = await axiosInstance.get(`/promocode/getAll`);
  return response.data;
};

export const deletePromocode = async (id) => {
  const response = await axiosInstance.delete(`/promocode/${id}`);
  return response.data;
};
