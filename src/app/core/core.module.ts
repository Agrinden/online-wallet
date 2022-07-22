import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';

import { HeaderComponent } from '@core-components/header/header.component';
import { SidenavComponent } from '@core-components/sidenav/sidenav.component';
import { SubHeaderComponent } from '@core/components/subHeader/subHeader.component';
import { DelAccToaster } from '@core/components/DeleteAccountToaster/DeleteAccountToaster.component';
import { DelAccToasterContent } from '@core/components/DeleteAccountToaster/DeleteAccountToasterContent/DeleteAccountToasterContent.component';

@NgModule({
    declarations: [HeaderComponent, SubHeaderComponent, SidenavComponent, DelAccToaster, DelAccToasterContent],
    imports: [CommonModule, SharedModule, LayoutModule],
    exports: [HeaderComponent, SidenavComponent],
})
export class CoreModule {}
