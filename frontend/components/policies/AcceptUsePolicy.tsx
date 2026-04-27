import Link from "next/link";

const AcceptableUsePolicy = () => {
  const sections = [
    { id: "section-1", title: "1. Academic and Research Use Only" },
    { id: "section-2", title: "2. Content Standards" },
    { id: "section-3", title: "3. Platform Integrity" },
    { id: "section-4", title: "4. Community Standards" },
    { id: "section-5", title: "5. Institutional Account Responsibilities" },
    { id: "section-6", title: "6. Enforcement" },
    { id: "section-7", title: "7. Reporting Violations" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 text-slate-800">
      <div className="mx-auto bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden max-w-6xl">
        {/* Header Section */}
        <header className="border-b border-slate-100 p-8 md:p-12 bg-white">
          <h1 className="text-3xl font-bold text-slate-900">
            AcademiaHub Africa
          </h1>
          <h2 className="text-xl font-semibold text-slate-700 mt-1">
            Acceptable Use Policy
          </h2>
          <div className="mt-4 text-sm text-slate-500 space-y-1">
            <p>Effective Date: 1 April 2026</p>
            <p>Version 1.0</p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row">
          {/* Sticky Navigation */}
          <aside className="lg:w-80 border-r border-slate-100 bg-slate-50/50 p-8">
            <nav className="sticky top-8">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                AUP Sections
              </p>
              <ul className="space-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="text-sm text-slate-600 hover:text-blue-600 transition-colors block leading-snug"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 md:p-12 leading-relaxed space-y-10 bg-white">
            <section>
              <p>
                This Acceptable Use Policy (“AUP”) governs how all users may use
                the AcademiaHub Africa platform. It supplements our Terms of
                Service and Privacy Policy. All users must comply with this AUP
                as a condition of access.
              </p>
            </section>

            <section id="section-1" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                1. Academic and Research Use Only
              </h2>
              <p className="mb-4">
                The Platform is designed exclusively for legitimate academic
                research, education, and scholarly collaboration. Users must:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>
                  Use the Platform only in connection with genuine academic or
                  research activities
                </li>
                <li>
                  Accurately represent their academic or professional
                  credentials
                </li>
                <li>
                  Access only content and features appropriate to their role and
                  subscription tier
                </li>
              </ul>
            </section>

            <section id="section-2" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                2. Content Standards
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    2.1 Permitted Content
                  </h3>
                  <ul className="list-disc ml-6 space-y-1 text-slate-700">
                    <li>Peer-reviewed and pre-print research papers</li>
                    <li>
                      Academic datasets, methodologies, and research instruments
                    </li>
                    <li>
                      Scholarly commentary, literature reviews, and annotations
                    </li>
                    <li>Educational materials for academic instruction</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    2.2 Prohibited Content
                  </h3>
                  <p className="mb-2">
                    You must not upload or distribute content that:
                  </p>
                  <ul className="list-disc ml-6 space-y-1 text-slate-700">
                    <li>
                      Infringes copyright, patents, trademarks, or other
                      intellectual property rights
                    </li>
                    <li>Contains false or fabricated research data</li>
                    <li>
                      Promotes discrimination, hate speech, or harassment based
                      on race, ethnicity, gender, religion, disability, or any
                      other protected characteristic
                    </li>
                    <li>
                      Contains sexually explicit, violent, or otherwise
                      offensive material
                    </li>
                    <li>
                      Constitutes spam, unsolicited advertising, or promotional
                      material
                    </li>
                    <li>Contains malware, spyware, or other malicious code</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="section-3" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                3. Platform Integrity
              </h2>
              <p className="mb-4 text-slate-700">
                You must not engage in activities that compromise Platform
                integrity, including:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>
                  Attempting to bypass authentication, access controls, or
                  subscription restrictions
                </li>
                <li>
                  Conducting denial-of-service attacks or overloading Platform
                  infrastructure
                </li>
                <li>
                  Scraping, bulk-downloading, or systematic extraction of
                  Platform content
                </li>
                <li>
                  Creating multiple accounts to circumvent bans or subscription
                  limits
                </li>
                <li>
                  Sharing account credentials with unauthorised third parties
                </li>
              </ul>
            </section>

            <section id="section-4" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                4. Community Standards
              </h2>
              <p className="mb-4 text-slate-700">
                AcademiaHub Africa fosters a respectful and inclusive academic
                community. Users must:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>
                  Treat other users with professional courtesy and respect
                </li>
                <li>Engage in good-faith scholarly debate and peer review</li>
                <li>
                  Report suspected policy violations using our in-platform
                  reporting tools
                </li>
                <li>
                  Not impersonate other researchers, institutions, or
                  AcademiaHub Africa staff
                </li>
              </ul>
            </section>

            <section id="section-5" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                5. Institutional Account Responsibilities
              </h2>
              <p className="mb-4 text-slate-700">
                Institutions subscribing to multi-user licences are responsible
                for:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>
                  Ensuring all authorised users within their organisation comply
                  with this AUP
                </li>
                <li>Maintaining accurate records of authorised users</li>
                <li>
                  Promptly deactivating access for users who leave the
                  institution or violate this AUP
                </li>
                <li>
                  Designating a compliance contact person accessible to
                  AcademiaHub Africa
                </li>
              </ul>
            </section>

            <section id="section-6" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                6. Enforcement
              </h2>
              <p className="mb-4 text-slate-700">
                Violations of this AUP may result in:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>Temporary suspension pending investigation</li>
                <li>Permanent account termination</li>
                <li>Removal of non-compliant content</li>
                <li>Notification of the user’s institution</li>
                <li>
                  Referral to law enforcement or regulatory authorities where
                  applicable
                </li>
              </ul>
              <p className="mt-4">
                We will endeavour to notify users of enforcement actions except
                where doing so would compromise an ongoing investigation or
                where prohibited by law.
              </p>
            </section>

            <section id="section-7" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                7. Reporting Violations
              </h2>
              <p>
                To report an AUP violation, contact us at:{" "}
                <a
                  href="mailto:support@mail.academiahubafrica.org"
                  className="text-blue-600 hover:underline"
                >
                  support@mail.academiahubafrica.org
                </a>
                . We take all reports seriously and will investigate them
                promptly and confidentially.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AcceptableUsePolicy;
