"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Head() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </>
  );
}

const Header = () => (
  <header className="w-full flex justify-between items-center px-12 py-6 bg-transparent max-w-7xl mx-auto">
    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent select-none cursor-default">
      Course Forge
    </h1>
    <nav className="space-x-8 text-gray-300 text-lg font-medium">
      <a href="#features" className="hover:text-indigo-400 transition">
        Features
      </a>
      <a href="#courses" className="hover:text-indigo-400 transition">
        Courses
      </a>
      <a href="#contact" className="hover:text-indigo-400 transition">
        Contact
      </a>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="w-full border-t border-gray-700 mt-24 py-10 bg-transparent text-gray-400 text-center max-w-7xl mx-auto px-6">
    <p className="mb-4 text-sm">&copy; {new Date().getFullYear()} Course Forge. All rights reserved.</p>
    <div className="flex justify-center gap-10 mb-6 text-base font-semibold">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-indigo-500 transition"
      >
        Twitter
      </a>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-indigo-500 transition"
      >
        Facebook
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-indigo-500 transition"
      >
        LinkedIn
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-indigo-500 transition"
      >
        Instagram
      </a>
    </div>
    <p className="max-w-2xl mx-auto text-sm leading-relaxed">
      Course Forge leverages cutting-edge AI technology to help educators craft personalized, engaging online courses faster and smarter. Build impactful learning journeys effortlessly.
    </p>
  </footer>
);

const CourseCard = ({ title, description, image }) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg max-w-sm hover:shadow-indigo-500/40 transition-shadow duration-300 flex flex-col items-center text-center scale-110">
    <img
      src={image}
      alt={title}
      className="rounded-lg mb-6 w-full h-48 object-cover shadow-md"
      loading="lazy"
    />
    <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300 text-base mb-6">{description}</p>
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition text-lg">
      Preview
    </button>
  </div>
);

export default function LandingPage() {
  const router = useRouter();
  const featuresRef = useRef(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => router.push("/workspace");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1229] to-[#1e1e2f] text-gray-100 flex flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto mt-20">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent fadeInUp fadeInUpDelay1">
          Welcome to Course Forge
        </h2>
        <p className="max-w-lg text-lg md:text-xl text-gray-300 mb-12 fadeInUp fadeInUpDelay2">
          Instantly generate AI-powered courses tailored to your audience. Save time, spark creativity, and build learning experiences faster than ever.
        </p>

        <button
          onClick={handleGetStarted}
          className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xl px-12 py-5 rounded-xl shadow-lg shadow-indigo-600/50 hover:shadow-indigo-700/80 transition fadeInUp fadeInUpDelay3"
        >
          Get Started <ArrowRight size={26} />
        </button>

        {/* Features Section */}
        <section
          id="features"
          ref={featuresRef}
          className="mt-28 w-full max-w-5xl"
        >
          <h3 className="text-3xl font-semibold mb-12 text-white">
            Key Features
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300 text-lg list-disc list-inside">
            {[
              {
                title: "AI-Powered Generation",
                desc: "Automatically create comprehensive course outlines, content, and quizzes with just a few clicks, saving you hours of manual work.",
              },
              {
                title: "Customizable Templates",
                desc: "Choose from professional and modern course templates that can be personalized to match your brand and audience preferences.",
              },
              {
                title: "Multi-format Support",
                desc: "Seamlessly create videos, slides, scripts, and interactive content to cater to different learning styles and platforms.",
              },
              {
                title: "Team Collaboration",
                desc: "Collaborate in real-time with your team, allowing multiple contributors to co-create and edit course content simultaneously.",
              },
              {
                title: "Easy Export & Integration",
                desc: "Publish your courses effortlessly on popular LMS platforms or embed them directly into your website or app.",
              },
              {
                title: "Advanced Analytics",
                desc: "Track learner engagement, progress, and feedback to continuously improve your courses and maximize impact.",
              },
              {
                title: "Personalized Learning Paths",
                desc: "Design adaptive courses that tailor content delivery based on learner preferences and performance.",
              },
            ].map(({ title, desc }, i) => (
              <li
                key={i}
                className={`opacity-0 transform translate-y-6 transition-all duration-700 ${
                  featuresVisible ? "opacity-100 translate-y-0" : ""
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <strong>{title}:</strong> {desc}
              </li>
            ))}
          </ul>
        </section>

        {/* Courses Section */}
        <section
          id="courses"
          className="mt-20 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12"
        >
          <CourseCard
            title="AI for Beginners"
            description="A beginner-friendly course on understanding the basics of AI."
            image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
          />
          <CourseCard
            title="React Mastery"
            description="Learn advanced concepts and patterns in React development."
            image="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80"
          />
          <CourseCard
            title="Prompt Engineering"
            description="Craft effective prompts to harness the full power of AI models."
            image="https://images.unsplash.com/photo-1537432376769-00d5a2148e49?auto=format&fit=crop&w=800&q=80"
          />
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fadeInUp {
          opacity: 0;
          animation-name: fadeInUp;
          animation-duration: 0.8s;
          animation-timing-function: ease;
          animation-fill-mode: forwards;
        }

        .fadeInUpDelay1 {
          animation-delay: 0.3s;
        }

        .fadeInUpDelay2 {
          animation-delay: 0.6s;
        }

        .fadeInUpDelay3 {
          animation-delay: 0.9s;
        }

        button:focus {
          outline: none;
          box-shadow: 0 0 8px 3px rgba(99, 102, 241, 0.7);
        }
      `}</style>
    </div>
  );
}
