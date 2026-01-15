"use client";

import React, { useState, useEffect } from "react";

// third party
import { IntlProvider, MessageFormatElement } from "react-intl";
import useConfig from "hooks/useConfig";

// types
import { I18n } from "types/config";
import siteMessages from "utils/locales/site.json";

// load locales files
function loadLocaleData(i18n: I18n) {
  switch (i18n) {
    case "ko":
      return import("utils/locales/ko.json");
    default:
      return import("utils/locales/en.json");
  }
}

// ==============================|| LOCALIZATION ||============================== //

interface LocalsProps {
  children: React.ReactNode;
}

export default function Locales({ children }: LocalsProps) {
  const { i18n } = useConfig();
  const [messages, setMessages] = useState<
    Record<string, string> | Record<string, MessageFormatElement[]> | undefined
  >();

  useEffect(() => {
    loadLocaleData(i18n).then(
      (d: {
        default:
          | Record<string, string>
          | Record<string, MessageFormatElement[]>
          | undefined;
      }) => {
        const baseMessages = (d.default || {}) as
          | Record<string, string>
          | Record<string, MessageFormatElement[]>;
        const siteScoped =
          (siteMessages as Record<string, Record<string, string>>)[i18n] || {};
        setMessages({
          ...(baseMessages as Record<string, string>),

          ...siteScoped,
        });
      }
    );
  }, [i18n]);

  return (
    <>
      {messages && (
        <IntlProvider locale={i18n} defaultLocale="en" messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
}

