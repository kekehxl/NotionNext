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
      {/* 卡片容器：适配多列布局，简约边框 */}
      <div
        data-wow-delay='.2s'
        className={
          (POST_TWO_COLS ? '2xl:h-[600px] 2xl:w-[400px]' : '') +
          ' wow fadeInUp flex flex-col w-[300px] md:w-[380px] h-[480px] group border border-gray-200 dark:border-gray-600 hover:border-indigo-500  dark:hover:border-yellow-400 duration-300 transition-colors overflow-hidden rounded-md mx-2 mb-4'
        }>
        {/* 预览图区域：自适应宽度，保持比例 */}
        {showPageCover && (
          <SmartLink href={post?.href} passHref legacyBehavior>
            <div className='w-full h-[480px] flex items-center justify-center bg-gray-50 dark:bg-[#2b2b2b]'>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='max-w-full max-h-full object-cover group-hover:scale-102 group-hover:brightness-90 transition-all duration-300 ease-in-out'
              />
            </div>
          </SmartLink>
        )}

        {/* 文字区域：紧凑排版，适配多列 */}
        <div className='flex flex-col justify-between p-3 px-4 w-full'>
          <header>
            {/* 分类标签（简约样式） */}
            {post?.category && (
              <div
                className={`flex mb-1 items-start text-xs text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-yellow-300`}>
                <SmartLink
                  passHref
                  href={`/category/${post.category}`}
                  className='cursor-pointer menu-link '>
                  {post.category}
                </SmartLink>
              </div>
            )}

            {/* 标题 + 图标（突出显示） */}
            <SmartLink
              href={post?.href}
              passHref
              className={
                ' group-hover:text-indigo-600 dark:hover:text-yellow-300 text-gray-900 dark:text-gray-100  line-clamp-2 replace cursor-pointer text-base md:text-lg font-semibold leading-snug'
              }>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className="heo-icon w-5 h-5 mr-1 align-middle transform translate-y-[-6%]"
                />
              )}
              <span className='menu-link '>{post.title}</span>
            </SmartLink>

            {/* 副标题/说明（简洁展示） */}
            {post?.summary && (
              <p className='mt-2 text-xs md:text-sm text-gray-400 dark:text-gray-300 line-clamp-2'>
                {post.summary}
              </p>
            )}
          </header>

          {/* 标签区（紧凑排列） */}
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
