import { CategoryTemplateInterface } from './category-template.interface';

export interface CategoryInterface extends CategoryTemplateInterface {
    id: string;
    categoryId?: string;
    subcategories?: CategoryInterface[];
}
