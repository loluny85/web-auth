type ValidationConfig = {
    lang: string; // Language code for the validation configuration.
    userNameMinChars: number; // Minimum number of characters allowed for a username.
    validRegex: string | any;
};

type ValidationConfigs = {
    [key: string]: ValidationConfig;
};

// Collection of validation configurations for different countries or scenarios.
export const validations: ValidationConfigs = {
    IN: {
        lang: 'en',
        userNameMinChars: 5,
        validRegex: /^[Ii][a-zA-Z]*$/
    },
    FR: {
        lang: 'fr',
        userNameMinChars: 6,
        validRegex: /^FR[a-zA-Z0-9%_]*$/
    },
    AE: {
        lang: 'ar',
        userNameMinChars: 8,
        validRegex: /^[a-zA-Z0-9]+$/
    }
};
