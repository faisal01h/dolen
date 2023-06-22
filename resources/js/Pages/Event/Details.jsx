import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { month } from '@/commons';

export default function Details({ auth, event }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Events" />

            <div className="py-12 bg-slate-900 dark:bg-dots-lighter min-h-screen">
                <div className="max-w-7xl sm:px-6 lg:px-12">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-2">
                        <div className="text-6xl font-bold text-white">{event.name}</div>
                        {
                            event.participants.length == 0 ?
                                <span className="bg-slate-800 px-3 py-1 text-white rounded">Event proposed by <Link href={`/user/${event.author.handle}`} className="hover:bg-white hover:text-slate-900 transition-all duration-300 font-semibold">{event.author.name}</Link> on {Date(event.created_at)}</span>
                            : false
                        }
                    </div>
                    <div>
                        <h2 className="px-6 text-2xl font-bold text-white">Routes</h2>
                        <ul className="flex flex-col mx-8 gap-0 py-6 text-white">
                            {
                                event.routes.length > 0 ?
                                event.routes.map((e, i) => {
                                    return (
                                        <li className={`dark:text-gray-200 px-5 flex flex-col w-fit items-start pb-8`} key={i}>
                                            <div className="dark:bg-slate-800 px-3 py-2 rounded-lg">
                                                <h3 className="font-semibold">{e.name}</h3>
                                                <span className="font-thin text-xs">{e.start_date}</span>
                                            </div>
                                        </li>
                                    )
                                })
                                : <p>No route is planned for this event.</p>
                            }
                        </ul>
                    </div>
                    <div>
                        <h2 className="px-6 text-2xl font-bold text-white">Attendance</h2>
                        <ul className="flex flex-col mx-8 gap-0 py-6 text-white">
                            <p>No one has confirmed their attendance in this event.</p>
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    overflow: hidden;
                    position: relative;
                }
                li::before {
                    content: '';
                    position: absolute;
                    left: 9px;
                    top: 9px;
                    width: 20px;
                    height: 999px;
                    border: 2px solid lightblue;
                    border-width: 0px 0 0 2px;
                }
                li:last-child::before {
                    border-width: 0px 0 0;
                }
                li::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 16px;
                    height: 16px;
                    background: #fff;
                    border: 2px solid lightblue;
                    border-radius: 50%;
                }
                li.current, li.passed {
                    color: #000;
                }
                li.current::before {
                    border-top-color: dodgerblue;
                }
                li.current::after {
                    border-color: dodgerblue;
                    background: dodgerblue;
                }
                li.passed::before, li.passed::after {
                    border-color: dodgerblue;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
