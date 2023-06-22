import UnauthenticatedNavbar from '@/Components/UnauthenticatedNavbar';
import { Link, Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Welcome({ appVer, appBuild, appBuilder, agendaCount = 0 }) {

    return (
        <>
            <Head title="Selamat datang" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-slate-900 selection:bg-teal-500 selection:text-white">
            <UnauthenticatedNavbar />
                <div className="w-screen p-6 lg:p-8">
                    <div className='h-screen p-12 flex flex-col lg:flex-row justify-between'>
                        <div className="flex h-full items-center justify-center lg:justify-start">
                            <h2 className="font-bold dark:text-gray-50 text-5xl lg:text-6xl">Ayo Dolen!</h2>
                        </div>
                        <div className="flex h-full items-center justify-center lg:justify-start">
                            <span className="font-mono dark:text-gray-50 text-md lg:text-md">{agendaCount} agenda{agendaCount > 1 ? "s are" : " is"} planned.</span>
                        </div>
                    </div>

                    <div className="flex justify-start hidden">
                        <h2 className="font-bold dark:text-gray-50 text-4xl lg:text-6xl">Ayo Dolen!</h2>
                    </div>
                    <div className="mt-8 hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            <a
                                href="/discussion"
                                className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-teal-500"
                            >
                                <div>
                                    <div className="h-16 w-16 bg-teal-50 dark:bg-teal-800/20 flex items-center justify-center rounded-full">
                                        {/* Icon */}
                                    </div>

                                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                        Forum Tanya Jawab
                                    </h2>

                                    <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                        Laravel has wonderful documentation covering every aspect of the framework.
                                        Whether you are a newcomer or have prior experience with Laravel, we recommend
                                        reading our documentation from beginning to end.
                                    </p>
                                </div>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    className="self-center shrink-0 stroke-teal-500 w-6 h-6 mx-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                    />
                                </svg>
                            </a>

                            <a
                                href="/consult"
                                className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-teal-500"
                            >
                                <div>
                                    <div className="h-16 w-16 bg-teal-50 dark:bg-teal-800/20 flex items-center justify-center rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            className="w-7 h-7 stroke-teal-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                                            />
                                        </svg>
                                    </div>

                                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                        Konsultasi
                                    </h2>

                                    <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                        Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript
                                        development. Check them out, see for yourself, and massively level up your
                                        development skills in the process.
                                    </p>
                                </div>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    className="self-center shrink-0 stroke-teal-500 w-6 h-6 mx-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                    />
                                </svg>
                            </a>

                        </div>
                    </div>

                    <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between hidden">
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
                            <div className="flex items-center gap-4">
                                <a
                                    href="/donate"
                                    className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-teal-500"
                                >
                                    Donate
                                </a>
                                <a
                                    href="/advertise"
                                    className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-teal-500"
                                >
                                    Advertise
                                </a>
                            </div>
                        </div>

                        <div className="ml-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
                            Dolen v{appVer} (build {appBuild} by {appBuilder})
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
