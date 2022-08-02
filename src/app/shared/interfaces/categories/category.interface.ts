import { CreateCategoryInterface } from './create-category.interface';
import { SubcategoryInterface } from './subcategory.interface';

export interface CategoryInterface extends CreateCategoryInterface {
    id: string;
    subcategories?: SubcategoryInterface[];
}
