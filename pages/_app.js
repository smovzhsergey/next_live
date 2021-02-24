import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';

import { useStore } from '../init/store';
import { useApollo } from '../init/apollo';

import PageLayout from '../components/PageLayout';

function MyApp({ Component, pageProps }) {

    const store = useStore(pageProps.initialReduxState);
    const apolloCLient = useApollo(pageProps.initialApolloState);
    
    return (
        <Provider store={store}>
            <ApolloProvider client={apolloCLient}>
                <PageLayout>
                    <Component theme='default' {...pageProps} />
                </PageLayout>
            </ApolloProvider>
        </Provider>
    );
}


export default MyApp
