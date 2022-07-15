import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUrls } from '@app/core/constants/routes';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { NotFoundComponent } from '@app/modules/not-found/not-found.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

const routes: Routes = [
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            {
                path: 'login',
                loadChildren: () => import('./core/login/login.module').then((m) => m.LoginModule),
            },
        ],
    },

    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: RouteUrls.budget,
                loadChildren: () => import('./modules/budget/budget.module').then((m) => m.BudgetModule),
            },

            {
                path: RouteUrls.expenses,
                loadChildren: () => import('./modules/expense/expense.module').then((m) => m.ExpenseModule),
            },

            {
                path: RouteUrls.savings,
                loadChildren: () => import('./modules/savings/savings.module').then((m) => m.SavingsModule),
            },

            {
                path: RouteUrls.statistics,
                loadChildren: () => import('./modules/statistics/statistics.module').then((m) => m.StatisticsModule),
            },
        ],
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
