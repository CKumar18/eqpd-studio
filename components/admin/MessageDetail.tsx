'use client';
import { useState, useEffect } from 'react';
import {
  User, Mail, Building2, Briefcase, MessageSquare, Clock,
  CheckCircle2, Star, Archive, Send, Loader2, RefreshCw,
} from 'lucide-react';
import type { Message } from './AdminShell';

type Reply = {
  id: string;
  message_id: string;
  reply_subject: string;
  reply_body: string;
  sent_at: string;
};

const STATUS_ACTIONS = [
  { status: 'contacted', label: 'Mark Contacted', icon: CheckCircle2, color: 'text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30' },
  { status: 'client', label: 'Mark as Client', icon: Star, color: 'text-green-400 hover:bg-green-500/10 hover:border-green-500/30' },
  { status: 'archived', label: 'Archive', icon: Archive, color: 'text-zinc-400 hover:bg-zinc-500/10 hover:border-zinc-500/30' },
];

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-brand-500/20 text-brand-400',
  contacted: 'bg-blue-500/20 text-blue-400',
  client: 'bg-green-500/20 text-green-400',
  archived: 'bg-zinc-500/20 text-zinc-400',
};

function formatFull(ts: string) {
  return new Date(ts).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

type Props = {
  message: Message;
  onStatusUpdate: (id: string, status: string) => Promise<void>;
  onRefresh: () => void;
};

export default function MessageDetail({ message, onStatusUpdate, onRefresh }: Props) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [subject, setSubject] = useState(`Re: ${message.service || 'Your Inquiry'} – EQPD Studio`);
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState('');

  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const res = await fetch(`/api/admin/messages/${message.id}/replies`);
      const data = await res.json();
      setReplies(Array.isArray(data) ? data : []);
    } finally {
      setLoadingReplies(false);
    }
  };

  useEffect(() => {
    fetchReplies();
    setSubject(`Re: ${message.service || 'Your Inquiry'} – EQPD Studio`);
    setBody('');
    setSendSuccess(false);
    setSendError('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.id]);

  const handleStatusUpdate = async (status: string) => {
    setUpdatingStatus(status);
    await onStatusUpdate(message.id, status);
    setUpdatingStatus('');
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError('');
    setSendSuccess(false);

    try {
      const res = await fetch(`/api/admin/messages/${message.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          body,
          toEmail: message.email,
          toName: message.name,
        }),
      });

      if (res.ok) {
        setSendSuccess(true);
        setBody('');
        fetchReplies();
        onRefresh();
      } else {
        const data = await res.json();
        setSendError(data.error || 'Failed to send reply');
      }
    } catch {
      setSendError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const textareaClass =
    'w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm resize-none';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-800 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-white">{message.name}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[message.status] || STATUS_COLORS.archived}`}>
              {message.status}
            </span>
          </div>
          <p className="text-sm text-zinc-400">{message.email}</p>
        </div>
        <button onClick={onRefresh} className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors">
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Mail, label: 'Email', value: message.email },
            { icon: Building2, label: 'Company', value: message.company || '—' },
            { icon: Briefcase, label: 'Service', value: message.service || '—' },
            { icon: Clock, label: 'Received', value: formatFull(message.created_at) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-zinc-800/50 border border-zinc-800 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs mb-1">
                <Icon size={11} />
                {label}
              </div>
              <p className="text-zinc-200 text-sm font-medium truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Message Body */}
        <div className="bg-zinc-800/30 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs mb-3">
            <MessageSquare size={11} />
            Message
          </div>
          <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">{message.message}</p>
        </div>

        {/* Status Actions */}
        <div>
          <p className="text-xs text-zinc-500 font-medium mb-2 uppercase tracking-wider">Update Status</p>
          <div className="flex gap-2 flex-wrap">
            {STATUS_ACTIONS.map(({ status, label, icon: Icon, color }) => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                disabled={message.status === status || !!updatingStatus}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border border-transparent rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${color}`}
              >
                {updatingStatus === status ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Icon size={12} />
                )}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation History */}
        {(replies.length > 0 || loadingReplies) && (
          <div>
            <p className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wider">
              Conversation History
            </p>
            {loadingReplies ? (
              <div className="flex justify-center py-4">
                <Loader2 size={16} className="animate-spin text-brand-500" />
              </div>
            ) : (
              <div className="space-y-3">
                {replies.map((reply) => (
                  <div key={reply.id} className="bg-brand-600/10 border border-brand-500/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User size={12} className="text-brand-400" />
                        <span className="text-xs font-semibold text-brand-400">You replied</span>
                      </div>
                      <span className="text-xs text-zinc-500">{formatFull(reply.sent_at)}</span>
                    </div>
                    <p className="text-xs font-medium text-zinc-400 mb-1">Subject: {reply.reply_subject}</p>
                    <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{reply.reply_body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reply Box */}
        <div>
          <p className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wider">
            Send Reply to {message.name}
          </p>
          <form onSubmit={handleSendReply} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={textareaClass}
            />
            <textarea
              required
              rows={5}
              placeholder={`Write your reply to ${message.name}…`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={textareaClass}
            />

            {sendError && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {sendError}
              </div>
            )}
            {sendSuccess && (
              <div className="px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-2">
                <CheckCircle2 size={14} />
                Reply sent successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={sending || !body.trim()}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-brand-600/20"
            >
              {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              {sending ? 'Sending…' : 'Send Reply'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
