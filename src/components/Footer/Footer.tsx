'use client';

import { Link } from '@heroui/react';
import Image from 'next/image';

export function Footer() {
  const year = new Date().getFullYear();

  const authors = [
    { name: '@elena-v-volkova', url: 'https://github.com/elena-v-volkova' },
    { name: '@madii09', url: 'https://github.com/madii09' },
    { name: '@dzichonka', url: 'https://github.com/dzichonka' },
  ];

  return (
    <footer className="w-full border-t border-divider bg-background text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
        <div className="flex flex-wrap justify-center gap-4">
          {authors.map((author) => (
            <Link
              key={author.url}
              isExternal
              showAnchorIcon
              href={author.url}
              className="text-primary text-sm"
            >
              {author.name}
            </Link>
          ))}
        </div>

        <Link
          isExternal
          href="https://rs.school/courses/reactjs"
          className="flex items-center gap-2"
        >
          <Image src="/images/rss-logo.svg" alt="Course Logo" width={32} height={32} />
        </Link>

        <p className="text-sm">{year}</p>
      </div>
    </footer>
  );
}
