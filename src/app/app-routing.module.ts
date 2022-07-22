import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUrls } from '@core/constants';
import { AuthGuard, HomeLayoutComponent, LoginLayoutComponent } from '@core';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: RouteUrls.main,
                pathMatch: 'full',
            },

            {
                path: RouteUrls.main,
                loadChildren: () => import('./modules/main-page/main-page.module').then((m) => m.MainPageModule),
            },

            {
                path: RouteUrls.categories,
                loadChildren: () => import('./modules/categories/categories.module').then((m) => m.CategoriesModule),
            },

            {
                path: RouteUrls.expenses,
                loadChildren: () => import('./modules/expenses/expenses.module').then((m) => m.ExpensesModule),
            },

            {
                path: RouteUrls.incomes,
                loadChildren: () => import('./modules/incomes/incomes.module').then((m) => m.IncomesModule),
            },

            {
                path: RouteUrls.statistics,
                loadChildren: () => import('./modules/statistics/statistics.module').then((m) => m.StatisticsModule),
            },
        ],
    },

    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: RouteUrls.login,
                pathMatch: 'full',
            },

            {
                path: RouteUrls.login,
                loadChildren: () => import('./core/login/login.module').then((m) => m.LoginModule),
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
