import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { month } from '@/commons';
import { useEffect, useState } from 'react';

export default function Details({ auth, event, isSiteAdmin }) {
    const [ date, setDate ] = useState(new Date(event.created_at));

    console.log(event)

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
                            event.participants.length == 0 || (event.participants.length == 1 && event.participants[0].author_id === auth.user.id) ?
                                <span className="bg-cyan-800 px-3 py-1 my-3 text-white rounded">Event proposed by <Link href={`/user/${event.author.handle}`} className="hover:bg-white hover:text-slate-900 transition-all duration-300 font-semibold">{event.author.name}</Link> on {month[date.getMonth()]} {date.getDate()}, {date.getFullYear()} {date.getHours()}.{date.getMinutes()}</span>
                            : false
                        }
                        {
                            isSiteAdmin === true ?
                                <span className="bg-blue-800 px-3 py-1 text-white rounded">You are viewing this page with Administrator privilege.</span>
                            : false
                        }
                    </div>
                    <div>
                        <div className="px-6 flex justify-between">
                            <h2 className="text-2xl font-bold text-white">Routes</h2>
                            <Link href={`${route("addeventroute")}?event=${event.id}`} className="text-white px-3 text-sm font-semibold hover:shadow-indigo-600/10 drop-shadow-2xl shadow-lg py-1 rounded bg-slate-800">Add destination</Link>
                        </div>
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
                        <div className="flex flex-col mx-8 gap-0 py-6 text-white">
                            {
                                event.participants.length > 0 ?
                                event.participants.map((e, i) => {
                                    return (
                                        <div key={i}>
                                            <Link href={"/user/"+e.participant_detail[0].handle}>
                                                {e.participant_detail[0].name}
                                            </Link>
                                        </div>
                                    )
                                })
                                : <p>No one has confirmed their attendance in this event.</p>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="px-6 text-2xl font-bold text-white">Budgets</h2>
                        <div>
                            <h3 className="font-semibold text-4xl text-white mx-8">Rp10.000</h3>
                        </div>
                        <div className="mx-8 text-sm font-semibold">
                            <Link href='#' className="bg-slate-700 hover:bg-slate-800 rounded-l px-3 py-1 text-md text-white">Add budget</Link>
                            <Link href='#' className="bg-indigo-800 hover:bg-indigo-900 rounded-r px-3 py-1 text-md text-white">View details</Link>
                        </div>
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
