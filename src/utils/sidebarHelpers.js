import {
  adminRoleManagementIcon,
  appManagementIcon,
  blockedUserandStaffsIcon,
  blogManagementIcon,
  chatSupportSystemIcon,
  coinSettingIcon,
  commentandReviewIcon,
  commissionsettingsIcon,
  countryManagementIcon,
  dashboardIcon,
  helpAndSupportIcon,
  luckyDrawAnalysisIcon,
  luckyDrawManagementIcon,
  manageBannerIcon,
  manageReddemRequestIcon,
  offerManagementIcon,
  orderManagementIcon,
  otherSettingsIcon,
  privicyPolicyIcon,
  productManagementIcon,
  referandearnIcon,
  refferralTrackingIcon,
  reportandanalyticsIcon,
  reportsIcon,
  rewardManagementIcon,
  spinRewardManagementIcon,
  staffCommissionIcon,
  staffManagementIcon,
  staffPerformanceIcon,
  targetManagementIcon,
  termAndConditionsIcon,
  themecustomizationIcon,
  uploadVideoIcon,
  userCommissionIcon,
  userManagementIcon,
} from "../assets/sidebaricon/sidebaricon";
import { FiInfo } from "react-icons/fi";

export const hasSubAdminAccess = (subAdminAccess, moduleName) => {
  if (!subAdminAccess || !Array.isArray(subAdminAccess)) return false;

  const module = subAdminAccess.find(
    (item) =>
      item.moduleName === moduleName ||
      (item.parentModuleName && item.parentModuleName === moduleName)
  );

  return module && module.accessTypes && module.accessTypes.length > 0;
};

export const filterNavigationItems = (
  items,
  subAdminAccess,
  isAdminLoggedIn
) => {
  if (isAdminLoggedIn) {
    return items;
  }
  const filteredItems = items
    .map((item) => {
      const itemCopy = { ...item };

      const hasParentAccess = hasSubAdminAccess(subAdminAccess, item.title);

      if (item.subItems) {
        const accessibleSubItems = item.subItems.filter((subItem) =>
          hasSubAdminAccess(subAdminAccess, subItem.title)
        );

        itemCopy.subItems = accessibleSubItems;
        const shouldShow = accessibleSubItems.length > 0 || hasParentAccess;

        return shouldShow ? itemCopy : null;
      }

      return hasParentAccess ? itemCopy : null;
    })
    .filter(Boolean);
  return filteredItems;
};

export const debugAccessibleModules = (subAdminAccess, navigationItems) => {
  if (!subAdminAccess) return;
  navigationItems.forEach((item) => {
    const hasAccess = hasSubAdminAccess(subAdminAccess, item.title);
    console.log(`- ${item.title}: ${hasAccess ? "ACCESSIBLE" : "NO ACCESS"}`);

    if (item.subItems) {
      item.subItems.forEach((subItem) => {
        const subHasAccess = hasSubAdminAccess(subAdminAccess, subItem.title);
        console.log(
          `  └─ ${subItem.title}: ${subHasAccess ? "ACCESSIBLE" : "NO ACCESS"}`
        );
      });
    }
  });
};

export const allNavigationItems = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    icon: dashboardIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 3,
    title: "User Management",
    url: "/user-management",
    icon: userManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 2,
    title: "Staff Management",
    url: "/staff-management",
    icon: staffManagementIcon,
    badge: null,
    color: "blue",
  },

  {
    id: 4,
    title: "Promoter Management",
    url: "/promoter-management",
    icon: staffManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 5,
    title: "Product Management",
    url: "/product-management",
    icon: productManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 6,
    title: "Order Management",
    url: "/order-management",
    icon: orderManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 7,
    title: "Offer Management",
    url: "/offer-management",
    icon: offerManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 8,
    title: "Blog Management",
    url: "/blog-management",
    icon: blogManagementIcon,
    badge: null,
    color: "blue",
  },
  {
    id: 9,
    title: "Reward Management",
    url: "/lucky-draw-management",
    icon: rewardManagementIcon,
    badge: null,
    color: "purple",
    hasSubmenu: true,
    subItems: [
      {
        id: 21,
        title: "Lucky Draw Management",
        url: "/lucky-draw-management",
        icon: luckyDrawManagementIcon,
        badge: null,
        color: "blue",
      },
      {
        id: 22,
        title: "Spin Reward Management",
        url: "/spin-reward-management",
        icon: spinRewardManagementIcon,
        badge: null,
        color: "purple",
      },
    ],
  },
  {
    id: 10,
    title: "Refer & Earn ",
    url: "/refer-and-earn-user",
    icon: referandearnIcon,
    badge: null,
    color: "green",
    hasSubmenu: true,
    subItems: [
      {
        id: 31,
        title: "Referral Tracking",
        url: "/refer-and-earn-user",
        icon: refferralTrackingIcon,
        badge: null,
        color: "Pink",
      },
      {
        id: 32,
        title: "Upload Video",
        url: "/upload-video",
        icon: uploadVideoIcon,
        badge: null,
        color: "purple",
      },
    ],
  },
  {
    id: 11,
    title: "Report & Analytics",
    url: "/reports",
    icon: reportandanalyticsIcon,
    badge: null,
    color: "orange",
    hasSubmenu: true,
    subItems: [
      {
        id: 41,
        title: "Reports",
        url: "/reports",
        icon: reportsIcon,
        badge: null,
        color: "purple",
      },
      {
        id: 42,
        title: "Staff Performance",
        url: "/staff-performance",
        icon: staffPerformanceIcon,
        badge: null,
        color: "yellow",
      },
      {
        id: 43,
        title: "Lucky Draw Analysis",
        url: "/lucky-draw-analysis",
        icon: luckyDrawAnalysisIcon,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 12,
    title: "Monetary Settings",
    url: "/commission-settings",
    icon: commissionsettingsIcon,
    badge: null,
    color: "red",
    hasSubmenu: true,
    subItems: [
      {
        id: 51,
        title: "Commission Settings",
        url: "/commission-settings",
        icon: staffCommissionIcon,
        badge: null,
        color: "blue",
      },
      {
        id: 52,
        title: "Coin Settings",
        url: "/coin-settings",
        icon: coinSettingIcon,
        badge: null,
        color: "yellow",
      },
      {
        id: 53,
        title: "Withdraw Settings",
        url: "/withdraw-settings",
        icon: productManagementIcon,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 13,
    title: "Target Management",
    url: "/target-management",
    icon: targetManagementIcon,
    badge: null,
    color: "pink",
  },
  {
    id: 14,
    title: "Country Management",
    url: "/country-management",
    icon: countryManagementIcon,
    badge: null,
    color: "yellow",
  },
  {
    id: 15,
    title: "Send Notification",
    url: "/notification-management/send-notification",
    icon: productManagementIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 17,
    title: "Manage Redeem Request",
    url: "/manage-redeem-request",
    icon: manageReddemRequestIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 18,
    title: "Chat Support System",
    url: "/chat-support-system",
    icon: chatSupportSystemIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 19,
    title: "Sub Admin Management",
    url: "/sub-admin/roles",
    icon: adminRoleManagementIcon,
    badge: null,
    color: "gray",
    hasSubmenu: true,
    subItems: [
      {
        id: 71,
        title: "Roles",
        url: "/sub-admin/roles",
        icon: adminRoleManagementIcon,
        badge: null,
        color: "blue",
      },
      {
        id: 72,
        title: "Users",
        url: "/sub-admin/users",
        icon: adminRoleManagementIcon,
        badge: null,
        color: "purple",
      },
      {
        id: 73,
        title: "Sub-Admin Permission",
        url: "/sub-admin/user-permissions",
        icon: adminRoleManagementIcon,
        badge: null,
        color: "yellow",
      },
    ],
  },
  {
    id: 20,
    title: "Comment & Reviews",
    url: "/manage-comments",
    icon: commentandReviewIcon,
    badge: null,
    color: "gray",
  },
  {
    id: 21,
    title: "App Management",
    url: "/app-management/about-us",
    icon: appManagementIcon,
    badge: null,
    color: "gray",
    hasSubmenu: true,
    subItems: [
      {
        id: 61,
        title: "About Us",
        url: "/app-management/about-us",
        icon: FiInfo,
        badge: null,
        color: "yellow",
      },
      {
        id: 62,
        title: "Terms & Conditions",
        url: "/app-management/terms-and-conditions",
        icon: termAndConditionsIcon,
        badge: null,
        color: "blue",
      },
      {
        id: 63,
        title: "Privacy  Policy",
        url: "/app-management/privacy-policy",
        icon: privicyPolicyIcon,
        badge: null,
        color: "purple",
      },
      {
        id: 64,
        title: "Manage Banner",
        url: "/app-management/manage-banner",
        icon: manageBannerIcon,
        badge: null,
        color: "yellow",
      },
      {
        id: 68,
        title: "Stories Section",
        url: "/app-management/stories-section",
        icon: FiInfo,
        badge: null,
        color: "yellow",
      },
      {
        id: 69,
        title: "Product Unboxing",
        url: "/app-management/product-unboxing",
        icon: FiInfo,
        badge: null,
        color: "yellow",
      },
      {
        id: 70,
        title: "Testimonials",
        url: "/app-management/testimonials",
        icon: FiInfo,
        badge: null,
        color: "yellow",
      },
      {
        id: 65,
        title: "Help & Support",
        url: "/app-management/help-and-support",
        icon: helpAndSupportIcon,
        badge: null,
        color: "yellow",
      },
      {
        id: 66,
        title: "Other Settings",
        url: "/app-management/other-settings",
        icon: otherSettingsIcon,
        badge: null,
        color: "yellow",
      },
      {
        id: 67,
        title: "FAQ",
        url: "/app-management/faq",
        icon: otherSettingsIcon,
        badge: null,
        color: "yellow",
      },
    ],
  },
];
