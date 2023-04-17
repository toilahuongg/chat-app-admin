import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href={'/admin'}> Go to admin </Link>
    </div>
  );
}
