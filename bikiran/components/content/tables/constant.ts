import { icons } from "@/bikiran/lib/icons";

export type Variant = {
    id: number;
    class: string;
    heading1: string;
    heading2: string;
};

type overviewDataItem = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  phone: string;
  image: string;
};

export const overviewData: overviewDataItem[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: '@johndoe', organization: 'Bikiran', phone: '00099922222', image: icons.iconProfile },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: '@janesmith', organization: 'Bikiran', phone: '00099922222', image: icons.iconProfile },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', email: '@alicejohnson', organization: 'Bikiran', phone: '00099922222', image: icons.iconProfile },
    { id: 4, firstName: 'Alen', lastName: 'Johnson', email: '@alicejohnson', organization: 'Bikiran', phone: '00099922222', image: icons.iconProfile },
    { id: 5, firstName: 'Slice', lastName: 'Johnson', email: '@alicejohnson', organization: 'Bikiran', phone: '00099922222', image: icons.iconProfile },
    { id: 6, firstName: 'Malta', lastName: 'Johnson', email: '@alicejohnson', organization: 'Bikiran', phone: '00099922222', image: icons.iconProfile },
];

type VariantClass =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'dark'
  | 'error' 

export const bgColorMap: { [key in VariantClass]: string } = {
    default: "bg-[var(--white-100)]",
    primary: "bg-[var(--primary)]", // Custom indigo color
    secondary: "bg-[var(--secondary)]", // Custom gray color  
    info: "bg-[#CFF4FC]", // Custom blue color
    warning: "bg-[var(--warning)]", // Custom yellow color 
    success: "bg-[var(--success)]", // Custom green color
    dark: "bg-[#1F2937]", // Custom dark gray color
    error: "bg-[var(--error)]", // Custom red color
  };

  type VariantItem = {
    id: number;
    class: VariantClass;
    heading1: string;
    heading2: string;
  };
export const variantData: VariantItem[] = [
    { id: 1, class: 'default', heading1: 'Cell', heading2: 'Cell' },
    { id: 2, class: 'primary', heading1: 'Cell', heading2: 'Cell' }, 
    { id: 3, class: 'secondary', heading1: 'Cell', heading2: 'Cell' },    
    { id: 7, class: 'warning', heading1: 'Cell', heading2: 'Cell' },
    { id: 4, class: 'success', heading1: 'Cell', heading2: 'Cell' },
    { id: 6, class: 'info', heading1: 'Cell', heading2: 'Cell' },
    { id: 8, class: 'error', heading1: 'Cell', heading2: 'Cell' }, 

];

