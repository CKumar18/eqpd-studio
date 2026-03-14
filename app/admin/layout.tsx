import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — EQPD Studio',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark bg-zinc-950 text-zinc-100 antialiased min-h-screen admin-scope">
      {children}
    </div>
  );
}
