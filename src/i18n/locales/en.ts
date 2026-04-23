const en = {
	locale: "en",
	meta: {
		title: "Web Developer - Borys Hlynskyi",
	},
	header: {
		about: "About",
		projects: "Projects",
		experience: "Experience",
		certifications: "Certifications",
		contacts: "Contacts",
		downloadCv: "Download CV",
		switcherLabel: "Language",
	},
	hero: {
		greeting: "Hi, I'm Borys Hlynskyi",
		subtitle: "Web developer from Ukraine specializing in frontend",
	},
	sections: {
		projectsPrefix: "My",
		projectsHighlight: "Projects",
		contactTitle: "Let's Connect!",
		contactSubtitle: "Contact me at",
		contactOr: "or",
		linkedinName: "LinkedIn",
		sendEmail: "Send email",
		linkedinProfile: "LinkedIn profile",
	},
	about: {
		headingPrefix: "About",
		headingHighlight: "Me",
		paragraphs: [
			"Experienced Frontend Software Engineer with 4+ years of experience building single-page and full-stack front-end applications using React and TypeScript. Skilled in developing enterprise web products, including research request management platforms featuring configurable form builders, role-based access control, customizable data tables, and embeddable forms.",
			"Actively follows advancements in AI-powered development tools to improve engineering efficiency, code quality, and delivery speed. Proficient in Vite, Next.js, TanStack Query, React Hook Form, and Tailwind CSS, and in shipping shared UI libraries via private npm registries.",
			"Experienced in agile (Kanban, Scrum), delivering responsive, accessible interfaces and solid test coverage. A collaborative team player who aligns technical decisions with project goals, clarifies requirements with stakeholders, and proposes clear options with trade-offs.",
		],
		stats: [
			{ number: "4+", label: "Years of experience" },
			{ number: "10+", label: "Tech stack tools" },
			{ number: "∞", label: "Problems solved" },
		],
		focusesTitle: "What I focus on",
		focuses: [
			{
				icon: "⚡",
				title: "Performance & DX",
				subtitle: "Vite · TanStack Query · private npm libs",
			},
			{
				icon: "♿",
				title: "Accessibility & Quality",
				subtitle: "a11y · test coverage · responsive design",
			},
			{
				icon: "🤖",
				title: "AI-powered workflows",
				subtitle: "Leveraging AI tools for faster delivery",
			},
			{
				icon: "🎨",
				title: "Pixel-perfect implementation",
				subtitle: "Figma -> production with sharp eye",
			},
		],
		availabilityOpen: "Open to new opportunities",
		availabilityRemote: "Remote-friendly",
		availabilityCountry: "Ukraine",
	},
	experience: {
		experienceHeading: "Experience",
		experienceHeaderFirst: "Professional",
		experienceHeaderSecond: "experience",
		educationHeading: "Education",
		company: "Exadel",
		roleSenior: "Software Engineer",
		roleJunior: "Junior Software Engineer",
		periodSenior: "Oct 2023 - Present",
		periodJunior: "Oct 2021 - Sep 2023",
		mastersTitle: "WUNU Masters Degree",
		bachelorsTitle: "WUNU Bachelors Degree",
		degreeField: "Software Engineering",
		mastersPeriod: "2022 - 2023",
		bachelorsPeriod: "2018 - 2022",
	},
	certifications: {
		heading: "Certifications",
		showMore: "Show More",
		showLess: "Show Less",
		authorLabel: "Author",
	},
	project: {
		code: "Code",
		demo: "Demo",
	},
} as const;

export default en;
