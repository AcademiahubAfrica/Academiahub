import Link from "next/link";

const CookiePolicy = () => {
  const sections = [
    { id: "section-1", title: "1. What Are Cookies?" },
    { id: "section-2", title: "2. Types of Cookies We Use" },
    { id: "section-3", title: "3. Managing Cookies" },
    { id: "section-4", title: "4. Updates to This Policy" },
    { id: "section-5", title: "5. Contact" },
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
            Cookie Policy
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
                Policy Sections
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
                This Cookie Policy explains how AcademiaHub Africa uses cookies
                and similar tracking technologies on our platform. It should be
                read together with our Privacy Policy.
              </p>
            </section>

            <section id="section-1" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your device by a website
                when you visit it. They are widely used to make websites work
                efficiently, provide analytics information, and remember user
                preferences. Cookies may be “session cookies” (deleted when you
                close your browser) or “persistent cookies” (stored for a
                defined period).
              </p>
            </section>

            <section id="section-2" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                2. Types of Cookies We Use
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900">
                    2.1 Strictly Necessary Cookies
                  </h3>
                  <p className="mb-2">
                    These cookies are essential for the Platform to function and
                    cannot be switched off. They include cookies that:
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Manage your login session and authentication</li>
                    <li>Remember items in your workspace or research queue</li>
                    <li>Enable security features such as fraud detection</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    2.2 Analytics Cookies
                  </h3>
                  <p className="mb-2">
                    These cookies help us understand how users interact with the
                    Platform, including:
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Pages visited and features used</li>
                    <li>Time spent on Platform sections</li>
                    <li>Error reports and performance data</li>
                  </ul>
                  <p className="mt-2 italic text-sm">
                    Analytics data is aggregated and anonymised where possible.
                    You may opt out via our Cookie Preference Centre.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    2.3 Preference/Functionality Cookies
                  </h3>
                  <p>
                    These cookies remember your settings and personalisation
                    choices, including language preferences, display settings,
                    and research interest categories.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    2.4 Third-Party Cookies
                  </h3>
                  <p>
                    Some features of the Platform may involve third-party
                    services (such as embedded research tools or analytics
                    providers) that set their own cookies. We do not control
                    these cookies. Refer to the privacy policies of the relevant
                    third parties for further information.
                  </p>
                </div>
              </div>
            </section>

            <section id="section-3" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                3. Managing Cookies
              </h2>
              <p className="mb-4">
                You can manage cookie preferences in the following ways:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <span className="font-semibold">
                    Cookie Preference Centre:
                  </span>{" "}
                  accessible via the “Cookie Settings” link in our platform
                  footer
                </li>
                <li>
                  <span className="font-semibold">Browser settings:</span> most
                  browsers allow you to refuse or delete cookies; refer to your
                  browser’s help documentation
                </li>
              </ul>
              <p className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600">
                Please note that disabling strictly necessary cookies may
                prevent you from logging in or using core Platform features.
              </p>
            </section>

            <section id="section-4" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                4. Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy periodically. Any significant
                changes will be communicated through our platform notice or via
                email.
              </p>
            </section>

            <section id="section-5" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                5. Contact
              </h2>
              <p>
                For questions about our use of cookies, email:{" "}
                <a
                  href="mailto:support@mail.academiahubafrica.org"
                  className="text-blue-600 hover:underline"
                >
                  support@mail.academiahubafrica.org
                </a>
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
