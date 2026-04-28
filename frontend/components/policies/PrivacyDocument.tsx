import Link from "next/link";

const sections = [
  { id: "section-1", title: "1. Information We Collect" },
  { id: "section-2", title: "2. How We Use Your Information" },
  { id: "section-3", title: "3. Legal Basis for Processing" },
  { id: "section-4", title: "4. Data Sharing and Disclosure" },
  { id: "section-5", title: "5. Data Retention" },
  { id: "section-6", title: "6. Cookies and Tracking Technologies" },
  { id: "section-7", title: "7. Your Rights" },
  { id: "section-8", title: "8. Data Security" },
  { id: "section-9", title: "9. Children’s Privacy" },
  { id: "section-10", title: "10. Applicable Law and Regulatory Compliance" },
  { id: "section-11", title: "11. Contact and Complaints" },
  { id: "section-12", title: "12. Changes to This Policy" },
];
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 text-slate-800">
      <div className="mx-auto bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden max-w-6xl">
        {/* Header Section */}
        <header className="border-b border-slate-100 p-8 md:p-12 bg-white">
          <h1 className="text-3xl font-bold text-slate-900">
            AcademiaHub Africa
          </h1>
          <h2 className="text-xl font-semibold text-slate-700 mt-1">
            Privacy Policy
          </h2>
          <div className="mt-4 text-sm text-slate-500 space-y-1">
            <p>Effective Date: 1 April 2026</p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row">
          {/* Sticky Navigation */}
          <aside className="lg:w-80 border-r border-slate-100 bg-slate-50/50 p-8">
            <nav className="sticky top-8">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Table of Contents
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

          {/* Main Content - Verbatim Text */}
          <main className="flex-1 p-8 md:p-12 leading-relaxed space-y-10 bg-white">
            <section>
              <p>
                AcademiaHub Africa (“we”, “us”, or “our”) is committed to
                protecting the privacy and personal data of all users of our
                academic research platform. This Privacy Policy describes how we
                collect, use, store, share, and protect your information when
                you access or use our services.
              </p>
              <p className="mt-4">
                This Policy applies to students, educators, researchers, and
                institutional users across Africa and any other regions where
                our platform operates.
              </p>
            </section>

            <section id="section-1" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                1. Information We Collect
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-2 text-slate-900">
                    1.1 Information You Provide
                  </h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>
                      Account registration data: full name, email address,
                      institution affiliation, professional role
                    </li>
                    <li>
                      Profile information: academic credentials, areas of
                      research interest, institutional identifier
                    </li>
                    <li>
                      Content you submit: research papers, comments, messages,
                      collaboration materials
                    </li>
                    <li>
                      Payment and billing information (processed through secure
                      third-party processors)
                    </li>
                    <li>Communications with our support team</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-slate-900">
                    1.2 Information Collected Automatically
                  </h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>
                      Device and browser information (IP address, device type,
                      operating system)
                    </li>
                    <li>
                      Usage data: pages visited, features accessed, search
                      queries, session duration
                    </li>
                    <li>
                      Cookies and similar tracking technologies (see Section 6)
                    </li>
                    <li>Log data and error reports</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-slate-900">
                    1.3 Information from Third Parties
                  </h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>
                      Institutional sign-on (SSO) systems where your institution
                      integrates with our platform
                    </li>
                    <li>Academic identity verification services</li>
                    <li>
                      Open researcher identifiers such as ORCID, where
                      voluntarily linked
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="section-2" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                2. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use your personal data for the following purposes:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  To create and manage your account and provide platform
                  services
                </li>
                <li>
                  To facilitate academic research, collaboration, and
                  publication activities
                </li>
                <li>
                  To verify institutional affiliations and academic credentials
                </li>
                <li>
                  To communicate with you regarding your account, updates, and
                  support
                </li>
                <li>
                  To personalise your experience and recommend relevant research
                  content
                </li>
                <li>
                  To process payments and manage subscriptions (for paid tiers)
                </li>
                <li>
                  To improve our platform through analytics and user feedback
                </li>
                <li>
                  To comply with applicable legal obligations under Nigerian and
                  African Union laws
                </li>
                <li>
                  To detect, prevent, and address fraud, abuse, or security
                  incidents
                </li>
              </ul>
            </section>

            <section id="section-3" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                3. Legal Basis for Processing
              </h2>
              <p>
                Where applicable under Nigerian data protection law (Nigeria
                Data Protection Act 2023 — NDPA) and similar frameworks across
                African jurisdictions, we process your personal data on the
                following legal bases:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-1">
                <li>
                  Contractual necessity: to perform our obligations under our
                  Terms of Service
                </li>
                <li>
                  Legitimate interests: platform security, fraud prevention,
                  product improvement
                </li>
                <li>
                  Consent: for optional features such as marketing
                  communications or analytics beyond core operations
                </li>
                <li>
                  Legal obligation: where required by applicable law or
                  regulatory authorities
                </li>
              </ul>
            </section>

            <section id="section-4" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                4. Data Sharing and Disclosure
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-2 text-slate-900">
                    4.1 We Do Not Sell Your Data
                  </h3>
                  <p>
                    AcademiaHub Africa does not sell, rent, or trade your
                    personal information to third parties for commercial
                    purposes.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-slate-900">
                    4.2 Authorised Sharing
                  </h3>
                  <p className="mb-2">
                    We may share your information in the following limited
                    circumstances:
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>
                      With your institution, where you have enrolled via an
                      institutional licence and subject to a data processing
                      agreement
                    </li>
                    <li>
                      With service providers who assist us in operating the
                      platform (e.g., cloud hosting, payment processing, email
                      delivery) under strict data processing agreements
                    </li>
                    <li>
                      With research partners or co-investigators, only where you
                      have given explicit consent
                    </li>
                    <li>
                      With regulators, law enforcement, or courts when required
                      by law or to protect rights and safety
                    </li>
                    <li>
                      In connection with a merger, acquisition, or asset sale,
                      subject to adequate data protection commitments
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-slate-900">
                    4.3 Cross-Border Data Transfers
                  </h3>
                  <p>
                    Your data may be processed in countries outside your country
                    of residence. Where such transfers occur, we apply
                    appropriate safeguards including contractual clauses,
                    adequacy determinations, or equivalent protections
                    consistent with the NDPA and applicable African data
                    protection frameworks.
                  </p>
                </div>
              </div>
            </section>

            <section id="section-5" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                5. Data Retention
              </h2>
              <p className="mb-4">
                We retain your personal data for as long as your account is
                active or as necessary to provide services. Upon account
                deletion:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Account data is permanently deleted within 90 days</li>
                <li>
                  Anonymised usage and research analytics may be retained
                  indefinitely for platform improvement
                </li>
                <li>
                  Financial records are retained for a minimum of 7 years in
                  compliance with Nigerian financial regulations
                </li>
                <li>
                  Data subject to ongoing legal proceedings or regulatory
                  requests will be retained for the duration of such proceedings
                </li>
              </ul>
            </section>

            <section id="section-6" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="mb-4">
                We use cookies and similar technologies to operate and improve
                our platform. Types of cookies used include:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Essential cookies: required for login, session management, and
                  core functionality
                </li>
                <li>
                  Analytics cookies: to understand how users interact with the
                  platform (opt-out available)
                </li>
                <li>
                  Preference cookies: to remember your settings and
                  personalisation choices
                </li>
              </ul>
              <p className="mt-4">
                You may manage cookie preferences through your browser settings
                or our cookie consent tool. Note that disabling essential
                cookies may affect platform functionality.
              </p>
            </section>

            <section id="section-7" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                7. Your Rights
              </h2>
              <p className="mb-4">
                Subject to applicable Nigerian and African data protection laws,
                you have the following rights:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Right of access: request a copy of the personal data we hold
                  about you
                </li>
                <li>
                  Right to rectification: request correction of inaccurate or
                  incomplete data
                </li>
                <li>
                  Right to erasure: request deletion of your data (subject to
                  legal retention requirements)
                </li>
                <li>
                  Right to restriction: request that we limit processing of your
                  data in certain circumstances
                </li>
                <li>
                  Right to data portability: receive your data in a structured,
                  machine-readable format
                </li>
                <li>
                  Right to object: object to processing based on legitimate
                  interests
                </li>
                <li>
                  Right to withdraw consent: where processing is based on
                  consent, withdraw it at any time
                </li>
              </ul>
              <p className="mt-6">
                To exercise any of these rights, contact us at:{" "}
                <a
                  href="mailto:support@mail.academiahubafrica.org"
                  className="text-blue-600"
                >
                  support@mail.academiahubafrica.org
                </a>
                . We will respond within 30 days of receiving your request.
              </p>
            </section>

            <section id="section-8" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                8. Data Security
              </h2>
              <p className="mb-4">
                We implement industry-standard technical and organisational
                measures to protect your personal data, including:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-slate-800">
                <li>
                  Encryption of data in transit (TLS) and at rest (AES-256)
                </li>
                <li>
                  Role-based access controls and multi-factor authentication for
                  administrative systems
                </li>
                <li>Regular security assessments and penetration testing</li>
                <li>
                  Incident response procedures with regulatory notification
                  protocols
                </li>
              </ul>
              <p className="mt-4">
                In the event of a personal data breach that poses a risk to your
                rights and freedoms, we will notify the relevant data protection
                authority and affected users as required by law.
              </p>
            </section>

            <section id="section-9" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                9. Children’s Privacy
              </h2>
              <p>
                Our platform is intended for adults aged 18 and above. We do not
                knowingly collect personal data from individuals under 18. If
                you believe we have inadvertently collected data from a minor,
                please contact us immediately and we will delete it.
              </p>
            </section>

            <section id="section-10" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                10. Applicable Law and Regulatory Compliance
              </h2>
              <p>
                This Privacy Policy is governed by and construed in accordance
                with the Nigeria Data Protection Act 2023 (NDPA) and the
                regulations of the Nigeria Data Protection Commission (NDPC). We
                also recognise and seek to comply with the data protection
                frameworks of other African Union member states in jurisdictions
                where we operate.
              </p>
            </section>

            <section id="section-11" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                11. Contact and Complaints
              </h2>
              <p>
                For privacy-related enquiries or to lodge a complaint, contact
                our Data Protection Officer:
              </p>
              <div className="mt-4 space-y-1 text-slate-900 font-medium">
                <p>
                  Email:{" "}
                  <span className="text-blue-600 font-normal">
                    support@mail.academiahubafrica.org
                  </span>
                </p>
                <p>
                  Postal Address:{" "}
                  <span className="font-normal text-slate-700">
                    AcademiaHub Africa, Data Protection Officer, [Registered
                    Address], Nigeria
                  </span>
                </p>
              </div>
              <p className="mt-6">
                If you are dissatisfied with our response, you may lodge a
                complaint with the Nigeria Data Protection Commission (NDPC) at{" "}
                <span className="italic">ndpc.gov.ng</span> or the relevant data
                protection authority in your country.
              </p>
            </section>

            <section id="section-12" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                12. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Material
                changes will be communicated via email or prominent notice on
                the platform at least 30 days before they take effect. Continued
                use of the platform after the effective date constitutes
                acceptance of the revised Policy.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
