import connectToDatabase from '@/lib/mongodb';
import { Contents } from '@/models/scrapeSchema';
import { NextResponse } from 'next/server';

export async function GET(req) {
    await connectToDatabase();
    try {
        const query = await Contents.find({}, { slug: 1 }).exec();

        const slugs = query.map((item) => item.slug);
        const sitemapXml = generateSitemapXml(slugs);

        return NextResponse.xml(sitemapXml);
    } catch (error) {
        console.error('Error fetching slugs:', error);
        return NextResponse.text('Internal Server Error', { status: 500 });
    }
}

const generateSitemapXml = (slugs) => {
    const baseUrl = 'https://microflix.vercel.app/';
    const pages = slugs.map((slug) => ({
        loc: `${baseUrl}/${slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7,
    }));

    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `<url>
        <loc>${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`
        )
        .join('')}
    </urlset>
  `;

    return xml.trim();
};
