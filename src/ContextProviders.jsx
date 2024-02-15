import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CookiesProvider } from './hooks/Cookies';
import { AccountsDataProvider } from './hooks/AccountsData';
import { AdsDataProvider } from './hooks/AdsData';

const queryClient = new QueryClient();

function ContextProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AccountsDataProvider>
                <AdsDataProvider>
                    <CookiesProvider>{children}</CookiesProvider>
                </AdsDataProvider>
            </AccountsDataProvider>
        </QueryClientProvider>
    );
}

export default ContextProviders;
