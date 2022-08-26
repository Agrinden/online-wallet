import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomesComponent } from '@modules/incomes';

const routes: Routes = [{ path: '', component: IncomesComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IncomesRoutingModule {}
