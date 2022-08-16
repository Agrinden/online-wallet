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

export const defaultMenuTabs = [
    { name: 'Home', icon: 'home', route: RouteUrls.main },
    { name: 'Expenses', icon: 'output', route: RouteUrls.expenses },
    { name: 'Incomes', icon: 'exit_to_app', route: RouteUrls.incomes },
    { name: 'Categories', icon: 'category', route: RouteUrls.categories },
    { name: 'Statistics', icon: 'bar_chart', route: RouteUrls.statistics },
];

export const additionalMenuTabs = {
    admin_panel: { name: 'AdminPanel', icon: 'manage_accounts', route: RouteUrls.adminPanel },
    user_panel: { name: 'User', icon: 'person', route: RouteUrls.main },
};
