import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '../../types';
import { updateSEO } from '../../utils/seo';
import ArticleSchema from '../seo/ArticleSchema';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
}

export default function BlogPostPage({ post, onBack }: BlogPostPageProps) {
  useEffect(() => {
    const postUrl = `https://haclab.net/blog/${post.slug}`;
    updateSEO({
      title: post.seoTitle,
      description: post.seoDescription,
      url: postUrl,
      imageUrl: post.imageUrl,
      schemaData: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.seoDescription,
        "image": post.imageUrl,
        "author": { "@type": "Person", "name": post.author, "url": "https://haclab.net/team" },
        "publisher": {
          "@type": "Organization",
          "name": "Haclab Company Limited",
          "url": "https://haclab.net"
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": { "@type": "WebPage", "@id": postUrl },
        "url": postUrl
      }
    });
  }, [post]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src.includes('.webp')) {
      img.src = img.src.replace('.webp', '.png');
    }
  };

  return (
    <motion.div
      key={`post-${post.slug}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto md:h-full flex flex-col gap-6 min-h-0"
    >
      {/* Hero Image */}
      <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>

      {/* Article Content */}
      <div className="flex-1 bg-slate-900/15 border border-slate-900 rounded-2xl p-5 flex flex-col overflow-hidden relative shadow-2xl min-h-[350px]">
        <div className="flex-1 md:overflow-y-auto pr-1 scrollbar-thin space-y-4">
          {/* Meta Row */}
          <div className="space-y-2 border-b border-slate-900 pb-3">
            <div className="flex items-center justify-between text-[12.5px] font-mono text-slate-400">
              <span>POSTED ON: {post.date}</span>
              <span>READ INTERVAL: {post.readTime}</span>
            </div>

            <h1 className="text-base sm:text-lg font-bold text-white leading-tight font-sans tracking-tight">
              {post.title}
            </h1>

            <span className="text-sm font-mono text-brand-red-bright block">
              Author: Senior systems engineer {post.author}
            </span>
          </div>

          {/* Summary */}
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            {post.summary}
          </p>

          {/* Content (rendered as HTML) */}
          <div
            className="p-4 bg-slate-950/90 border border-slate-900 rounded-lg text-sm leading-relaxed text-slate-300 space-y-3 font-normal font-sans relative"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-1 select-none pt-2">
            {post.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[13.5px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-850"
              >
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-brand-red-bright hover:text-white transition-colors text-sm font-mono mt-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tech Log</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}