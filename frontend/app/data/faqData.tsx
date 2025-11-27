export const faqData = [
	{
		id: 1,
		question: "What is AcademiaHub?",
		answer:
			"AcademiaHub is an online platform where students, researchers, and professionals can access, share, and publish academic materials. It serves as a central hub for learning resources, publications, and collaboration within the academic community.",
	},
	{
		id: 2,
		question: "How to create account?",
		answer: (
			<div>
				<b className="text-lg">To create an account:</b>
				<ol className="list-decimal list-inside mt-3 space-y-3 ml-2 ">
					<li>Visit the AcademiaHub website.</li>
					<li>Click on “Sign Up”</li>
					<li>Fill in your basic details (name, email, password)</li>
					<li>Verify your email through the confirmation link.</li>
					<li>Log in and complete your profile.</li>
				</ol>
			</div>
		),
	},
	{
		id: 3,
		question: "Is AcademiaHub free to use?",
		answer:
			"Yes. AcademiaHub offers free access to browse publications and create an account. Some advanced features may be premium, but the core platform is completely free for users.",
	},
	{
		id: 4,
		question: "How are publications reviewed and approved?",
		answer: (
			<div>
				<p className="text-lg">
					Every uploaded publication goes through a review process handled by
					the AcademiaHub moderation team. They check for:
				</p>
				<ul className="list-disc list-inside mt-6 space-y-3 ml-2 ">
					<li>Originality</li>
					<li>Relevance</li>
					<li>PLagiarism issues</li>
				</ul>
				<p className="text-lg mt-4">
					Once it meets the required standards, it gets approved and published.
				</p>
			</div>
		),
	},
  {
    id: 5,
    question: 'Can I upload my own publication?',
    answer: 'Yes. Users can upload their own research papers, articles, and academic documents. You simply log in, go to the “Upload” section, submit your file, and it will be reviewed before appearing on the platform.'
  },
  {
    id: 6,
    question: 'How is my data protected?',
    answer: 'AcademiaHub uses secure encryption methods and strict privacy policies to protect your information. Your personal data is never shared with third parties without consent, and all uploaded files are stored on secure servers'
  },
  {
    id: 7,
    question: 'What if I find plagiarized publications?',
    answer: 'If you detect plagiarized or duplicated content, you can report it using the “Report” button on the publication page. The moderation team will investigate and take appropriate action, including removal or account sanctions.'
  }
];
