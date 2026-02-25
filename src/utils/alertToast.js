import Swal from "sweetalert2";

export const confirmAlert = (message) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });
};

export const confirmBlock = (message) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Block it!",
    cancelButtonText: "Cancel",
  });
};
export const confirmUnblock = (message) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Unblock it!",
    cancelButtonText: "Cancel",
  });
};

export const confirmDisable = (message) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Disable it!",
    cancelButtonText: "Cancel",
  });
};

export const confirmEnable = (message) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Enable it!",
    cancelButtonText: "Cancel",
  });
};

export const confirmLogout = (message) => {
  return Swal.fire({
    title: "Do you want to logout?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Logout",
    cancelButtonText: "Cancel",
  });
};

