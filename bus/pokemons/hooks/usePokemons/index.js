import { useQuery } from '@apollo/react-hooks';

import { verifyEnvironment } from "../../../../helpers";
import { verifyBrowser } from "../../../../helpers";
import queryPokemons from './gql/queryPokemons.graphql';

const { isProduction } = verifyEnvironment();
const isBrowser  = verifyBrowser();
const logUrl = '/api/logs/graphql';

export const usePokemons = () => {
    const { data } = useQuery(queryPokemons, {
        fetchPolicy: 'cache-only',
        // fetchPolicy: 'network-only',
    });
    
    if (data && isBrowser && isProduction) {
    
        fetch(logUrl, {
            method: 'POST',
            body: JSON.stringify({
                status: 'OK',
                type: 'GRAPHQL'
            }),
        })
    }
    
    return {
        pokemons: data ? data.pokemons : null,
    };
};
