import { MetadataRoute } from 'next';
// 블로그 글마다 sitemap 생성해야함

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const resumes = await getResumeId();
  // // 추후 검색을 추가하게 되면 teck, company 마다 분리하게 진행
  // const postSitemap = resumes.map(
  //   ({ id, created_at }: { id: any; created_at: any }) => {
  //     return {
  //       url: `https://devcv.net/resume/${id}`,
  //       lastModified: new Date(created_at),
  //       priority: 0.7
  //     };
  //   }
  // );

  // const teckSitemap = tags.map((tag) => {
  //   return {
  //     url: `https://toris-blog.vercel.app/posts/${tag}`,
  //     lastModified: new Date(),
  //     priority: 0.7
  //   };
  // });

  // const companySitemap = categories.map((category) => {
  //   return {
  //     url: `https://toris-blog.vercel.app/categories/${category}`,
  //     lastModified: new Date(),
  //     priority: 0.7
  //   };
  // });
  // const sitemap = [...postSitemap, ...tagsSitemap, ...categoriesSitemap];
  return [
    {
      url: 'https://devcv.net',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    }
    // {
    //   url: 'https://devcv.net',

    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.5
    // },
    // {
    //   url: 'https://devcv.net',

    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.6
    // },
    // {
    //   url: 'https://devcv.net',
    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.6
    // },
    // ...postSitemap
  ];
}
