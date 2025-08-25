import LazyImage from '@/components/LazyImage';
import NotionIcon from './NotionIcon';
import { siteConfig } from '@/lib/config';
import SmartLink from '@/components/SmartLink';
import CONFIG from '../config';
import TagItemMini from './TagItemMini';

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap;
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover;
  }
  const showPageCover =
    siteConfig('HEO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview;

  const POST_TWO_COLS = siteConfig('HEO_HOME_POST_TWO_COLS', true, CONFIG);
  const COVER_HOVER_ENLARGE = siteConfig(
    'HEO_POST_LIST_COVER_HOVER_ENLARGE',
    true,
    CONFIG
  );

  return (
    <article
      className={` ${COVER_HOVER_ENLARGE} ? ' hover:transition-all duration-150' : ''`}>
      <div
        data-wow-delay='.2s'
        className={
          (POST_TWO_COLS ? '2xl:h-[45rem] 2xl:flex-col' : '') +
          ' wow fadeInUp border bg-white dark:bg-[#1e1e1e] flex mb-4 flex-col md:flex-row md:h-auto h-[600px] group w-full dark:border-gray-600 hover:border-indigo-600  dark:hover:border-yellow-600 duration-300 transition-colors justify-between overflow-hidden rounded-xl'
        }>
        {showPageCover && (
          <SmartLink href={post?.href} passHref legacyBehavior>
            <div
              className={
                (POST_TWO_COLS ? ' 2xl:w-full' : '') +
                ' w-full md:w-1/2 lg:w-1/3 overflow-hidden cursor-pointer select-none'
              }>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='h-[400px] w-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-500 ease-in-out'
              />
            </div>
          </SmartLink>
        )}

        <div
          className={
            (POST_TWO_COLS ? '2xl:p-4 2xl:h-auto 2xl:w-full' : '') +
            ' flex p-6 flex-col justify-between h-auto md:h-full w-full md:w-2/3 lg:w-2/3'
          }>
          <header>
            {post?.category && (
              <div
                className={`flex mb-1 items-center ${
                  showPreview ? 'justify-center' : 'justify-start'
                } hidden md:block flex-wrap dark:text-gray-300 text-gray-600 hover:text-indigo-700 dark:hover:text-yellow-500`}>
                <SmartLink
                  passHref
                  href={`/category/${post.category}`}
                  className='cursor-pointer text-xs font-normal menu-link '>
                  {post.category}
                </SmartLink>
              </div>
            )}

            <SmartLink
              href={post?.href}
              passHref
              className={
                ' group-hover:text-indigo-700 dark:hover:text-yellow-700 dark:group-hover:text-yellow-600 text-black dark:text-gray-100  line-clamp-2 replace cursor-pointer text-xl font-extrabold leading-tight'
              }>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className="heo-icon w-6 h-6 mr-1 align-middle transform translate-y-[-8%]"
                />
              )}
              <span className='menu-link '>{post.title}</span>
            </SmartLink>
          </header>

          {(!showPreview || showSummary) && (
            <main className='line-clamp-3 replace text-gray-700  dark:text-gray-300 text-sm font-light leading-tight mt-2'>
              {post.summary}
            </main>
          )}

          <div className='md:flex-nowrap flex-wrap md:justify-start inline-block mt-4'>
            <div>
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
