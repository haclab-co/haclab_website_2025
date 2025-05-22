import React, { Suspense } from 'react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import SearchContent from '@/components/search/SearchContent';
import LoadingUI from '@/components/ui/LoadingUI';

// Add the edge runtime directive for Cloudflare Pages deployment
export const runtime = "edge";

export default function SearchPage() {
  return (
    <>
      <BreadcrumbSchema pageName="Search Results" />

      <Suspense fallback={
        <div className="container mx-auto px-4 py-24 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center py-12">
              <LoadingUI variant="overlay" theme="code" text="Loading search results..." />
            </div>
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </>
  );
}
