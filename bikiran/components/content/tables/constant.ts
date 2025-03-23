export type Variant = {
    id: number;
    class: string;
    heading1: string;
    heading2: string;
};

export const overviewData = [
    { id: 1, firstName: 'John', lastName: 'Doe', handle: '@johndoe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', handle: '@janesmith' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', handle: '@alicejohnson' },
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

