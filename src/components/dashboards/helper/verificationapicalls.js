import { API } from "../../../backend";
import Verification from "../../Verification";

export const createVerification = (userId, token, verificationData) => {
  console.log(verificationData);
  console.log(API);
  return fetch(`${API}/create/verification/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(verificationData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllverifications = (userId, token) => {
  console.log(userId);
  return fetch(`${API}/view/allverifications/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getVerification = (userId, token, verificationId) => {
  console.log(userId, verificationId);
  return fetch(`${API}/view/verifications/${userId}/${verificationId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const giveVotingRight = (adminId, token, userId) => {
  return fetch(`${API}/user/${adminId}/giveVotingRight`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateStatus = (userId, token, verificationId, status) => {
  console.log(status);
  return fetch(`${API}/verification/${verificationId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, verificationId }),
  })
    .then((response) => {
      //
      response.json();
    })
    .catch((err) => console.log(err));
};
