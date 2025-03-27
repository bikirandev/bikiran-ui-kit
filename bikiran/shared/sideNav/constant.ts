import { icons } from "@/bikiran/lib/icons";
import { NavItem } from "@/bikiran/shared/sideNav/NavMenuTypes";

export const menuArray: NavItem[] = [
    {
      id: "dashboard",
      miniTitle: "dashboard",
      title: "Dashboard",
      iconLine: icons.iconSubmenuDashboard,
      iconFill: icons.iconSubmenuDashboardFill,
      subMenu: [
        {
          id: "/dashboard/dashboard-1",
          title: "Dashboard-1",
          iconL: icons.iconSubmenuPricing,
          iconF: icons.iconSubmenuPricingFill,
        },
        {
          id: "/dashboard/dashboard-2",
          title: "Dashboard-2",
          iconL: icons.iconSubmenuPricing,
          iconF: icons.iconSubmenuPricingFill,
        },
        
      
      ]
  },
    {
      id: "component",
      miniTitle: "component",
      title: "Component",
      iconLine: icons.iconSidebarBilling,
      iconFill: icons.iconSidebarBillingFill,
      subMenu: [
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
        {
          id: "/component/typography",
          title: "Typography",
          iconL: icons.iconSubmenuInvoice,
          iconF: icons.iconSubmenuInvoiceFill,
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
        id: "/product/probackup",
        title: "ProbackUp",
        iconL: icons.iconSubmenuPricing,
        iconF: icons.iconSubmenuPricingFill,
      },
      
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
        id: "/product/docs",
        title: "Docs",
        iconL: icons.iconSubmenuPricing,
        iconF: icons.iconSubmenuPricingFill,
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
          
        ]
    },
    {
        id: "manage",
        miniTitle: "manage",
        title: "Manage",
        iconLine: icons.iconSidebarManage,
        iconFill: icons.iconSidebarManageFill,
        subMenu: [
         
        ]
    },
    {
        id: "support",
        miniTitle: "support",
        title: "Support",
        iconLine: icons.iconSidebarSupport,
        iconFill: icons.iconSidebarSupportFill,
        subMenu: [
          
          
        ]
    },
    {
        id: "logs",
        miniTitle: "logs",
        title: "Logs",
        iconLine: icons.iconSidebarLog,
        iconFill: icons.iconSidebarLogFill,
        subMenu: [
         
        ]
    },
    {
        id: "emailNotification",
        miniTitle: "emailNotification",
        title: "Email Notification",
        iconLine: icons.iconSidebarEmailNotification,
        iconFill: icons.iconSidebarEmailNotificationFill,
        subMenu: [
         
        ]
    }
]


