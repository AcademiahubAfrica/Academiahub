import Link from "next/link";

const TermsOfService = () => {
  const sections = [
    { id: "section-1", title: "1. Eligibility and Account Registration" },
    { id: "section-2", title: "2. Permitted Use" },
    { id: "section-3", title: "3. Prohibited Conduct" },
    { id: "section-4", title: "4. Intellectual Property" },
    { id: "section-5", title: "5. Subscriptions and Payments" },
    { id: "section-6", title: "6. Academic Integrity" },
    { id: "section-7", title: "7. Termination" },
    { id: "section-8", title: "8. Disclaimers and Limitation of Liability" },
    { id: "section-9", title: "9. Indemnification" },
    { id: "section-10", title: "10. Governing Law and Dispute Resolution" },
    { id: "section-11", title: "11. Changes to Terms" },
    { id: "section-12", title: "12. Contact Us" },
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
            Terms of Service
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
                Agreement Sections
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
                Please read these Terms of Service (“Terms”) carefully before
                using the AcademiaHub Africa platform (“Platform”). By creating
                an account or accessing the Platform, you agree to be bound by
                these Terms. If you do not agree, do not use the Platform.
              </p>
              <p className="mt-4 font-medium">
                These Terms constitute a legally binding agreement between you
                (“User”) and AcademiaHub Africa (“Company”, “we”, “us”).
              </p>
            </section>

            <section id="section-1" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                1. Eligibility and Account Registration
              </h2>
              <p className="mb-4">The Platform is available to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Individual users aged 18 years or older</li>
                <li>
                  Educators and academic researchers with verifiable
                  institutional affiliations
                </li>
                <li>
                  Accredited academic or research institutions registering on
                  behalf of their members
                </li>
              </ul>
              <p className="mt-4 text-slate-700">
                You agree to provide accurate, current, and complete information
                during registration and to keep your account credentials
                confidential. You are responsible for all activity that occurs
                under your account. Institutional accounts must designate a
                named administrator responsible for compliance with these Terms.
              </p>
            </section>

            <section id="section-2" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                2. Permitted Use
              </h2>
              <p className="mb-4 text-slate-700">
                The Platform is provided exclusively for academic research,
                scholarly collaboration, publication, and education purposes.
                Permitted uses include:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>
                  Uploading, searching, and accessing academic research papers
                  and datasets
                </li>
                <li>
                  Collaborating with other researchers and institutions on joint
                  projects
                </li>
                <li>
                  Using research tools, analytics, and citation management
                  features
                </li>
                <li>
                  Participating in academic forums and peer-review processes
                </li>
              </ul>
            </section>

            <section id="section-3" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                3. Prohibited Conduct
              </h2>
              <p className="mb-4">You must not:</p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>
                  Use the Platform for any commercial, non-academic, or
                  promotional purpose without prior written consent
                </li>
                <li>
                  Upload, share, or distribute content that infringes any
                  intellectual property rights
                </li>
                <li>
                  Engage in academic fraud, plagiarism, data fabrication, or
                  falsification
                </li>
                <li>Harass, threaten, or discriminate against other users</li>
                <li>
                  Attempt to gain unauthorised access to any part of the
                  Platform or other users’ accounts
                </li>
                <li>
                  Use automated tools, bots, or scripts to scrape, crawl, or
                  extract Platform content in bulk
                </li>
                <li>
                  Upload malicious software, viruses, or any code designed to
                  disrupt the Platform
                </li>
                <li>
                  Violate any applicable local, national, or international law
                  or regulation
                </li>
              </ul>
              <p className="mt-4 font-medium italic text-slate-800">
                Violations may result in immediate account suspension or
                termination, and we reserve the right to report unlawful conduct
                to appropriate authorities.
              </p>
            </section>

            <section id="section-4" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                4. Intellectual Property
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900">4.1 Your Content</h3>
                  <p>
                    You retain ownership of all content you upload to the
                    Platform (“User Content”). By uploading content, you grant
                    AcademiaHub Africa a non-exclusive, royalty-free, worldwide
                    licence to host, store, display, and distribute your content
                    solely as necessary to operate and provide the Platform
                    services.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    4.2 Platform Content
                  </h3>
                  <p>
                    All Platform software, designs, interfaces, branding, and
                    proprietary tools are owned by or licenced to AcademiaHub
                    Africa. You may not reproduce, modify, distribute, or create
                    derivative works of Platform content without express written
                    permission.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    4.3 Research Content
                  </h3>
                  <p>
                    Third-party research publications accessed through the
                    Platform remain the property of their respective authors or
                    publishers. Access is provided for personal academic use
                    only. Bulk downloading, redistribution, or commercial use is
                    strictly prohibited.
                  </p>
                </div>
              </div>
            </section>

            <section id="section-5" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                5. Subscriptions and Payments
              </h2>
              <p className="mb-4">
                Certain features of the Platform require a paid subscription. By
                subscribing, you agree to:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>
                  Pay all applicable fees as stated at the time of subscription
                </li>
                <li>Provide accurate billing information</li>
                <li>
                  Authorise recurring charges for subscription renewals unless
                  cancelled
                </li>
              </ul>
              <p className="mt-4">
                Subscriptions may be cancelled at any time; cancellation takes
                effect at the end of the current billing period. Refunds are
                provided in accordance with our Refund Policy, available on our
                website. We reserve the right to modify subscription pricing
                with 30 days’ advance notice.
              </p>
            </section>

            <section id="section-6" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                6. Academic Integrity
              </h2>
              <p className="mb-4 text-slate-700">
                AcademiaHub Africa is committed to upholding the highest
                standards of academic integrity. All users must:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>
                  Represent their credentials and institutional affiliations
                  accurately
                </li>
                <li>
                  Properly cite all sources and attribute all work appropriately
                </li>
                <li>
                  Not misuse the platform to circumvent peer-review processes
                </li>
                <li>
                  Comply with the ethical research standards of their
                  institution and discipline
                </li>
              </ul>
              <p className="mt-4">
                We reserve the right to remove content or suspend accounts where
                academic misconduct is reported or detected.
              </p>
            </section>

            <section id="section-7" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                7. Termination
              </h2>
              <p className="mb-4 text-slate-700">
                Either party may terminate access to the Platform:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-slate-700">
                <li>
                  You may close your account at any time through your account
                  settings
                </li>
                <li>
                  We may suspend or terminate your account for breach of these
                  Terms, non-payment, or as required by law
                </li>
              </ul>
              <p className="mt-4">
                Upon termination, your right to access the Platform ceases
                immediately. We will retain your data in accordance with our
                Privacy Policy and applicable law.
              </p>
            </section>

            <section id="section-8" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                8. Disclaimers and Limitation of Liability
              </h2>
              <div className="bg-slate-50 p-6 rounded-lg text-sm border border-slate-100 space-y-4">
                <p className="uppercase font-bold tracking-tight">
                  THE PLATFORM IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT
                  WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST
                  EXTENT PERMITTED BY APPLICABLE LAW, ACADEMIAHUB AFRICA
                  DISCLAIMS ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS
                  FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="uppercase font-bold tracking-tight">
                  IN NO EVENT SHALL ACADEMIAHUB AFRICA BE LIABLE FOR ANY
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                  DAMAGES ARISING FROM YOUR USE OF THE PLATFORM, EVEN IF ADVISED
                  OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR
                  ANY CLAIM SHALL NOT EXCEED THE FEES PAID BY YOU IN THE
                  PRECEDING 12 MONTHS.
                </p>
              </div>
            </section>

            <section id="section-9" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                9. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless AcademiaHub Africa, its
                directors, officers, employees, and agents from any claims,
                damages, losses, or expenses (including legal fees) arising out
                of your use of the Platform, your violation of these Terms, or
                your infringement of any third-party rights.
              </p>
            </section>

            <section id="section-10" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                10. Governing Law and Dispute Resolution
              </h2>
              <p>
                These Terms are governed by the laws of the Federal Republic of
                Nigeria. Any disputes arising from these Terms or your use of
                the Platform shall first be submitted to good-faith negotiation.
                If unresolved within 30 days, disputes shall be referred to
                mediation or arbitration in Lagos, Nigeria, in accordance with
                the Arbitration and Conciliation Act (Cap A18, Laws of the
                Federation of Nigeria).
              </p>
              <p className="mt-4">
                Nothing in this clause prevents either party from seeking urgent
                injunctive relief from a court of competent jurisdiction.
              </p>
            </section>

            <section id="section-11" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                11. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. We will
                provide at least 30 days’ notice of material changes via email
                or in-platform notification. Continued use of the Platform after
                the effective date constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section id="section-12" className="scroll-mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                12. Contact Us
              </h2>
              <p>For questions about these Terms, please contact:</p>
              <div className="mt-4 space-y-1">
                <p className="font-bold">
                  Email:{" "}
                  <a
                    href="mailto:support@mail.academiahubafrica.org"
                    className="text-blue-600 font-normal hover:underline"
                  >
                    support@mail.academiahubafrica.org
                  </a>
                </p>
                <p className="font-bold text-slate-900">
                  Address:{" "}
                  <span className="font-normal text-slate-700">
                    AcademiaHub Africa, Legal Department Nigeria
                  </span>
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
