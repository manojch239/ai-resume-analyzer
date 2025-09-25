import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import type Navbar from "~/components/Navbar";
import { resumes } from "../../constants";
import { callbackify } from "util";
import ResumeCard from "~/components/ResumeCard";
import { useLocation, useNavigate, type NavigateFunction } from 'react-router';
import { usePuterStore } from '~/lib/puter';
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
   const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next: string = location.search.split('next=')[1];
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            // Redirect to home or dashboard after successful login
            navigate('auth?next=/');
            // window.location.href = '/';
        }
    }, [auth.isAuthenticated]);




  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">

    <section className="main-section">
      <div className="page-heading py-16">
         <h1>Track Your Application & Resume Ratings</h1>
         <h2>Review your submission and check AI powered feedback.</h2>
      </div>
    </section>

    {resumes.length > 0 && (
    <div className="resumes-section">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume ={resume} />
      ))}
    </div>
    )}
  </main>
}
