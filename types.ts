export interface Table {
  headers: string[];
  rows: (string | number)[][];
}

export interface ContentItem {
  type: 'paragraph' | 'list' | 'table' | 'heading';
  text?: string;
  items?: string[];
  data?: Table;
  level?: number;
}

export interface Section {
  id: string;
  title: string;
  isCategory?: boolean;
  content?: ContentItem[];
}