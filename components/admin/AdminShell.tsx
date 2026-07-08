'use client';
import { useState, useEffect, useCallback } from 'react';
import { LogOut, LayoutDashboard, Mail, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MessageList from '@/components/admin/MessageList';
import MessageDetail from '@/components/admin/MessageDetail';

export type Message = {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  status: string;
  created_at: string;
};

export default function AdminShell() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), status, search });
      const res = await fetch(`/api/admin/messages?${params}`);
      const data = await res.json();
      setMessages(data.messages || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } finally {
      setLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const newCount = messages.filter((m) => m.status === 'new').length;

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: newStatus } : m));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status: newStatus } : prev);
    fetchMessages();
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      {/* Top Bar */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0 bg-zinc-950/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={14} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-sm tracking-wide">EQPD Admin</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Mail size={14} />
            <span>{total} messages</span>
            {newCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-600 text-white text-xs font-bold rounded-full">
                <Bell size={10} />
                {newCount} new
              </span>
            )}
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg transition-all"
          >
            <LogOut size={13} />
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Message List */}
        <MessageList
          messages={messages}
          loading={loading}
          selected={selected}
          onSelect={setSelected}
          status={status}
          onStatusChange={(s: string) => { setStatus(s); setPage(1); }}
          search={search}
          onSearchChange={(s: string) => { setSearch(s); setPage(1); }}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        {/* Right: Message Detail */}
        <div className="flex-1 overflow-y-auto">
          {selected ? (
            <MessageDetail
              message={selected}
              onStatusUpdate={handleStatusUpdate}
              onRefresh={fetchMessages}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600">
              <Mail size={48} className="mb-4 opacity-30" />
              <p className="text-sm">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
