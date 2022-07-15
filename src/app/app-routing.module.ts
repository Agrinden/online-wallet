import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUrls } from '@app/core/constants/routes';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { NotFoundComponent } from '@app/modules/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },

    {
        path: 'login',
        loadChildren: () => import('./core/login/login.module').then((m) => m.LoginModule),
    },

    {
        path: RouteUrls.budget,
        loadChildren: () => import('./modules/budget/budget.module').then((m) => m.BudgetModule),
        canActivate: [AuthGuard],
    },

    {
        path: RouteUrls.expenses,
        loadChildren: () => import('./modules/expense/expense.module').then((m) => m.ExpenseModule),
        canActivate: [AuthGuard],
    },

    {
        path: RouteUrls.savings,
        loadChildren: () => import('./modules/savings/savings.module').then((m) => m.SavingsModule),
        canActivate: [AuthGuard],
    },

    {
        path: RouteUrls.statistics,
        loadChildren: () => import('./modules/statistics/statistics.module').then((m) => m.StatisticsModule),
        canActivate: [AuthGuard],
    },

    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
