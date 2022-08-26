import { CategoryTemplateInterface } from './category-template.interface';

export interface CategoryInterface extends CategoryTemplateInterface {
    id: string;
    subcategories?: CategoryInterface[];
}
