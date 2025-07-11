import { MetadataRoute } from 'next';
import { getAllPersonalities } from '../lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ask8ball.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const personalities = await getAllPersonalities();
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/play`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Add personality pages
  personalities.forEach((personality) => {
    routes.push({
      url: `${SITE_URL}/play/${personality.linkname}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  return routes;
}