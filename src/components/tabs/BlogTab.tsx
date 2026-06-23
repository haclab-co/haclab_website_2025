import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import type { BlogPost } from '../../types';
import { updateSEO } from '../../utils/seo';

interface BlogTabProps {
  blogPostsData: BlogPost[];
  selectedPostId: string;
  setSelectedPostId: (id: string) => void;
  selectedPost: BlogPost;
}

export default function BlogTab({ blogPostsData, selectedPostId, setSelectedPostId, selectedPost }: BlogTabProps) {
  useEffect(() => {
    const postUrl = `https://haclab.net/blog/${selectedPost.slug}`;
    updateSEO({
      title: selectedPost.seoTitle,
      description: selectedPost.seoDescription,
      url: postUrl,
      imageUrl: selectedPost.imageUrl,
      schemaData: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": selectedPost.title,
        "description": selectedPost.seoDescription,
        "image": selectedPost.imageUrl,
        "author": { "@type": "Person", "name": selectedPost.author, "url": "https://haclab.net/team" },
        "publisher": {
          "@type": "Organization",
          "name": "Haclab Company Limited",
          "url": "https://haclab.net"
        },
        "datePublished": selectedPost.date,
        "dateModified": selectedPost.date,
        "mainEntityOfPage": { "@type": "WebPage", "@id": postUrl },
        "url": postUrl
      }
    });
    return () => {
      updateSEO({
        title: 'Tech Log - Haclab | Software Engineering Insights & Articles',
        description: 'Read our technical articles, insights, and engineering logs about modern software architecture and development in Uganda.'
      });
    };
  }, [selectedPost]);

  return (
    <motion.div
      key="blog"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0"
    >
      <div className="w-full md:w-[35%] flex flex-col gap-3 shrink-0 md:overflow-hidden pr-1">
        <div className="space-y-1.5 select-none shrink-0">
          <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red-bright font-bold">// INTELLECTUAL OUTPUTS</span>
          <h1 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">The Technical Log</h1>
          <p className="text-[13px] text-slate-300 font-normal leading-snug">Read papers, architectural formulas, and notes straight from production.</p>
        </div>

        <div className="flex-1 space-y-2 md:overflow-y-auto pr-1">
          {blogPostsData.map((post) => {
            const isSelected = post.id === selectedPostId;
            return (
              <button
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className={`w-full p-4 rounded-xl border text-left flex flex-row items-center gap-3 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-brand-red/35 shadow-lg shadow-brand-red/2 shadow-[0_0_12px_rgba(255,0,0,0.03)]'
                    : 'bg-slate-900/10 border-slate-900 text-slate-400 hover:bg-slate-900/20 hover:border-slate-800'
                }`}
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.includes('.webp')) img.src = img.src.replace('.webp', '.png');
                    }}
                  />
                )}
                <div className="min-w-0 pr-1 select-none flex-1">
                  <div className="flex items-center justify-between text-[13.5px] font-mono text-slate-400">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className={`text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>{post.title}</h3>
                  <p className="text-[12px] text-slate-455 truncate leading-snug mt-1 font-normal">{post.summary}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-slate-900/15 border border-slate-900 rounded-2xl p-5 flex flex-col overflow-hidden relative shadow-2xl md:h-full min-h-[350px]">
        {/* Hero Image */}
        <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-900 mb-4 shrink-0">
          <img
            src={selectedPost.imageUrl}
            alt={selectedPost.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src.includes('.webp')) {
                img.src = img.src.replace('.webp', '.png');
              }
            }}
          />
        </div>

        <div className="flex-1 md:overflow-y-auto pr-1 scrollbar-thin space-y-4">
          <div className="space-y-2 border-b border-slate-900 pb-3">
            <div className="flex items-center justify-between text-[12.5px] font-mono text-slate-400">
              <span>POSTED ON: {selectedPost.date}</span>
              <span>READ INTERVAL: {selectedPost.readTime}</span>
            </div>

            <h1 className="text-base sm:text-lg font-bold text-white leading-tight font-sans tracking-tight">
              {selectedPost.title}
            </h1>

            <span className="text-sm font-mono text-brand-red-bright block">Author: {selectedPost.author}</span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            {selectedPost.summary}
          </p>

          {/* HTML content instead of whitespace-pre-line */}
          <div className="p-4 bg-slate-950/90 border border-slate-900 rounded-lg text-sm leading-relaxed text-slate-300 space-y-3 font-normal font-sans relative">
            <span className="absolute top-2 right-2.5 text-[13px] font-mono text-slate-650 tracking-widest uppercase">system_log.md</span>
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </div>

          <div className="flex flex-wrap gap-1 select-none pt-2">
            {selectedPost.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[13.5px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800"
              >
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
