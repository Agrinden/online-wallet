import { RouteUrls } from './routes';

export const userProfileMenu = [
    {
        name: 'Settings',
        icon: 'settings',
        route: '',
    },
    {
        name: 'Help',
        icon: 'help',
    },
    {
        name: 'Delete account',
        icon: 'delete',
        route: '',
    },
    {
        name: 'Logout',
        icon: 'logout',
        route: '',
    },
];

export const settingsMenu = [
    {
        name: 'Disable alerts',
        icon: 'notifications_off',
        route: '',
    },
];

export const menuTabs = [
    { name: 'Home', icon: 'home', route: RouteUrls.main },
    { name: 'Expenses', icon: 'output', route: RouteUrls.expenses },
    { name: 'Incomes', icon: 'exit_to_app', route: RouteUrls.incomes },
    { name: 'Categories', icon: 'category', route: RouteUrls.categories },
    { name: 'Statistics', icon: 'bar_chart', route: RouteUrls.statistics },
];

export interface IExpense {
    id: string;
    walletId: string;
    amount: number;
    categoryId: string;
    subcategoryId?: string;
    payerId: string;
    date: string;
    message: string;
}
