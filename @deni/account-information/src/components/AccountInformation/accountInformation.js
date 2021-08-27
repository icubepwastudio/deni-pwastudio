import React from 'react';
import { Redirect } from '@magento/venia-ui/lib/drivers';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import { useAccountInformation } from '../../talons/useAccountInformation';
import defaultClasses from './styles.css';

const AccountInformation = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { currentUser, isSignedIn } = useAccountInformation();

    if (!isSignedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Account information</h1>

            <ul className={classes.list}>
                <li>
                    <strong>First name: </strong>
                    <span>{currentUser.firstname}</span>
                </li>
                <li>
                    <strong>Last name: </strong>
                    <span>{currentUser.lastname}</span>
                </li>
            </ul>
        </div>
    );
};

export default AccountInformation;
