export default function Footer() {
  return (
    <footer className="govuk-footer">
      <div className="govuk-width-container">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 className="govuk-visually-hidden">Informasi sistem</h2>
            <ul className="govuk-footer__inline-list">
              <li className="govuk-footer__inline-list-item">
                <span className="govuk-footer__link">TIMGRAVID v1.0</span>
              </li>
              <li className="govuk-footer__inline-list-item">
                <span className="govuk-footer__link">Sistem Manajemen Pemakaman</span>
              </li>
              <li className="govuk-footer__inline-list-item">
                <span className="govuk-footer__link">Yayasan Sajarah Timbanganten</span>
              </li>
            </ul>
          </div>
          <div className="govuk-footer__meta-item">
            <span className="govuk-footer__link">© 2025 Yayasan Sejarah Timbanganten</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
