import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Markdown from 'react-markdown';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { handleFirestoreError, OperationType } from '../lib/firestore-error';

export const BlogPost = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setPost(null);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `posts/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-accent">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-slate-200">
        <h1 className="text-4xl font-display font-bold mb-4">{t('blog.notFound')}</h1>
        <Link to="/" className="text-accent hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> {t('blog.backHome')}
        </Link>
      </div>
    );
  }

  const postDescription = post.content 
    ? post.content.substring(0, 160).replace(/[#*`_]/g, '').replace(/\n/g, ' ').trim() + '...' 
    : t('blog.defaultDesc');

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Helmet>
        <title>{post.title} | Kiloux Studio</title>
        <meta name="description" content={postDescription} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={postDescription} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={postDescription} />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-accent transition-colors mb-8 font-mono text-sm">
          <ArrowLeft size={16} /> {t('blog.backHome')}
        </Link>
        
        <article>
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-mono border-y border-white/10 py-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-accent" />
                {post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : t('blog.unknownDate')}
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-accent" />
                Kiloux Team
              </div>
            </div>
          </header>
          
          <div className="prose prose-invert prose-accent max-w-none prose-headings:font-display prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-2xl">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </main>
    </div>
  );
};
