export type AttrsType = {
  target?: string;
  rel?: string;
};

export type ActionType = {
  action: {
    url: string;
    label: string;
    style: string;
    icon: string;
    classes: string[];
  };
};

type PickType<T, K extends keyof T> = T[K];

export interface ConfigType {
  config: {
    header: {
      logo: string;
      logoAlt: string;
      title: string;
      hasNav: boolean;
      navLinks: string[];
    };
    footer: {
      copyright: string;
      links: PickType<ActionType, 'action'>[];
      hasSocial: boolean;
      socialLinks: string[];
    };
  };
}

export type FieldType = {
  input_type: string;
  name: string;
  label?: string;
  label_id?: string;
  default_value?: string;
  options?: [];
  required?: boolean;
};

export type ClickType = React.MouseEventHandler<HTMLInputElement>;

export type InputType = (e: React.ChangeEvent<HTMLInputElement>) => void;
