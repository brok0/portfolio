export type BlogLocale = "en" | "uk";

export interface BlogFrontmatter {
	title: string;
	description: string;
	date: string;
	readTime: string;
	tag: string;
	slug: string;
	locale: BlogLocale;
	featured?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
	Content: unknown;
}

type BlogModule = {
	frontmatter: BlogFrontmatter;
	Content: unknown;
};

const blogModules = import.meta.glob("../content/blog/*/*.md");

async function loadPosts(): Promise<BlogPost[]> {
	const loaded = await Promise.all(
		Object.values(blogModules).map(async (loader) => {
			const module = (await loader()) as BlogModule;
			return {
				...module.frontmatter,
				Content: module.Content,
			};
		}),
	);

	return loaded.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export async function getBlogPostsByLocale(locale: BlogLocale): Promise<BlogPost[]> {
	const posts = await loadPosts();
	return posts.filter((post) => post.locale === locale);
}

export async function getBlogPostBySlug(
	locale: BlogLocale,
	slug: string,
): Promise<BlogPost | undefined> {
	const posts = await getBlogPostsByLocale(locale);
	return posts.find((post) => post.slug === slug);
}
