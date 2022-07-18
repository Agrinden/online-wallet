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
                path: '',
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
                path: RouteUrls.main,
                loadChildren: () => import('./modules/main-page/main-page.module').then((m) => m.MainPageModule),
            },

            {
                path: RouteUrls.categories,
                loadChildren: () => import('./modules/categories/categories.module').then((m) => m.CategoriesModule),
            },

            {
                path: RouteUrls.incomes_expenses,
                loadChildren: () =>
                    import('./modules/incomes-expenses/incomes-expenses.module').then((m) => m.IncomesExpensesModule),
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
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
