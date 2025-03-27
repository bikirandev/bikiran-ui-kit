import { icons } from "@/bikiran/lib/icons";
import { NavItem } from "@/bikiran/shared/sideNav/NavMenuTypes";

export const menuArray: NavItem[] = [
    // {
    //     id: "user",
    //     miniTitle: "User",
    //     title: "Users",
    //     iconLine: icons.iconSidebarUser,
    //     iconFill: icons.iconSidebarUserFill,
    //     subMenu: [
    //         {
    //           id: "/user/list",
    //           title: "List of User",
    //           iconL: icons.iconSubmenuUser,
    //           iconF: icons.iconSubmenuUserFill,
    //         },
    //         {
    //           id: "/user/properties",
    //           title: "Properties",
    //           iconL: icons.iconSubmenuUser,
    //           iconF: icons.iconSubmenuUserFill,
    //         },
    //         {
    //           id: "/user/email",
    //           title: "List of Email",
    //           iconL: icons.iconSubmenuMail,
    //           iconF: icons.iconSubmenuMailFill,
    //         },
    //         {
    //           id: "/user/phones",
    //           title: "List of Phones",
    //           iconL: icons.iconSubmenuPhone,
    //           iconF: icons.iconSubmenuPhoneFill,
    //         },
    //         {
    //           id: "/user/address",
    //           title: "List of Address",
    //           iconL: icons.iconSubmenuAddress,
    //           iconF: icons.iconSubmenuAddressFill,
    //         },
    //         {
    //           id: "/user/projects",
    //           title: "List of Projects",
    //           iconL: icons.iconSubmenuApplication,
    //           iconF: icons.iconSubmenuApplicationFill,
    //         },
    //     ],
    // },
    {
      id: "component",
      miniTitle: "component",
      title: "Component",
      iconLine: icons.iconSidebarBilling,
      iconFill: icons.iconSidebarBillingFill,
      subMenu: [
        {
          id: "/component/reboot",
          title: "Reboot",
          iconL: icons.iconSubmenuPricing,
          iconF: icons.iconSubmenuPricingFill,
        },
        {
          id: "/component/typography",
          title: "Typography",
          iconL: icons.iconSubmenuInvoice,
          iconF: icons.iconSubmenuInvoiceFill,
        },
        {
          id: "/component/tables",
          title: "Tables",
          iconL: icons.iconSubmenuTable,
          iconF: icons.iconSubmenuTableFill,
        },
        {
          id: "/component/buttons",
          title: "Buttons",
          iconL: icons.iconSubmenuButton,
          iconF: icons.iconSubmenuButtonFill,
        },
        {
          id: "/component/forms",
          title: "Forms",
          iconL: icons.iconSubmenuUser,
          iconF: icons.iconSubmenuUserFill,
        },
      
      ]
  },
  {
    id: "product",
    miniTitle: "product",
    title: "Product",
    iconLine: icons.iconSidebarSupport,
    iconFill: icons.iconSidebarSupportFill,
    subMenu: [
      {
        id: "/product/appOcean",
        title: "AppOcean",
        iconL: icons.iconSubmenuPricing,
        iconF: icons.iconSubmenuPricingFill,
      },
      {
        id: "/product/edusoft",
        title: "EduSoft",
        iconL: icons.iconSubmenuHosting,
        iconF: icons.iconSubmenuHostingFill,
      },
      {
        id: "/product/hosting",
        title: "Hosting",
        iconL: icons.iconSubmenuMail,
        iconF: icons.iconSubmenuMailFill,
      },
      {
        id: "/product/domain",
        title: "Domain",
        iconL: icons.iconSubmenuPhone,
        iconF: icons.iconSubmenuPhoneFill,
      },
      {
        id: "/product/support",
        title: "Support",
        iconL: icons.iconSubmenuPricing,
        iconF: icons.iconSubmenuPricingFill,
      },
    ]
},
    {
        id: "domain",
        miniTitle: "domain",
        title: "Domain",
        iconLine: icons.iconSidebarDomain,
        iconFill: icons.iconSidebarDomainFill,
        subMenu: [
          {
            id: "/domain/package",
            title: "Domain Package",
            iconL: icons.iconSubmenuPricing,
            iconF: icons.iconSubmenuPricingFill,
          },
          {
            id: "/domain/subscriptions",
            title: "Subscriptions",
            iconL: icons.iconSubmenuInvoice,
            iconF: icons.iconSubmenuInvoiceFill,
          },
          {
            id: "/domain/delete-domain-list",
            title: "Delete Domain",
            iconL: icons.iconSubmenuDeleted,
            iconF: icons.iconSubmenuDeletedFill,
          },
        ]
    },
    {
      id: "hosting",
      miniTitle: "hosting",
      title: "Hosting",
      iconLine: icons.iconSidebarHosting,
      iconFill: icons.iconSidebarHostingFill,
      subMenu: [
        {
          id: "/hosting/package",
          title: "Hosting Package",
          iconL: icons.iconSubmenuPricing,
          iconF: icons.iconSubmenuPricingFill,
        },
        {
          id: "/hosting/subscriptions",
          title: "Subscriptions",
          iconL: icons.iconSubmenuHosting,
          iconF: icons.iconSubmenuHostingFill,
        },
        {
          id: "/hosting/cPanels",
          title: "cPanels",
          iconL: icons.iconSubmenuCPanel,
          iconF: icons.iconSubmenuCPanelFill,
        },
      ]
  },
   
   
    {
        id: "appOcean",
        miniTitle: "appOcean",
        title: "AppOcean",
        iconLine: icons.iconSidebarSupport,
        iconFill: icons.iconSidebarSupportFill,
        subMenu: [
          {
            id: "/appOcean/apps-list",
            title: "Apps List",
            iconL: icons.iconSubmenuPricing,
            iconF: icons.iconSubmenuPricingFill,
          },
          {
            id: "/appOcean/data-list",
            title: "Data List",
            iconL: icons.iconSubmenuHosting,
            iconF: icons.iconSubmenuHostingFill,
          },
          {
            id: "/appOcean/storage-list",
            title: "Storage List",
            iconL: icons.iconSubmenuMail,
            iconF: icons.iconSubmenuMailFill,
          },
          {
            id: "/appOcean/proxy-list",
            title: "Proxy List",
            iconL: icons.iconSubmenuPhone,
            iconF: icons.iconSubmenuPhoneFill,
          },
          {
            id: "/appOcean/load-balancer-list",
            title: "Load Balancer List",
            iconL: icons.iconSubmenuAddress,
            iconF: icons.iconSubmenuAddressFill,
          },
          {
            id: "/appOcean/tunnel-list",
            title: "Tunnel List",
            iconL: icons.iconSubmenuAddress,
            iconF: icons.iconSubmenuAddressFill,
          },
          {
            id: "/appOcean/domain-list",
            title: "Domain List",
            iconL: icons.iconSubmenuAddress,
            iconF: icons.iconSubmenuAddressFill,
          },
          
        ]
    },
    {
        id: "billing",
        miniTitle: "billing",
        title: "Billings",
        iconLine: icons.iconSidebarBilling,
        iconFill: icons.iconSidebarBillingFill,
        subMenu: [
          {
            id: "/billing/account",
            title: "Billing Account",
            iconL: icons.iconSubmenuBillingUser,
            iconF: icons.iconSubmenuBillingUserFill,
          },
          {
            id: "/billing/invoice",
            title: "Invoice Manage",
            iconL: icons.iconSubmenuInvoice,
            iconF: icons.iconSubmenuInvoiceFill,
          },
          {
            id: "/billing/transaction",
            title: "Transaction Manage",
            iconL: icons.iconSubmenuTransaction,
            iconF: icons.iconSubmenuTransactionFill,
          },
          {
            id: "/billing/gateway",
            title: "Gateway Transaction",
            iconL: icons.iconSubmenuGateway,
            iconF: icons.iconSubmenuGatewayFill,
          },
        ]
    },
    {
        id: "manage",
        miniTitle: "manage",
        title: "Manage",
        iconLine: icons.iconSidebarManage,
        iconFill: icons.iconSidebarManageFill,
        subMenu: [
          {
            id: "/manage/invoice-execution",
            title: "Invoice Execution",
            iconL: icons.iconSubmenuExecution,
            iconF: icons.iconSubmenuExecutionFill,
          },
          {
            id: "/manage/application",
            title: "Application",
            iconL: icons.iconSubmenuApplication,
            iconF: icons.iconSubmenuApplicationFill,
          },
          {
            id: "/manage/client-list",
            title: "Client List",
            iconL: icons.iconSubmenuClients,
            iconF: icons.iconSubmenuClientsFill,
          },
          {
            id: "/manage/permission",
            title: "Manage Permission",
            iconL: icons.iconSubmenuPermission,
            iconF: icons.iconSubmenuPermissionFill,
          },
          {
            id: "/manage/server-list",
            title: "Server List",
            iconL: icons.iconSubmenuServer,
            iconF: icons.iconSubmenuServerFill,
          },
          {
            id: "/manage/currency-configuration",
            title: "Currency Configuration",
            iconL: icons.iconSubmenuCurrency,
            iconF: icons.iconSubmenuCurrencyFill,
          },
          {
            id: "/manage/payment-methods",
            title: "Payment Methods",
            iconL: icons.iconSubmenuWalletLite,
            iconF: icons.iconSubmenuWalletActive,
          },
        ]
    },
    {
        id: "support",
        miniTitle: "support",
        title: "Support",
        iconLine: icons.iconSidebarSupport,
        iconFill: icons.iconSidebarSupportFill,
        subMenu: [
          {
            id: "/support/ticket",
            title: "Support Ticket",
            iconL: icons.iconSubmenuSupport,
            iconF: icons.iconSubmenuSupportFill,
          },
          
        ]
    },
    {
        id: "logs",
        miniTitle: "logs",
        title: "Logs",
        iconLine: icons.iconSidebarLog,
        iconFill: icons.iconSidebarLogFill,
        subMenu: [
          {
            id: "/logs/user-activity",
            title: "User Activity Logs",
            iconL: icons.iconSubmenuUserActivity,
            iconF: icons.iconSubmenuUserActivityFill,
          },
          {
            id: "/logs/admin-activity",
            title: "Admin Activity",
            iconL: icons.iconSubmenuAdminActivity,
            iconF: icons.iconSubmenuAdminActivityFill,
          },
          {
            id: "/logs/unlocated-activity",
            title: "Unallocated Activity Log",
            iconL: icons.iconSubmenuUnlocatedLog,
            iconF: icons.iconSubmenuUnlocatedLogFill,
          },
          {
            id: "/logs/error",
            title: "Error Log",
            iconL: icons.iconSubmenuErrorLog,
            iconF: icons.iconSubmenuErrorLogFill,
          },
          {
            id: "/logs/test",
            title: "Test Log",
            iconL: icons.iconSubmenuUnlocatedLog,
            iconF: icons.iconSubmenuUnlocatedLogFill,
          },
        ]
    },
    {
        id: "emailNotification",
        miniTitle: "emailNotification",
        title: "Email Notification",
        iconLine: icons.iconSidebarEmailNotification,
        iconFill: icons.iconSidebarEmailNotificationFill,
        subMenu: [
          {
            id: "/emailNotification/configuration",
            title: "Configuration",
            iconL: icons.iconSubmenuEN,
            iconF: icons.iconSubmenuENFill,
          },
          
        ]
    }
]


