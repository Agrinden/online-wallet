import { WalletInterface } from '@app/shared';

export const WALLETS: WalletInterface[] = [
    {
        id: '1',
        name: 'Wallet1',
        isDefault: true,
        currency: '',
        balance: 0,
    },
    {
        id: '2',
        name: 'Wallet2',
        isDefault: false,
        currency: '',
        balance: 0,
    },
];
