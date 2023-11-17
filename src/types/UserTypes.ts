export interface UserContextState {
    username: string; // Change 'username' to 'userName'
    setUsername: (userName: string) => void;
    userId: string;
    email: string;
    profilePicture: string;
    setProfilePicture: (profilePicture: string) => void;
    userDescription: string;
    setUserDescription: (userDescription: string) => void;
    loading: boolean;
    isProfileUpdated: boolean;
    tokenExistOrNot: boolean;
    getUserData: () => Promise<void>;
    setProfileUpdated: (updated: boolean) => void;
}
