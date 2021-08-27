import gql from 'graphql-tag';

export const BrandFragment = gql`
    fragment BrandFragment on MageplazaBrands {
        brand_id
        attribute_id
        option_id
        value
        default_value
        store_id
        page_title
        url_key
        image
        is_featured
        short_description
        description
        static_block
        meta_title
        meta_keywords
        meta_description
        product_quantity
    }
`;
export const GET_BRANDS_LIST = gql`
    query mpbrand($pageSize: Int!, $currentPage: Int) {
        mpbrand(filter: {}, pageSize: $pageSize, currentPage: $currentPage) {
            items {
                ...BrandFragment
                mpbrandCategories {
                    cat_id
                    name
                    url_key
                }
            }
            total_count
        }
    }
    ${BrandFragment}
`;
