'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, refetch } = authClient.useSession();
    const user = session?.user;

    
    const [name, setName] = useState(user?.name || '');
    const [loading, setLoading] = useState(false);

    
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in');
                },
            },
        });
    };

    
    const handleUpdateName = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        await authClient.updateUser({
            name: name,
        }, {
            onSuccess: () => {
                setLoading(false);
                refetch(); // সেশন রিফ্রেশ করে নতুন নাম UI-তে দেখানোর জন্য
                alert('নাম সফলভাবে আপডেট হয়েছে!');
            },
            onError: (error) => {
                setLoading(false);
                alert(error.error.message || 'কিছু একটা সমস্যা হয়েছে');
            }
        });
    };

    return (
        <div className='p-6 max-w-2xl mx-auto space-y-6'>
            
            <div className='flex items-center justify-between p-4 bg-base-100 shadow-md rounded-xl'>
                <div className='flex items-center gap-4'>
                    <Link href={"/profile"}>
                        <div className="avatar">
                            <div className="w-12 rounded-full overflow-hidden">
                                <img 
                                    alt="User Avatar" 
                                    src={user?.image || "https://img.daisyui.com/images/profile/demo/batperson@192.webp"} 
                                />
                            </div>
                        </div>
                    </Link>
                    <div className='grid'>
                        <h2 className="font-bold text-lg">{user?.name || "লোডিং..."}</h2>
                        <h2 className="text-sm text-gray-500">{user?.email}</h2>
                    </div>
                </div>
                
                <button 
                    onClick={handleSignOut}
                    className="px-3 py-1.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition"
                >
                    ↩ সাইন আউট
                </button>
            </div>

            
            <div className='p-6 bg-base-100 shadow-md rounded-xl space-y-4'>
                <h3 className='text-xl font-bold'>তথ্য</h3>
                
                <form onSubmit={handleUpdateName} className="space-y-4">
                    <div className='grid gap-2'>
                        <label className='text-sm font-medium'>নাম</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            placeholder="আপনার নাম লিখুন"
                            className="input input-bordered w-full"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                    >
                        {loading ? 'আপডেট হচ্ছে...' : 'আপডেট'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;