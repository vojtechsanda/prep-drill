import { PropsWithChildren, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

import { useCurrentLocale } from "./hooks";

export function LanguageProvider({ children }: PropsWithChildren) {
  const currentLocale = useCurrentLocale();

  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    import(`./messages/${currentLocale}.json`).then((module) => {
      setMessages(module.default);
    });
  }, [currentLocale]);

  if (!messages) {
    return null;
  }

  return (
    <IntlProvider
      messages={messages}
      locale={currentLocale}
      onError={(err) => {
        if (err.code === "MISSING_TRANSLATION") {
          return;
        }
        throw err;
      }}
    >
      {children}
    </IntlProvider>
  );
}
