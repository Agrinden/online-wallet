import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent, ViewWalletComponent } from '@modules/main-page';

const routes: Routes = [
    { path: '', component: MainPageComponent, pathMatch: 'full' },
    { path: 'view-wallet/:id', component: ViewWalletComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPageRoutingModule {}
