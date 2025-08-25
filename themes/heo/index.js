/**

2	2	
 *   HEO 主题说明
3	3	
 *  > 主题设计者 [张洪](https://zhheo.com/)
4	4	
 *  > 主题开发者 [tangly1024](https://github.com/tangly1024)
5	5	
 *  1. 开启方式 在blog.config.js 将主题配置为 `HEO`
6	6	
 *  2. 更多说明参考此[文档](https://docs.tangly1024.com/article/notionnext-heo)
7	7	
 */
8	8	

9	9	
import Comment from '@/components/Comment'
10	10	
import { AdSlot } from '@/components/GoogleAdsense'
11	11	
import { HashTag } from '@/components/HeroIcons'
12	12	
import LazyImage from '@/components/LazyImage'
13	13	
import LoadingCover from '@/components/LoadingCover'
14	14	
import replaceSearchResult from '@/components/Mark'
15	15	
import NotionPage from '@/components/NotionPage'
16	16	
import ShareBar from '@/components/ShareBar'
17	17	
import WWAds from '@/components/WWAds'
18	18	
import { siteConfig } from '@/lib/config'
19	19	
import { useGlobal } from '@/lib/global'
20	20	
import { loadWowJS } from '@/lib/plugins/wow'
21	21	
import { isBrowser } from '@/lib/utils'
22	22	
import { Transition } from '@headlessui/react'
23	23	
import SmartLink from '@/components/SmartLink'
24	24	
import { useRouter } from 'next/router'
25	25	
import { useEffect, useState } from 'react'
26	26	
import BlogPostArchive from './components/BlogPostArchive'
27	27	
import BlogPostListPage from './components/BlogPostListPage'
28	28	
import BlogPostListScroll from './components/BlogPostListScroll'
29	29	
import CategoryBar from './components/CategoryBar'
30	30	
import FloatTocButton from './components/FloatTocButton'
31	31	
import Footer from './components/Footer'
32	32	
import Header from './components/Header'
33	33	
import Hero from './components/Hero'
34	34	
import LatestPostsGroup from './components/LatestPostsGroup'
35	35	
import { NoticeBar } from './components/NoticeBar'
36	36	
import PostAdjacent from './components/PostAdjacent'
37	37	
import PostCopyright from './components/PostCopyright'
38	38	
import PostHeader from './components/PostHeader'
39	39	
import { PostLock } from './components/PostLock'
40	40	
import PostRecommend from './components/PostRecommend'
41	41	
import SearchNav from './components/SearchNav'
42	42	
import SideRight from './components/SideRight'
43	43	
import CONFIG from './config'
44	44	
import { Style } from './style'
45	45	
import AISummary from '@/components/AISummary'
46	46	
import ArticleExpirationNotice from '@/components/ArticleExpirationNotice'
47	47	

48	48	
/**
49	49	
 * 基础布局 采用上中下布局，移动端使用顶部侧边导航栏
50	50	
 * @param props
51	51	
 * @returns {JSX.Element}
52	52	
 * @constructor
53	53	
 */
54	54	
const LayoutBase = props => {
55	55	
  const { children, slotTop, className } = props
56	56	

57	57	
  // 全屏模式下的最大宽度
58	58	
  const { fullWidth, isDarkMode } = useGlobal()
59	59	
  const router = useRouter()
60	60	

61	61	
  const headerSlot = (
62	62	
    <header>
63	63	
      {/* 顶部导航 */}
64	64	
      <Header {...props} />
65	65	

66	66	
      {/* 通知横幅 */}
67	67	
      {router.route === '/' ? (
68	68	
        <>
69	69	
          <NoticeBar />
70	70	
          <Hero {...props} />
71	71	
        </>
72	72	
      ) : null}
73	73	
      {fullWidth ? null : <PostHeader {...props} isDarkMode={isDarkMode} />}
74	74	
    </header>
75	75	
  )
76	76	

77	77	
  // 右侧栏 用户信息+标签列表
78	78	
  const slotRight =
79	79	
    router.route === '/404' || fullWidth ? null : <SideRight {...props} />
80	80	

81	81	
  const maxWidth = fullWidth ? 'max-w-[96rem] mx-auto' : 'max-w-[86rem]' // 普通最大宽度是86rem和顶部菜单栏对齐，留空则与窗口对齐
82	82	

83	83	
  const HEO_HERO_BODY_REVERSE = siteConfig(
84	84	
    'HEO_HERO_BODY_REVERSE',
85	85	
    false,
86	86	
    CONFIG
87	87	
  )
88	88	
  const HEO_LOADING_COVER = siteConfig('HEO_LOADING_COVER', true, CONFIG)
89	89	

90	90	
  // 加载wow动画
91	91	
  useEffect(() => {
92	92	
    loadWowJS()
93	93	
  }, [])
94	94	

95	95	
  return (
96	96	
    <div
97	97	
      id='theme-heo'
98	98	
      className={`${siteConfig('FONT_STYLE')} bg-[#f7f9fe] dark:bg-[#18171d] h-full min-h-screen flex flex-col scroll-smooth`}>
99	99	
      <Style />
100	100	

101	101	
      {/* 顶部嵌入 导航栏，首页放hero，文章页放文章详情 */}
102	102	
      {headerSlot}
103	103	

104	104	
      {/* 主区块 */}
105	105	
      <main
106	106	
        id='wrapper-outer'
107	107	
        className={`flex-grow w-full ${maxWidth} mx-auto relative md:px-5`}>
108	108	
        <div
109	109	
          id='container-inner'
110	110	
          className={`${HEO_HERO_BODY_REVERSE ? 'flex-row-reverse' : ''} w-full mx-auto lg:flex justify-center relative z-10`}>
111	111	
          <div className={`w-full h-auto ${className || ''}`}>
112	112	
            {/* 主区上部嵌入 */}
113	113	
            {slotTop}
114	114	
            {children}
115	115	
          </div>
116	116	

117	117	
          <div className='lg:px-2'></div>
118	118	

119	119	
          <div className='hidden xl:block'>
120	120	
            {/* 主区快右侧 */}
121	121	
            {slotRight}
122	122	
          </div>
123	123	
        </div>
124	124	
      </main>
125	125	

126	126	
      {/* 页脚 */}
127	127	
      <Footer />
128	128	

129	129	
      {HEO_LOADING_COVER && <LoadingCover />}
130	130	
    </div>
131	131	
  )
132	132	
}
133	133	

134	134	
/**
135	135	
 * 首页
136	136	
 * 是一个博客列表，嵌入一个Hero大图
137	137	
 * @param {*} props
138	138	
 * @returns
139	139	
 */
140	140	
const LayoutIndex = props => {
141	141	
  return (
142	142	
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
143	143	
      {/* 文章分类条 */}
144	144	
      <CategoryBar {...props} />
145	145	
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
146	146	
        <BlogPostListPage {...props} />
147	147	
      ) : (
148	148	
        <BlogPostListScroll {...props} />
149	149	
      )}
150	150	
    </div>
151	151	
  )
152	152	
}
153	153	

154	154	
/**
155	155	
 * 博客列表
156	156	
 * @param {*} props
157	157	
 * @returns
158	158	
 */
159	159	
const LayoutPostList = props => {
160	160	
  return (
161	161	
    <div id='post-outer-wrapper' className='px-5  md:px-0'>
162	162	
      {/* 文章分类条 */}
163	163	
      <CategoryBar {...props} />
164	164	
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
165	165	
        <BlogPostListPage {...props} />
166	166	
      ) : (
167	167	
        <BlogPostListScroll {...props} />
168	168	
      )}
169	169	
    </div>
170	170	
  )
171	171	
}
172	172	

173	173	
/**
174	174	
 * 搜索
175	175	
 * @param {*} props
176	176	
 * @returns
177	177	
 */
178	178	
const LayoutSearch = props => {
179	179	
  const { keyword } = props
180	180	
  const router = useRouter()
181	181	
  const currentSearch = keyword || router?.query?.s
182	182	

183	183	
  useEffect(() => {
184	184	
    // 高亮搜索结果
185	185	
    if (currentSearch) {
186	186	
      setTimeout(() => {
187	187	
        replaceSearchResult({
188	188	
          doms: document.getElementsByClassName('replace'),
189	189	
          search: currentSearch,
190	190	
          target: {
191	191	
            element: 'span',
192	192	
            className: 'text-red-500 border-b border-dashed'
193	193	
          }
194	194	
        })
195	195	
      }, 100)
196	196	
    }
197	197	
  }, [])
198	198	
  return (
199	199	
    <div currentSearch={currentSearch}>
200	200	
      <div id='post-outer-wrapper' className='px-5  md:px-0'>
201	201	
        {!currentSearch ? (
202	202	
          <SearchNav {...props} />
203	203	
        ) : (
204	204	
          <div id='posts-wrapper'>
205	205	
            {siteConfig('POST_LIST_STYLE') === 'page' ? (
206	206	
              <BlogPostListPage {...props} />
207	207	
            ) : (
208	208	
              <BlogPostListScroll {...props} />
209	209	
            )}
210	210	
          </div>
211	211	
        )}
212	212	
      </div>
213	213	
    </div>
214	214	
  )
215	215	
}
216	216	

217	217	
/**
218	218	
 * 归档
219	219	
 * @param {*} props
220	220	
 * @returns
221	221	
 */
222	222	
const LayoutArchive = props => {
223	223	
  const { archivePosts } = props
224	224	

225	225	
  // 归档页顶部显示条，如果是默认归档则不显示。分类详情页显示分类列表，标签详情页显示当前标签
226	226	

227	227	
  return (
228	228	
    <div className='p-5 rounded-xl border dark:border-gray-600 max-w-6xl w-full bg-white dark:bg-[#1e1e1e]'>
229	229	
      {/* 文章分类条 */}
230	230	
      <CategoryBar {...props} border={false} />
231	231	

232	232	
      <div className='px-3'>
233	233	
        {Object.keys(archivePosts).map(archiveTitle => (
234	234	
          <BlogPostArchive
235	235	
            key={archiveTitle}
236	236	
            posts={archivePosts[archiveTitle]}
237	237	
            archiveTitle={archiveTitle}
238	238	
          />
239	239	
        ))}
240	240	
      </div>
241	241	
    </div>
242	242	
  )
243	243	
}
244	244	

245	245	
/**
246	246	
 * 文章详情
247	247	
 * @param {*} props
248	248	
 * @returns
249	249	
 */
250	250	
const LayoutSlug = props => {
251	251	
  const { post, lock, validPassword } = props
252	252	
  const { locale, fullWidth } = useGlobal()
253	253	

254	254	
  const [hasCode, setHasCode] = useState(false)
255	255	

256	256	
  useEffect(() => {
257	257	
    const hasCode = document.querySelectorAll('[class^="language-"]').length > 0
258	258	
    setHasCode(hasCode)
259	259	
  }, [])
260	260	

261	261	
  const commentEnable =
262	262	
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
263	263	
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
264	264	
    siteConfig('COMMENT_VALINE_APP_ID') ||
265	265	
    siteConfig('COMMENT_GISCUS_REPO') ||
266	266	
    siteConfig('COMMENT_CUSDIS_APP_ID') ||
267	267	
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
268	268	
    siteConfig('COMMENT_GITALK_CLIENT_ID') ||
269	269	
    siteConfig('COMMENT_WEBMENTION_ENABLE')
270	270	

271	271	
  const router = useRouter()
272	272	
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
273	273	
  useEffect(() => {
274	274	
    // 404
275	275	
    if (!post) {
276	276	
      setTimeout(
277	277	
        () => {
278	278	
          if (isBrowser) {
279	279	
            const article = document.querySelector(
280	280	
              '#article-wrapper #notion-article'
281	281	
            )
282	282	
            if (!article) {
283	283	
              router.push('/404').then(() => {
284	284	
                console.warn('找不到页面', router.asPath)
285	285	
              })
286	286	
            }
287	287	
          }
288	288	
        },
289	289	
        waiting404
290	290	
      )
291	291	
    }
292	292	
  }, [post])
293	293	
  return (
294	294	
    <>
295	295	
      <div
296	296	
        className={`article h-full w-full ${fullWidth ? '' : 'xl:max-w-5xl'} ${hasCode ? 'xl:w-[73.15vw]' : ''}  bg-white dark:bg-[#18171d] dark:border-gray-600 lg:hover:shadow lg:border rounded-2xl lg:px-2 lg:py-4 `}>
297	297	
        {/* 文章锁 */}
298	298	
        {lock && <PostLock validPassword={validPassword} />}
299	299	

300	300	
        {!lock && post && (
301	301	
          <div className='mx-auto md:w-full md:px-5'>
302	302	
            {/* 文章主体 */}
303	303	
            <article
304	304	
              id='article-wrapper'
305	305	
              itemScope
306	306	
              itemType='https://schema.org/Movie'>
307	307	
              {/* Notion文章主体 */}
308	308	
              <section
309	309	
                className='wow fadeInUp p-5 justify-center mx-auto'
310	310	
                data-wow-delay='.2s'>
311	311	
                <ArticleExpirationNotice post={post} />
312	312	
                <AISummary aiSummary={post.aiSummary} />
313	313	
                <WWAds orientation='horizontal' className='w-full' />
314	314	
                {post && <NotionPage post={post} />}
315	315	
                <WWAds orientation='horizontal' className='w-full' />
316	316	
              </section>
317	317	

318	318	
              {/* 上一篇\下一篇文章 */}
319	319	
              <PostAdjacent {...props} />
320	320	

321	321	
              {/* 分享 */}
322	322	
              <ShareBar post={post} />
323	323	
              {post?.type === 'Post' && (
324		-
                <div className='px-5'>
325		-
                  {/* 版权 */}
326		-
                  <PostCopyright {...props} />
324	+
                <div className='px-5'
327	325	
                  {/* 文章推荐 */}
328	326	
                  <PostRecommend {...props} />
329	327	
                </div>
330	328	
              )}
331	329	
            </article>
332	330	

333	331	
            {/* 评论区 */}
334	332	
            {fullWidth ? null : (
335	333	
              <div className={`${commentEnable && post ? '' : 'hidden'}`}>
336	334	
                <hr className='my-4 border-dashed' />
337	335	
                {/* 评论区上方广告 */}
338	336	
                <div className='py-2'>
339	337	
                  <AdSlot />
340	338	
                </div>
341	339	
                {/* 评论互动 */}
342	340	
                <div className='duration-200 overflow-x-auto px-5'>
343	341	
                  <div className='text-2xl dark:text-white'>
344	342	
                    <i className='fas fa-comment mr-1' />
345	343	
                    {locale.COMMON.COMMENTS}
346	344	
                  </div>
347	345	
                  <Comment frontMatter={post} className='' />
348	346	
                </div>
349	347	
              </div>
350	348	
            )}
351	349	
          </div>
352	350	
        )}
353	351	
      </div>
354	352	

355	353	
      <FloatTocButton {...props} />
356	354	
    </>
357	355	
  )
358	356	
}
359	357	

360	358	
/**
361	359	
 * 404
362	360	
 * @param {*} props
363	361	
 * @returns
364	362	
 */
365	363	
const Layout404 = props => {
366	364	
  // const { meta, siteInfo } = props
367	365	
  const { onLoading, fullWidth } = useGlobal()
368	366	
  return (
369	367	
    <>
370	368	
      {/* 主区块 */}
371	369	
      <main
372	370	
        id='wrapper-outer'
373	371	
        className={`flex-grow ${fullWidth ? '' : 'max-w-4xl'} w-screen mx-auto px-5`}>
374	372	
        <div id='error-wrapper' className={'w-full mx-auto justify-center'}>
375	373	
          <Transition
376	374	
            show={!onLoading}
377	375	
            appear={true}
378	376	
            enter='transition ease-in-out duration-700 transform order-first'
379	377	
            enterFrom='opacity-0 translate-y-16'
380	378	
            enterTo='opacity-100'
381	379	
            leave='transition ease-in-out duration-300 transform'
382	380	
            leaveFrom='opacity-100 translate-y-0'
383	381	
            leaveTo='opacity-0 -translate-y-16'
384	382	
            unmount={false}>
385	383	
            {/* 404卡牌 */}
386	384	
            <div className='error-content flex flex-col md:flex-row w-full mt-12 h-[30rem] md:h-96 justify-center items-center bg-white dark:bg-[#1B1C20] border dark:border-gray-800 rounded-3xl'>
387	385	
              {/* 左侧动图 */}
388	386	
              <LazyImage
389	387	
                className='error-img h-60 md:h-full p-4'
390	388	
                src={
391	389	
                  'https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif'
392	390	
                }></LazyImage>
393	391	

394	392	
              {/* 右侧文字 */}
395	393	
              <div className='error-info flex-1 flex flex-col justify-center items-center space-y-4'>
396	394	
                <h1 className='error-title font-extrabold md:text-9xl text-7xl dark:text-white'>
397	395	
                  404
398	396	
                </h1>
399	397	
                <div className='dark:text-white'>请尝试站内搜索寻找文章</div>
400	398	
                <SmartLink href='/'>
401	399	
                  <button className='bg-blue-500 py-2 px-4 text-white shadow rounded-lg hover:bg-blue-600 hover:shadow-md duration-200 transition-all'>
402	400	
                    回到主页
403	401	
                  </button>
404	402	
                </SmartLink>
405	403	
              </div>
406	404	
            </div>
407	405	

408	406	
            {/* 404页面底部显示最新文章 */}
409	407	
            <div className='mt-12'>
410	408	
              <LatestPostsGroup {...props} />
411	409	
            </div>
412	410	
          </Transition>
413	411	
        </div>
414	412	
      </main>
415	413	
    </>
416	414	
  )
417	415	
}
418	416	

419	417	
/**
420	418	
 * 分类列表
421	419	
 * @param {*} props
422	420	
 * @returns
423	421	
 */
424	422	
const LayoutCategoryIndex = props => {
425	423	
  const { categoryOptions } = props
426	424	
  const { locale } = useGlobal()
427	425	

428	426	
  return (
429	427	
    <div id='category-outer-wrapper' className='mt-8 px-5 md:px-0'>
430	428	
      <div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>
431	429	
        {locale.COMMON.CATEGORY}
432	430	
      </div>
433	431	
      <div
434	432	
        id='category-list'
435	433	
        className='duration-200 flex flex-wrap m-10 justify-center'>
436	434	
        {categoryOptions?.map(category => {
437	435	
          return (
438	436	
            <SmartLink
439	437	
              key={category.name}
440	438	
              href={`/category/${category.name}`}
441	439	
              passHref
442	440	
              legacyBehavior>
443	441	
              <div
444	442	
                className={
445	443	
                  'group mr-5 mb-5 flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'
446	444	
                }>
447	445	
                <HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />
448	446	
                {category.name}
449	447	
                <div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600 '>
450	448	
                  {category.count}
451	449	
                </div>
452	450	
              </div>
453	451	
            </SmartLink>
454	452	
          )
455	453	
        })}
456	454	
      </div>
457	455	
    </div>
458	456	
  )
459	457	
}
460	458	

461	459	
/**
462	460	
 * 标签列表
463	461	
 * @param {*} props
464	462	
 * @returns
465	463	
 */
466	464	
const LayoutTagIndex = props => {
467	465	
  const { tagOptions } = props
468	466	
  const { locale } = useGlobal()
469	467	

470	468	
  return (
471	469	
    <div id='tag-outer-wrapper' className='px-5 mt-8 md:px-0'>
472	470	
      <div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>
473	471	
        {locale.COMMON.TAGS}
474	472	
      </div>
475	473	
      <div
476	474	
        id='tag-list'
477	475	
        className='duration-200 flex flex-wrap space-x-5 space-y-5 m-10 justify-center'>
478	476	
        {tagOptions.map(tag => {
479	477	
          return (
480	478	
            <SmartLink
481	479	
              key={tag.name}
482	480	
              href={`/tag/${tag.name}`}
483	481	
              passHref
484	482	
              legacyBehavior>
485	483	
              <div
486	484	
                className={
487	485	
                  'group flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'
488	486	
                }>
489	487	
                <HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />
490	488	
                {tag.name}
491	489	
                <div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600 '>
492	490	
                  {tag.count}
493	491	
                </div>
494	492	
              </div>
495	493	
            </SmartLink>
496	494	
          )
497	495	
        })}
498	496	
      </div>
499	497	
    </div>
500	498	
  )
501	499	
}
502	500	

503	501	
export {
504	502	
  Layout404,
505	503	
  LayoutArchive,
506	504	
  LayoutBase,
507	505	
  LayoutCategoryIndex,
508	506	
  LayoutIndex,
509	507	
  LayoutPostList,
510	508	
  LayoutSearch,
511	509	
  LayoutSlug,
512	510	
  LayoutTagIndex,
513	511	
  CONFIG as THEME_CONFIG
514	512	
}
