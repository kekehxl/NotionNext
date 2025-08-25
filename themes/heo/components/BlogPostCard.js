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

  return (
    <article>
      {/* 卡片容器：默认浅灰边框，悬停蓝色边框+放大 */}
      <div
        data-wow-delay='.2s'
        className={
          (POST_TWO_COLS ? '2xl:h-[600px] 2xl:w-[400px]' : '') +
          ' wow fadeInUp flex flex-col w-[300px] md:w-[380px] h-[480px] group border border-gray-200 rounded-md overflow-hidden transition-all duration-300 ease-in-out mx-2 mb-4 hover:border-blue-500 hover:scale-102'
        }>
        {/* 预览图区域：自适应比例 */}
        {showPageCover && (
          <SmartLink href={post?.href} passHref legacyBehavior>
            <div className='w-full h-[220px] bg-gray-50 dark:bg-[#2b2b2b] flex items-center justify-center'>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='max-w-full max-h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-102'
              />
            </div>
          </SmartLink>
        )}

        {/* 文字区域：紧凑排版 */}
        <div className='flex flex-col justify-between p-3 px-4 w-full'>
          <header>
            {/* 分类标签 */}
            {post?.category && (
              <div className='flex mb-1 items-start text-xs text-gray-500 dark:text-gray-400'>
                <SmartLink
                  passHref
                  href={`/category/${post.category}`}
                  className='cursor-pointer menu-link '>
                  {post.category}
                </SmartLink>
              </div>
            )}

            {/* 标题 */}
            <SmartLink
              href={post?.href}
              passHref
              className='text-gray-900 dark:text-gray-100 line-clamp-2 cursor-pointer text-base md:text-lg font-semibold leading-snug transition-colors duration-300 ease-in-out group-hover:text-blue-600'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className="heo-icon w-5 h-5 mr-1 align-middle transform translate-y-[-6%]"
                />
              )}
              <span className='menu-link '>{post.title}</span>
            </SmartLink>

            {/* 副标题/说明 */}
            {post?.summary && (
              <p className='mt-2 text-xs md:text-sm text-gray-400 dark:text-gray-300 line-clamp-2'>
                {post.summary}
              </p>
            )}
          </header>

          {/* 标签区 */}
          <div className='flex flex-wrap items-center mt-2'>
            {post.tagItems?.map(tag => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;


5555

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

  return (
    <article>
      {/* 卡片容器：默认浅灰边框，hover 蓝色边框 + 放大 */}
      <div
        data-wow-delay='.2s'
        className={
          (POST_TWO_COLS
            ? '2xl:h-[600px] 2xl:w-[400px]'
            : '') +
          ' wow fadeInUp flex flex-col w-[300px] md:w-[380px] h-[480px] group border border-gray-300 dark:border-gray-500 rounded-md overflow-hidden transition-all duration-300 ease-in-out mx-2 mb-4 hover:border-blue-500 hover:scale-101'
        }>
        {/* 预览图区域：保持原有布局比例和位置 */}
        {showPageCover && (
          <SmartLink href={post?.href} passHref legacyBehavior>
            <div className='w-full h-[220px] flex items-center justify-center bg-gray-50 dark:bg-[#2b2b2b]'>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='max-w-full max-h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-102'
              />
            </div>
          </SmartLink>
        )}

        {/* 文字区域：保持原有布局比例和位置 */}
        <div className='flex flex-col justify-between p-3 px-4 w-full'>
          <header>
            {post?.category && (
              <div className='flex mb-1 items-start text-xs text-gray-500 dark:text-gray-400'>
                <SmartLink
                  passHref
                  href={`/category/${post.category}`}
                  className='cursor-pointer menu-link '>
                  {post.category}
                </SmartLink>
              </div>
            )}

            <SmartLink
              href={post?.href}
              passHref
              className='text-gray-900 dark:text-gray-100 line-clamp-2 cursor-pointer text-base md:text-lg font-semibold leading-snug transition-colors duration-300 ease-in-out group-hover:text-blue-600'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className="heo-icon w-5 h-5 mr-1 align-middle transform translate-y-[-6%]"
                />
              )}
              <span className='menu-link '>{post.title}</span>
            </SmartLink>

            {post?.summary && (
              <p className='mt-2 text-xs md:text-sm text-gray-400 dark:text-gray-300 line-clamp-2'>
                {post.summary}
              </p>
            )}
          </header>

          <div className='flex flex-wrap items-center mt-2'>
            {post.tagItems?.map(tag => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
