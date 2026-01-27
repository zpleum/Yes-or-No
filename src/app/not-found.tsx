'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#fff5f7] overflow-hidden font-sans">
            <div className="flex flex-col items-center gap-8 px-4 z-10 text-center">
                <h1 className="text-8xl md:text-9xl font-light tracking-tighter text-pink-200 animate-float-slow">
                    404
                </h1>
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight text-pink-600">
                        Page not found
                    </h2>
                    <p className="text-pink-400 text-lg">
                        Looks like you're lost in the pink void.
                    </p>
                </div>

                <Link
                    href="/"
                    className="mt-4 px-10 py-4 bg-pink-500 text-white text-lg font-medium rounded-full cursor-pointer shadow-sm hover:shadow-pink-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-500 ease-out select-none inline-block no-underline"
                    style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                    GO BACK HOME
                </Link>
            </div>
        </div>
    );
}
