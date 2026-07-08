'use client';
import { Search, ChevronLeft, ChevronRight, Loader2, InboxIcon } from 'lucide-react';
import type { Message } from './AdminShell';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'client', label: 'Client' },
  { value: 'archived', label: 'Archived' },
];

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-brand-500/20 text-brand-400 border-brand-500/30',
  contacted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  client: 'bg-green-500/20 text-green-400 border-green-500/30',
  archived: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

function formatDate(ts: string) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 86400000) return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  if (diff < 604800000) return d.toLocaleDateString('en-IN', { weekday: 'short' });
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

type Props = {
  messages: Message[];
  loading: boolean;
  selected: Message | null;
  onSelect: (m: Message) => void;
  status: string;
  onStatusChange: (s: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
};

export default function MessageList({
  messages, loading, selected, onSelect,
  status, onStatusChange, search, onSearchChange,
  page, totalPages, onPageChange,
}: Props) {
  return (
    <div className="w-80 xl:w-96 border-r border-zinc-800 flex flex-col shrink-0 bg-zinc-900/50">
      {/* Filters */}
      <div className="p-3 border-b border-zinc-800 space-y-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onStatusChange(opt.value)}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                status === opt.value
                  ? 'bg-brand-600 border-brand-600 text-white font-semibold'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 size={20} className="animate-spin text-brand-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-zinc-600 gap-2">
            <InboxIcon size={28} className="opacity-40" />
            <p className="text-sm">No messages found</p>
          </div>
        ) : (
          <ul>
            {messages.map((msg) => (
              <li key={msg.id}>
                <button
                  onClick={() => onSelect(msg)}
                  className={`w-full text-left px-4 py-3.5 border-b border-zinc-800/60 hover:bg-zinc-800/50 transition-colors ${
                    selected?.id === msg.id ? 'bg-zinc-800 border-l-2 border-l-brand-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-medium text-sm text-zinc-100 truncate">{msg.name}</span>
                    <span className="text-xs text-zinc-500 shrink-0">{formatDate(msg.created_at)}</span>
                  </div>
                  <div className="text-xs text-zinc-400 truncate mb-2">{msg.email}</div>
                  <div className="flex items-center gap-2">
                    {msg.service && (
                      <span className="text-xs text-zinc-500 truncate">{msg.service}</span>
                    )}
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[msg.status] || STATUS_COLORS.archived}`}>
                      {msg.status}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-3 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-1.5 rounded-lg hover:bg-zinc-800 disabled:opacity-30 transition-colors text-zinc-400"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs text-zinc-500">{page} / {totalPages}</span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg hover:bg-zinc-800 disabled:opacity-30 transition-colors text-zinc-400"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
