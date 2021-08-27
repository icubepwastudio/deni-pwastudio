import { useUserContext } from '@magento/peregrine/lib/context/user';

export const useAccountInformation = () => {
    const [{ currentUser, isSignedIn }] = useUserContext();

    return {
        currentUser,
        isSignedIn
    };
};
