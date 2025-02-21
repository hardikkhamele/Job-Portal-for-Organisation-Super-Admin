import React from "react";
import { Routes, Route } from "react-router-dom";
import { Card } from "./Card";
import { Settings, User } from "lucide-react";

import RevenueModel from "./RevenueModel";
import ProfitDashboard from "./ProfitDashboard";
import PlanDashboard from "./PlanDashboard";
import SellingDashboard from "./SellingDashboard";
import Transaction_Dashboard from "./Transaction_Dashboard";
import Transaction_History from "./Transaction_History";
import Footer from "./Footer";

export default function MainReven() {
  return (
    <div className="flex-1 overflow-auto px-4">
      <RevenueModel />
      <ProfitDashboard />
      <PlanDashboard />
      <SellingDashboard />

      <Transaction_Dashboard />
      <Transaction_History />
      <Footer />
    </div>
  );
}
