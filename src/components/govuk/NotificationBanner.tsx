import { ReactNode } from "react";

interface NotificationBannerProps {
  type?: "success" | "important";
  title?: string;
  children: ReactNode;
}

export function GovukNotificationBanner({
  type = "important",
  title,
  children,
}: NotificationBannerProps) {
  const isSuccess = type === "success";
  return (
    <div
      className={`govuk-notification-banner ${isSuccess ? "govuk-notification-banner--success" : ""}`}
      role={isSuccess ? "alert" : "region"}
      aria-labelledby="govuk-notification-banner-title"
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2
          className="govuk-notification-banner__title"
          id="govuk-notification-banner-title"
        >
          {title ?? (isSuccess ? "Berhasil" : "Penting")}
        </h2>
      </div>
      <div className="govuk-notification-banner__content">{children}</div>
    </div>
  );
}

export function GovukInsetText({ children }: { children: ReactNode }) {
  return <div className="govuk-inset-text">{children}</div>;
}

export function GovukWarningText({ children, iconFallbackText = "Warning" }: { children: ReactNode; iconFallbackText?: string }) {
  return (
    <div className="govuk-warning-text">
      <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-visually-hidden">{iconFallbackText}</span>
        {children}
      </strong>
    </div>
  );
}
