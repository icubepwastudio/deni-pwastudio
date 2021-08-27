import React from 'react';
import { FormattedMessage } from 'react-intl';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Link } from '@magento/venia-drivers';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { Search as SearchIcon } from 'react-feather';

import { useBrands } from '../../talons/useBrands';
import defaultClasses from './styles.css';

const Brands = props => {
    const { categoryName } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        brandsList,
        brandsLoading,
        derivedErrorMessage,
        brandSearchString,
        setBrandSearchString,
        brandSearchResult
    } = useBrands();

    if (brandsLoading) return fullPageLoadingIndicator;

    if (derivedErrorMessage)
        return <div className={classes.brandError}>{derivedErrorMessage}</div>;

    let brandListItems;
    if (brandsList && brandsList.length) {
        brandListItems = [];
        brandsList.map(item => {
            brandListItems.push(
                <div
                    key={item.brand_id}
                    className={classes.brandItem}
                    style={{ flexBasis: 160 }}
                >
                    <div
                        className={classes.brandItemImageWrapper}
                        style={{
                            backgroundImage: `url("${item.image}")`,
                            width: 150,
                            height: 150
                        }}
                    />
                </div>
            );
        });
    } else {
        brandListItems = (
            <div className={classes.brandError}>
                <FormattedMessage
                    id={'brand.NoBrandFound'}
                    defaultMessage={'No Brand Found'}
                />
            </div>
        );
    }

    return (
        <div className={classes.brandPageRoot}>
            <div className={classes.breadCrumb}>
                <Link className={classes.breadCrumbLink} to="/">{`Home`}</Link>
                <span className={classes.breadCrumbSeparator}>{`/`}</span>
                {categoryName ? (
                    <React.Fragment>
                        <Link className={classes.breadCrumbLink} to="/brands">
                            Brands
                        </Link>
                        <span
                            className={classes.breadCrumbSeparator}
                        >{`/`}</span>
                        <span className={classes.breadCrumbText}>
                            {categoryName}
                        </span>
                    </React.Fragment>
                ) : (
                    <span className={classes.breadCrumbText}>Brands</span>
                )}
            </div>
            <div
                className={classes.brandPageHeader}
                style={{
                    backgroundColor: 'blue'
                }}
            >
                <div className={classes.brandPageTitle}>
                    <strong>
                        <FormattedMessage
                            id={'brand.Brands'}
                            defaultMessage="Brands"
                        />
                    </strong>
                </div>
                <div className={classes.brandPageSearchBox}>
                    <input
                        type="text"
                        value={brandSearchString}
                        className={classes.brandPageSearchInput}
                        onChange={e => setBrandSearchString(e.target.value)}
                        placeholder={`Search a brand name`}
                    />
                    <div className={classes.brandPageIcon}>
                        <Icon src={SearchIcon} />
                    </div>
                    {brandSearchResult.length ? (
                        <div className={classes.searchResult}>
                            {brandSearchResult.map(searchItem => {
                                return (
                                    <div
                                        key={searchItem.brand_id}
                                        className={classes.searchItem}
                                    >
                                        <div
                                            className={
                                                classes.searchItemPhotoWrapper
                                            }
                                        >
                                            <img
                                                className={
                                                    classes.searchItemPhoto
                                                }
                                                src={searchItem.image}
                                                alt={searchItem.default_value}
                                            />
                                        </div>
                                        <div className={classes.searchItemInfo}>
                                            <div
                                                className={
                                                    classes.searchItemName
                                                }
                                            >
                                                {searchItem.default_value}
                                            </div>
                                            <div
                                                className={
                                                    classes.searchItemDesc
                                                }
                                            >
                                                {searchItem.short_description}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className={classes.brandListContent}>{brandListItems}</div>
        </div>
    );
};

export default Brands;
