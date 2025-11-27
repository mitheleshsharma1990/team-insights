export interface FormFieldConfig {
  type: 'text' | 'number' | 'select' | 'checkbox' | 'password';
  name: string;
  label?: string;
  value?: any;
  required: boolean;
  options?: string[];
  // validations?: { name: string; validator: any; message: string }[];
}
