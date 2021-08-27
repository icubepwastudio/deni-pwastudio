import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BRANDS_LIST } from '../queries/getBrands';

export const useBrands = () => {
    const [brandSearchString, setBrandSearchString] = useState('');
    // get brands list useQuery
    const {
        data: brandsData,
        loading: brandsLoading,
        error: brandsError
    } = useQuery(GET_BRANDS_LIST, {
        variables: {
            pageSize: 99999,
            currentPage: 1
        }
    });

    let derivedErrorMessage;
    if (brandsError) {
        const errorTarget = brandsError;
        if (errorTarget.graphQLErrors) {
            // Apollo prepends "GraphQL Error:" onto the message,
            // which we don't want to show to an end user.
            // Build up the error message manually without the prepended text.
            derivedErrorMessage = errorTarget.graphQLErrors
                .map(({ message }) => message)
                .join(', ');
        } else {
            // A non-GraphQL error occurred.
            derivedErrorMessage = errorTarget.message;
        }
    }

    // brands list
    const brandsList = useMemo(() => {
        if (brandsData && brandsData.mpbrand && brandsData.mpbrand.items) {
            let brandItems = brandsData.mpbrand.items;

            const listItems = [];
            brandItems.map(brandItem => {
                listItems.push(brandItem);
            });
            return listItems;
        }
        return [];
    }, [brandsData]);

    // filter brands by search
    const brandSearchResult = useMemo(() => {
        if (brandsData && brandsData.mpbrand && brandsData.mpbrand.items) {
            const brandItems = brandsData.mpbrand.items;
            const searchedItems = [];
            brandItems.map(brandItem => {
                if (brandSearchString) {
                    if (
                        brandItem.default_value
                            .toLowerCase()
                            .indexOf(brandSearchString.toLowerCase()) !== -1 &&
                        brandItem.url_key
                    )
                        searchedItems.push(brandItem);
                }
            });
            return searchedItems;
        }
        return [];
    }, [brandsData, brandSearchString]);

    return {
        brandsList,
        brandsLoading,
        derivedErrorMessage,
        brandSearchString,
        setBrandSearchString,
        brandSearchResult
    };
};
