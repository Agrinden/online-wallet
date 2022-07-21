import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@core/core.module';
import { CategoriesComponent, CategoriesRoutingModule } from '@modules/categories';

@NgModule({
    declarations: [CategoriesComponent],
    imports: [CommonModule, CategoriesRoutingModule, SharedModule, CoreModule],
})
export class CategoriesModule {}
