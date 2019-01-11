const path = require("path");
const manageTranslations = require('react-intl-translations-manager').default;

// es2015 import
// import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
    messagesDirectory: path.join(__dirname, "src/i18n/messages"),
    translationsDirectory: path.join(__dirname, "src/i18n/locales/"),
    languages: ['ru', 'en']
});