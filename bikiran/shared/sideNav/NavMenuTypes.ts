
export type NavItem = {
    id: string;
    miniTitle: string; 
    title: string; 
    iconLine: string; 
    iconFill: string; 
    subMenu?: SubMenuItem[];
}

export type SubMenuItem = {
    id: string;
    title: string;
    iconL: string; 
    iconF: string; 
}
  