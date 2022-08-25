import { btnFocus } from '@shared/enums/dialog-enums';

export interface DialogContentInputValuesInterface {
    dialogHeading: string;
    dialogContent: string;
    btnFocus: btnFocus;
    hasTimer?: boolean;
}
