import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { CategoriesRoutingModule } from '@app/modules/categories/categories-routing.module';
import { CategoriesComponent } from '@app/modules/categories/components/categories/categories.component';

@NgModule({
    declarations: [CategoriesComponent],
    imports: [CommonModule, CategoriesRoutingModule, SharedModule, CoreModule],
})
export class CategoriesModule {}
