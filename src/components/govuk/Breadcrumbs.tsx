import Link from "next/link";

interface BreadcrumbItem {
  text: string;
  href?: string;
}

interface GovukBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function GovukBreadcrumbs({ items, className = "" }: GovukBreadcrumbsProps) {
  return (
    <div className={`govuk-breadcrumbs ${className}`.trim()}>
      <ol className="govuk-breadcrumbs__list">
        {items.map((item, index) => (
          <li key={index} className="govuk-breadcrumbs__list-item">
            {item.href ? (
              <Link href={item.href} className="govuk-breadcrumbs__link">
                {item.text}
              </Link>
            ) : (
              <span>{item.text}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
