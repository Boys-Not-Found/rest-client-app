'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export function Footer() {
  const year = new Date().getFullYear();

  const authors = [
    { name: '@elena-v-volkova', url: 'https://github.com/elena-v-volkova' },
    { name: '@madii09', url: 'https://github.com/madii09' },
    { name: '@dzichonka', url: 'https://github.com/dzichonka' },
  ];

  return (
    <footer className="w-full border-t border-dividerd">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
        <div className="flex flex-wrap justify-center gap-4">
          {authors.map((author) => (
            <Link
              target="_blank"
              key={author.url}
              href={author.url}
              className="btn-icon text-orange-500"
            >
              {author.name}
            </Link>
          ))}
        </div>

        <Link target="_blank" href="https://rs.school/courses/reactjs" className="btn-icon">
          <Image src="/images/rss-logo.svg" alt="Course Logo" width={50} height={50} />
        </Link>

        <p className="text-md text-orange-500">Boys-Not-Found © {year}</p>
      </div>
    </footer>
  );
}
