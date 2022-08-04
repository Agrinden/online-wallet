import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'app-loader',
    styleUrls: ['./loader.component.scss'],
    templateUrl: './loader.component.html',
})
export class LoaderComponent {
    isLoading: Subject<boolean> = this.loaderService.isLoading;

    constructor(private loaderService: LoaderService) {}
}
