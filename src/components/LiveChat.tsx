import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { db, auth } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, limit } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { handleFirestoreError, OperationType } from '../lib/firestore-error';

export const LiveChat = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isOpen || !user) return;

    const q = query(collection(db, 'chatMessages'), orderBy('createdAt', 'asc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'chatMessages');
    });

    return () => unsubscribe();
  }, [isOpen, user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, 'chatMessages'), {
        text: newMessage,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        isAdmin: false,
        createdAt: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'chatMessages');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 z-50 w-14 h-14 bg-accent text-[#0f172a] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-110 transition-all duration-300 md:cursor-none ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={24} />
      </button>

      <div className={`fixed bottom-8 left-8 z-50 w-80 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-left ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#0f172a] p-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <h3 className="font-bold i18n-text">{t('chat.title')}</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors md:cursor-none">
            <X size={20} />
          </button>
        </div>

        <div className="h-80 p-4 overflow-y-auto flex flex-col gap-3">
          {!user ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <MessageSquare size={48} className="text-slate-500" />
              <p className="text-sm text-slate-400 i18n-text">{t('chat.signInPrompt')}</p>
              <button onClick={handleLogin} className="bg-accent text-[#0f172a] px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform md:cursor-none i18n-text">
                {t('chat.signInBtn')}
              </button>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`max-w-[80%] rounded-xl p-3 text-sm ${msg.userId === user.uid ? 'bg-accent text-[#0f172a] self-end rounded-tr-none' : 'bg-white/10 text-slate-200 self-start rounded-tl-none'}`}>
                  <div className="font-bold text-xs mb-1 opacity-70">{msg.userName}</div>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {user && (
          <form onSubmit={handleSendMessage} className="p-3 bg-[#0f172a] border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t('chat.placeholder')}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:border-accent outline-none transition-colors md:cursor-none i18n-text"
            />
            <button type="submit" disabled={!newMessage.trim()} className="w-10 h-10 bg-accent text-[#0f172a] rounded-full flex items-center justify-center disabled:opacity-50 disabled:hover:scale-100 hover:scale-110 transition-transform md:cursor-none">
              <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </>
  );
};
