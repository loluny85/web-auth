type ValidationConfig = {
    lang: string;
    userNameMinChars: number;
  };
  
  type Validations = {
    [key: string]: ValidationConfig
  };

export const validations: Validations = {
    IN: {
        lang: 'en',
        userNameMinChars : 5
    },
    FR: {
        lang: 'fr',
        userNameMinChars : 6
    }
};