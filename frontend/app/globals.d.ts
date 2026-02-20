// app/globals.d.ts or types/globals.d.ts
declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'swagger-ui-react' {
  import { ComponentType } from 'react';

  interface SwaggerUIProps {
    spec?: Record<string, unknown>;
    url?: string;
    urls?: { url: string; name: string }[];
    layout?: string;
    docExpansion?: 'list' | 'full' | 'none';
    defaultModelExpandDepth?: number;
    displayOperationId?: boolean;
    filter?: boolean | string;
    showExtensions?: boolean;
    showCommonExtensions?: boolean;
    supportedSubmitMethods?: string[];
    tryItOutEnabled?: boolean;
  }

  const SwaggerUI: ComponentType<SwaggerUIProps>;
  export default SwaggerUI;
}