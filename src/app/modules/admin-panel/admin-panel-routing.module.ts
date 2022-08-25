import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from '@modules/admin-panel';

const routes: Routes = [{ path: '', component: AdminPanelComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
