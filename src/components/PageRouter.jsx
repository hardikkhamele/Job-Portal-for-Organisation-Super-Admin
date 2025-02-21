import React from "react";
import { Routes, Route } from "react-router-dom";
import MainsubMan from "./components/Main-sub-Management";
import SubscriptionManagementEdit from "./SubscriptionManagementEdit";

function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainsubMan />}></Route>
      <Route
        path="/SubscriptionManagementEdit"
        element={<SubscriptionManagementEdit />}
      ></Route>
    </Routes>
  );
}

export default PageRouter;
