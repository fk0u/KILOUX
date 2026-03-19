import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { LayoutDashboard, Users, FileText, MessageSquare, LogOut, Settings } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/firestore-error';

export const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const [posts, setPosts] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);

  // Form states
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [teamBio, setTeamBio] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Simple check for admin email (in real app, check role in Firestore)
        setIsAdmin(currentUser.email === 'the323official@gmail.com');
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const qPosts = query(collection(db, 'posts'));
    const unsubPosts = onSnapshot(qPosts, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
    });

    const qTeam = query(collection(db, 'teamMembers'));
    const unsubTeam = onSnapshot(qTeam, (snapshot) => {
      setTeam(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'teamMembers');
    });

    return () => {
      unsubPosts();
      unsubTeam();
    };
  }, [isAdmin]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;
    try {
      await addDoc(collection(db, 'posts'), {
        title: postTitle,
        content: postContent,
        authorId: user.uid,
        isPublished: true,
        createdAt: serverTimestamp()
      });
      setPostTitle('');
      setPostContent('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'posts');
    }
  };

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !teamRole || !teamBio) return;
    try {
      await addDoc(collection(db, 'teamMembers'), {
        name: teamName,
        role: teamRole,
        bio: teamBio,
        order: team.length,
        imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${teamName}`
      });
      setTeamName('');
      setTeamRole('');
      setTeamBio('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'teamMembers');
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
    }
  };

  const handleDeleteTeam = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'teamMembers', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `teamMembers/${id}`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex items-center justify-center p-6">
        <div className="bg-[#1e293b] p-8 rounded-2xl border border-white/10 text-center max-w-md w-full">
          <LayoutDashboard size={48} className="text-accent mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold mb-4">Admin Portal</h1>
          <p className="text-slate-400 mb-8">Please sign in to access the dashboard.</p>
          <button onClick={handleLogin} className="w-full bg-accent text-[#0f172a] py-3 rounded-xl font-bold hover:scale-105 transition-transform">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex items-center justify-center p-6">
        <div className="bg-[#1e293b] p-8 rounded-2xl border border-white/10 text-center max-w-md w-full">
          <h1 className="text-3xl font-display font-bold mb-4 text-red-400">Access Denied</h1>
          <p className="text-slate-400 mb-8">You do not have permission to view this page.</p>
          <button onClick={() => signOut(auth)} className="w-full bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1e293b] border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-display font-bold text-[#0f172a]">K</div>
          <span className="font-display font-bold text-xl tracking-tighter">ADMIN</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('posts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'posts' ? 'bg-accent/10 text-accent' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <FileText size={20} /> Blog Posts
          </button>
          <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'team' ? 'bg-accent/10 text-accent' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <Users size={20} /> Team Members
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" className="w-10 h-10 rounded-full" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user.displayName}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={() => signOut(auth)} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'posts' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8">Manage Blog Posts</h2>
            
            <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/10 mb-8">
              <h3 className="text-xl font-bold mb-4">Add New Post</h3>
              <form onSubmit={handleAddPost} className="space-y-4">
                <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="Post Title" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none" required />
                <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Post Content (Markdown supported)" rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none" required />
                <button type="submit" className="bg-accent text-[#0f172a] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">Publish Post</button>
              </form>
            </div>

            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-[#1e293b] p-6 rounded-2xl border border-white/10 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">{post.title}</h4>
                    <p className="text-slate-400 text-sm">{new Date(post.createdAt?.toDate()).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDeletePost(post.id)} className="text-red-400 hover:text-red-300 p-2 bg-red-400/10 rounded-lg">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8">Manage Team</h2>
            
            <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/10 mb-8">
              <h3 className="text-xl font-bold mb-4">Add Team Member</h3>
              <form onSubmit={handleAddTeam} className="space-y-4">
                <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none" required />
                <input type="text" value={teamRole} onChange={(e) => setTeamRole(e.target.value)} placeholder="Role (e.g. Lead Designer)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none" required />
                <textarea value={teamBio} onChange={(e) => setTeamBio(e.target.value)} placeholder="Short Bio" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none" required />
                <button type="submit" className="bg-accent text-[#0f172a] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">Add Member</button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.map(member => (
                <div key={member.id} className="bg-[#1e293b] p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                  <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-full bg-white/5" />
                  <div className="flex-1">
                    <h4 className="font-bold">{member.name}</h4>
                    <p className="text-accent text-sm">{member.role}</p>
                  </div>
                  <button onClick={() => handleDeleteTeam(member.id)} className="text-red-400 hover:text-red-300 p-2 bg-red-400/10 rounded-lg">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
