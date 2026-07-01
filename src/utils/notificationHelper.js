const STORAGE_KEY = "technohire_notifications";

const defaultNotifications = [
  {
    id: "seed-1",
    title: "Job Posted Successfully",
    message: "The new Senior React Developer job listing has been published successfully.",
    time: "Today, 11:30 AM",
    type: "success",
    isRead: false,
  },
  {
    id: "seed-2",
    title: "Payment Successful",
    message: "Payment of ₹15,000 for the Premium Employer Plan was successful.",
    time: "Yesterday, 4:15 PM",
    type: "success",
    isRead: false,
  },
  {
    id: "seed-3",
    title: "Email Updated",
    message: "Your primary administrator email has been successfully updated to admin@technohire.com.",
    time: "2 days ago",
    type: "info",
    isRead: false,
  },
  {
    id: "seed-4",
    title: "Password Changed",
    message: "Your account password was updated successfully.",
    time: "3 days ago",
    type: "success",
    isRead: false,
  },
  {
    id: "seed-5",
    title: "Password Reset Successful",
    message: "Password reset has been completed successfully via OTP verification.",
    time: "5 days ago",
    type: "success",
    isRead: false,
  }
];

export const getNotifications = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  const seeded = localStorage.getItem(STORAGE_KEY + "_seeded");

  if (!seeded || !data) {
    // Seed default notifications once on first load
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotifications));
    localStorage.setItem(STORAGE_KEY + "_seeded", "true");
    window.dispatchEvent(new Event("notificationsUpdated"));
    return defaultNotifications;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotifications));
    localStorage.setItem(STORAGE_KEY + "_seeded", "true");
    window.dispatchEvent(new Event("notificationsUpdated"));
    return defaultNotifications;
  }
};

export const saveNotifications = (notifications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  window.dispatchEvent(new Event("notificationsUpdated"));
};

export const addNotification = (title, message, type = "success") => {
  const notifications = getNotifications();
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + now.toLocaleDateString();
  };

  const newNotif = {
    id: Date.now().toString(),
    title,
    message,
    time: formatTime(),
    type,
    isRead: false,
  };
  notifications.unshift(newNotif);
  saveNotifications(notifications);
  return newNotif;
};

export const getUnreadCount = () => {
  const notifications = getNotifications();
  return notifications.filter((n) => !n.isRead).length;
};

export const markAllAsRead = () => {
  const notifications = getNotifications();
  let updated = false;
  const updatedNotifications = notifications.map((n) => {
    if (!n.isRead) {
      updated = true;
      return { ...n, isRead: true };
    }
    return n;
  });
  if (updated) {
    saveNotifications(updatedNotifications);
  }
};

export const clearNotifications = () => {
  saveNotifications([]);
};

// Expose helper methods to the window object for simulation and QA testing
if (typeof window !== "undefined") {
  window.addNotification = addNotification;
  window.clearNotifications = clearNotifications;
  window.getNotifications = getNotifications;
  window.getUnreadCount = getUnreadCount;
  window.triggerJobPostedNotification = () => addNotification("Job Posted Successfully", "The new Senior React Developer job listing has been published successfully.", "success");
  window.triggerPaymentNotification = () => addNotification("Payment Successful", "Payment of ₹15,000 for the Premium Employer Plan was successful.", "success");
  window.triggerEmailNotification = () => addNotification("Email Updated", "Your primary administrator email has been successfully updated to admin@technohire.com.", "info");
  window.triggerPasswordChangedNotification = () => addNotification("Password Changed", "Your account password was updated successfully.", "success");
  window.triggerPasswordResetNotification = () => addNotification("Password Reset Successful", "Password reset has been completed successfully via OTP verification.", "success");
}
