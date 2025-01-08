export interface SchemaData {
  "@type": string;
  [key: string]: any;
}

export interface SeoItem {
  title: string;
  description: string;
  keywords: string[];
  schema: SchemaData;
}

export interface ProductSeo {
  [key: string]: SeoItem;
}

export interface SeoConfig {
  home: SeoItem;
  products: ProductSeo;
}