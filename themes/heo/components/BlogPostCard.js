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
      {/* 卡片容器：竖版布局，预览图在上，文字在下 */}
      <div
        data-wow-delay='.2s'
        className={
          (POST_TWO_COLS ? '2xl:h-[600px] 2xl:w-[400px]' : '') +
          ' wow fadeInUp flex flex-col w-[380px] h-[580px] group dark:border-gray-600 hover:border-indigo-600  dark:hover:border-yellow-600 duration-300 transition-colors overflow-hidden rounded-xl'
        }>
        {/* 预览图区域：占上半部分 */}
        {showPageCover && (
          <SmartLink href={post?.href} passHref legacyBehavior>
            <div className='w-full h-[350px] flex items-center justify-center'>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='max-w-full max-h-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-500 ease-in-out'
              />
            </div>
          </SmartLink>
        )}

        {/* 文字区域：占下半部分，自适应高度 */}
        <div className='flex flex-col justify-between p-4 w-full'>
          <header>
            {/* 分类标签 */}
            {post?.category && (
              <div
                className={`flex mb-2 items-start text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-yellow-500`}>
                <SmartLink
                  passHref
                  href={`/category/${post.category}`}
                  className='cursor-pointer text-xs font-normal menu-link '>
                  {post.category}
                </SmartLink>
              </div>
            )}

            {/* 标题 + 图标 */}
            <SmartLink
              href={post?.href}
              passHref
              className={
                ' group-hover:text-indigo-700 dark:hover:text-yellow-700 dark:group-hover:text-yellow-600 text-black dark:text-gray-100  line-clamp-2 replace cursor-pointer text-xl font-bold leading-tight'
              }>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className="heo-icon w-6 h-6 mr-1 align-middle transform translate-y-[-8%]"
                />
              )}
              <span className='menu-link '>{post.title}</span>
            </SmartLink>

            {/* 副标题/说明 */}
            {post?.summary && (
              <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                {post.summary}
              </p>
            )}
          </header>

          {/* 标签区 */}
          <div className='flex flex-wrap items-center mt-4'>
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
