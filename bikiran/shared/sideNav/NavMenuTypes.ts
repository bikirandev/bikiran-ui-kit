
export type SubMenuItem = {
    id: string;
    title: string;
    iconL: string; 
    iconF: string; 
}
  
export type NavItem = {
    id: number;
    miniTitle: string; 
    title: string; 
    iconLine: string; 
    iconFill: string; 
    subMenu?: SubMenuItem[];
}