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
        ]
    },
    {
        id: 3,
        miniTitle: "hosting",
        title: "Hosting",
        iconLine: icons.iconSidebarHosting,
        iconFill: icons.iconSidebarHostingFill,
    },
    {
        id: 4,
        miniTitle: "appOcean",
        title: "AppOcean",
        iconLine: icons.iconSidebarSupport,
        iconFill: icons.iconSidebarSupportFill,
    },
    {
        id: 5,
        miniTitle: "billing",
        title: "Billings",
        iconLine: icons.iconSidebarBilling,
        iconFill: icons.iconSidebarBillingFill,
    },
    {
        id: 6,
        miniTitle: "manage",
        title: "Manage",
        iconLine: icons.iconSidebarManage,
        iconFill: icons.iconSidebarManageFill,
    },
    {
        id: 7,
        miniTitle: "support",
        title: "Support",
        iconLine: icons.iconSidebarSupport,
        iconFill: icons.iconSidebarSupportFill,
    },
    {
        id: 8,
        miniTitle: "logs",
        title: "Logs",
        iconLine: icons.iconSidebarLog,
        iconFill: icons.iconSidebarLogFill,
    },
    {
        id: 9,
        miniTitle: "emailNotification",
        title: "Email Notification",
        iconLine: icons.iconSidebarEmailNotification,
        iconFill: icons.iconSidebarEmailNotificationFill,
    }
]


