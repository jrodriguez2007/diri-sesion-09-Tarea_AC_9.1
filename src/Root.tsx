import React from "react";
import { LanguageContext } from "./ui/helpers/LanguageProvider";
import { IntlProvider } from "react-intl";
import App from "./App";

export const Root = () => {
    const { locale, messages } =
    React.useContext(LanguageContext);

    return (
        <IntlProvider locale={locale} messages={messages}>
            <App />
        </IntlProvider>
    );
};