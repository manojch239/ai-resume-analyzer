// import { sep } from 'path'; // ❌ Remove this line
import React, { use, useEffect } from 'react'
import { useLocation, useNavigate, type NavigateFunction } from 'react-router';
import { usePuterStore } from '~/lib/puter';



export const metadata = {
  title: 'Resumind | Auth',
  name : 'description',
//   description: 'Authentication Page',
  content : 'Login to your account'
}

const auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next: string = location.search.split('next=')[1];
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            // Redirect to home or dashboard after successful login
            console.log('Authenticated, navigating to:', next || '/home');
            navigate(next);
            // window.location.href = '/';
        }
    }, [auth.isAuthenticated, next]);

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className='gradient-border shadow-lg'>
                <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                    <div className='flex flex-col items-center gap-2 text-center'>
                    <h1>Welcome</h1>
                    <h2>Log in to Continue your job Journey</h2>
                </div>
                <div>
                    {isLoading? (
                        <button className='auth-button animate-pulse'>
                            {/* console.log('Loading...') */}
                            <p>Signing you in ...</p>
                        </button>
                    ) : (
                        <>
                            {auth.isAuthenticated ? (
                                <button className='auth-button' onClick = {auth.signOut}>
                                    <p>Log Out</p>
                                    </button>
                            ) : (
                                <button className='auth-button' onClick={auth.signIn}>
                                    <p>Log in</p>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </section>

        </div>

    </main>
  )
}

export default auth