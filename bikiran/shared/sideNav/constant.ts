import { icons } from "@/bikiran/lib/icons";
import { NavItem } from "@/bikiran/shared/sideNav/NavMenuTypes";


export const menuArray: NavItem[] = [
    {
        id: 1,
        miniTitle: "User",
        title: "Users",
        iconLine: icons.iconSidebarUser,
        iconFill: icons.iconSidebarUserFill,
        subMenu: [
            {
              id: "1",
              title: "List of User",
              iconL: icons.iconSubmenuUser,
              iconF: icons.iconSubmenuUserFill,
            },
            {
              id: "2",
              title: "Properties",
              iconL: icons.iconSubmenuUser,
              iconF: icons.iconSubmenuUserFill,
            },
            {
              id: "3",
              title: "List of Email",
              iconL: icons.iconSubmenuMail,
              iconF: icons.iconSubmenuMailFill,
            },
            {
              id: "4",
              title: "List of Phone",
              iconL: icons.iconSubmenuPhone,
              iconF: icons.iconSubmenuPhoneFill,
            },
            {
              id: "5",
              title: "List of Address",
              iconL: icons.iconSubmenuAddress,
              iconF: icons.iconSubmenuAddressFill,
            },
            {
              id: "6",
              title: "List of Projects",
              iconL: icons.iconSubmenuApplication,
              iconF: icons.iconSubmenuApplicationFill,
            },
        ],
    },
    {
        id: 2,
        miniTitle: "domain",
        title: "Domain",
        iconLine: icons.iconSidebarDomain,
        iconFill: icons.iconSidebarDomainFill,
        subMenu: [
          {
            id: "1",
            title: "Domain Package",
            iconL: icons.iconSubmenuPricing,
            iconF: icons.iconSubmenuPricingFill,
          },
          {
            id: "2",
            title: "Subscriptions",
            iconL: icons.iconSubmenuInvoice,
            iconF: icons.iconSubmenuInvoiceFill,
          },
          {
            id: "3",
            title: "Delete Domain",
            iconL: icons.iconSubmenuDeleted,
            iconF: icons.iconSubmenuDeletedFill,
          },
        ]
    },
    {
        id: 3,
        miniTitle: "hosting",
        title: "Hosting",
        iconLine: icons.iconSidebarHosting,
        iconFill: icons.iconSidebarHostingFill,
        subMenu: [
          {
            id: "1",
            title: "Hosting Package",
            iconL: icons.iconSubmenuPricing,
            iconF: icons.iconSubmenuPricingFill,
          },
          {
            id: "2",
            title: "Subscriptions",
            iconL: icons.iconSubmenuHosting,
            iconF: icons.iconSubmenuHostingFill,
          },
          {
            id: "3",
            title: "cPanels",
            iconL: icons.iconSubmenuCPanel,
            iconF: icons.iconSubmenuCPanelFill,
          },
        ]
    },
    {
        id: 4,
        miniTitle: "appOcean",
        title: "AppOcean",
        iconLine: icons.iconSidebarSupport,
        iconFill: icons.iconSidebarSupportFill,
        subMenu: [
          {
            id: "1",
            title: "Apps List",
            iconL: icons.iconSubmenuPricing,
            iconF: icons.iconSubmenuPricingFill,
          },
          {
            id: "2",
            title: "Data List",
            iconL: icons.iconSubmenuHosting,
            iconF: icons.iconSubmenuHostingFill,
          },
          {
            id: "3",
            title: "Storage List",
            iconL: icons.iconSubmenuMail,
            iconF: icons.iconSubmenuMailFill,
          },
          {
            id: "4",
            title: "Proxy List",
            iconL: icons.iconSubmenuPhone,
            iconF: icons.iconSubmenuPhoneFill,
          },
          {
            id: "5",
            title: "Load Balancer List",
            iconL: icons.iconSubmenuAddress,
            iconF: icons.iconSubmenuAddressFill,
          },
          {
            id: "6",
            title: "Tunnel List",
            iconL: icons.iconSubmenuAddress,
            iconF: icons.iconSubmenuAddressFill,
          },
          {
            id: "7",
            title: "Domain List",
            iconL: icons.iconSubmenuAddress,
            iconF: icons.iconSubmenuAddressFill,
          },
          
        ]
    },
    {
        id: 5,
        miniTitle: "billing",
        title: "Billings",
        iconLine: icons.iconSidebarBilling,
        iconFill: icons.iconSidebarBillingFill,
        subMenu: [
          {
            id: "1",
            title: "Billing Account",
            iconL: icons.iconSubmenuBillingUser,
            iconF: icons.iconSubmenuBillingUserFill,
          },
          {
            id: "2",
            title: "Invoice Manage",
            iconL: icons.iconSubmenuInvoice,
            iconF: icons.iconSubmenuInvoiceFill,
          },
          {
            id: "3",
            title: "Transaction Manage",
            iconL: icons.iconSubmenuTransaction,
            iconF: icons.iconSubmenuTransactionFill,
          },
          {
            id: "4",
            title: "Gateway Transaction",
            iconL: icons.iconSubmenuGateway,
            iconF: icons.iconSubmenuGatewayFill,
          },
        ]
    },
    {
        id: 6,
        miniTitle: "manage",
        title: "Manage",
        iconLine: icons.iconSidebarManage,
        iconFill: icons.iconSidebarManageFill,
        subMenu: [
          {
            id: "1",
            title: "Invoice Execution",
            iconL: icons.iconSubmenuExecution,
            iconF: icons.iconSubmenuExecutionFill,
          },
          {
            id: "2",
            title: "Application",
            iconL: icons.iconSubmenuApplication,
            iconF: icons.iconSubmenuApplicationFill,
          },
          {
            id: "3",
            title: "Client List",
            iconL: icons.iconSubmenuClients,
            iconF: icons.iconSubmenuClientsFill,
          },
          {
            id: "4",
            title: "Manage Permission",
            iconL: icons.iconSubmenuPermission,
            iconF: icons.iconSubmenuPermissionFill,
          },
          {
            id: "5",
            title: "Server List",
            iconL: icons.iconSubmenuServer,
            iconF: icons.iconSubmenuServerFill,
          },
          {
            id: "6",
            title: "Currency Configuration",
            iconL: icons.iconSubmenuCurrency,
            iconF: icons.iconSubmenuCurrencyFill,
          },
          {
            id: "7",
            title: "Payment Methods",
            iconL: icons.iconSubmenuWalletLite,
            iconF: icons.iconSubmenuWalletActive,
          },
        ]
    },
    {
        id: 7,
        miniTitle: "support",
        title: "Support",
        iconLine: icons.iconSidebarSupport,
        iconFill: icons.iconSidebarSupportFill,
        subMenu: [
          {
            id: "1",
            title: "Support Ticket",
            iconL: icons.iconSubmenuSupport,
            iconF: icons.iconSubmenuSupportFill,
          },
          
        ]
    },
    {
        id: 8,
        miniTitle: "logs",
        title: "Logs",
        iconLine: icons.iconSidebarLog,
        iconFill: icons.iconSidebarLogFill,
        subMenu: [
          {
            id: "1",
            title: "User Activity Logs",
            iconL: icons.iconSubmenuUserActivity,
            iconF: icons.iconSubmenuUserActivityFill,
          },
          {
            id: "2",
            title: "Admin Activity",
            iconL: icons.iconSubmenuAdminActivity,
            iconF: icons.iconSubmenuAdminActivityFill,
          },
          {
            id: "3",
            title: "Unallocated Activity Log",
            iconL: icons.iconSubmenuUnlocatedLog,
            iconF: icons.iconSubmenuUnlocatedLogFill,
          },
          {
            id: "4",
            title: "Error Log",
            iconL: icons.iconSubmenuErrorLog,
            iconF: icons.iconSubmenuErrorLogFill,
          },
          {
            id: "5",
            title: "Test Log",
            iconL: icons.iconSubmenuUnlocatedLog,
            iconF: icons.iconSubmenuUnlocatedLogFill,
          },
        ]
    },
    {
        id: 9,
        miniTitle: "emailNotification",
        title: "Email Notification",
        iconLine: icons.iconSidebarEmailNotification,
        iconFill: icons.iconSidebarEmailNotificationFill,
        subMenu: [
          {
            id: "1",
            title: "Configuration",
            iconL: icons.iconSubmenuEN,
            iconF: icons.iconSubmenuENFill,
          },
          
        ]
    }
]


