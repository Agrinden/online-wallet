import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryInterface, CategoryTemplateInterface } from '@app/shared';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core/core.module';
import { CategoryService } from './category-service.abstract';

@Injectable({
    providedIn: CoreModule,
})
export class CategoryApiService extends CategoryService {
    constructor(private http: HttpClient) {
        super();
    }

    public create(category: CategoryTemplateInterface, type: TransactionTypeEnum): Observable<CategoryInterface> {
        const newCategory = { ...category, transactionType: type };
        return this.http.post<CategoryInterface>(`${environment.apiUrl}/categories`, this.backendMapper(newCategory));
    }

    public getExpenses(): Observable<CategoryInterface[]> {
        return this.http.get<CategoryInterface[]>(`${environment.apiUrl}/categories?categoryType=EXPENSE`).pipe(
            map((categories: CategoryInterface[]) =>
                categories.map((category: CategoryInterface) => {
                    return this.frontendMapper(category);
                })
            )
        );
    }

    public getIncomes(): Observable<CategoryInterface[]> {
        return this.http.get<CategoryInterface[]>(`${environment.apiUrl}/categories?categoryType=INCOME`).pipe(
            map((categories: CategoryInterface[]) =>
                categories.map((category: CategoryInterface) => {
                    return this.frontendMapper(category);
                })
            )
        );
    }

    public edit(category: CategoryInterface): Observable<CategoryInterface> {
        return this.http
            .put<CategoryInterface>(`${environment.apiUrl}/categories/${category.id}`, this.backendMapper(category))
            .pipe(map((category) => this.frontendMapper(category)));
    }

    public delete(id: string): Observable<null | unknown> {
        return this.http.delete<null>(`${environment.apiUrl}/categories/${id}`).pipe(
            catchError((err) => {
                return of(err);
            })
        );
    }

    public isNameUnique(name: string): Observable<boolean> {
        const incomesRequest = this.getIncomes();
        const expenseRequest = this.getExpenses();

        return forkJoin({
            incomesRequest,
            expenseRequest,
        }).pipe(
            map((resp: any) => {
                return [...resp.incomesRequest, ...resp.expenseRequest].some((item) => item.name === name);
            })
        );
    }

    private backendMapper = (category: CategoryTemplateInterface | CategoryInterface) => ({
        ...category,
        categoryType: category.transactionType,
        color: category.colorScheme,
    });

    private frontendMapper = (category: any) => ({
        ...category,
        colorScheme: category.color,
        transactionType: category.categoryType,
    });
}
