type ValidationConfig = {
    lang: string; // Language code for the validation configuration.
    userNameMinChars: number; // Minimum number of characters allowed for a username.
};

type ValidationConfigs = {
    [key: string]: ValidationConfig;
};

// Collection of validation configurations for different countries or scenarios.
export const validations: ValidationConfigs = {
    IN: {
        lang: 'en',
        userNameMinChars: 5
    },
    FR: {
        lang: 'fr',
        userNameMinChars: 6
    }
};
