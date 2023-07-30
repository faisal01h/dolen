import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { month } from '@/commons';

export default function List({ auth, events }) {
    // console.log(events);
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Events" />

            <div className="py-12 bg-slate-900 dark:bg-dots-lighter min-h-screen">
                <div className="max-w-7xl sm:px-6 lg:px-12">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg flex justify-between items-center">
                        <div className="p-6 text-6xl font-bold text-white">Events</div>
                        <a className="px-3 py-2 rounded bg-slate-700 text-white h-fit" href={route("addevent")}>Add event</a>
                    </div>

                    {
                        events.length > 0 ?
                        <div className="flex flex-col mx-8 gap-5">
                            {
                                events.map((e, i) => {
                                    if(e.event) {
                                        let start = new Date(e.event.start_date);
                                        let end = new Date(e.event.end_date);
                                        return (
                                            <Link key={i} className="rounded-lg bg-white/10 text-gray-100 px-6 py-4 flex-col hover:bg-white/20 transform duration-500" href={"/event/"+e.event_id}>
                                                <h2 className="font-bold text-2xl tracking-wider">{e.event.name}</h2>
                                                <span className="tracking-tight text-sm">
                                                    {start.getDate()} {month[start.getMonth()]} {start.getFullYear() === end.getFullYear() ? false : start.getFullYear()} - {end.getDate()} {month[end.getMonth()]} {end.getFullYear()}
                                                </span>
                                                <p>{e.event.routes.length} destination{e.event.routes.length > 1 ? "s" : false}, {e.event.participants.length} participant{e.event.participants.length > 1 ? "s" : false}</p>
                                                <div>

                                                </div>
                                            </Link>
                                        )
                                    }
                                })
                            }
                        </div>
                        :
                        <p>Tidak ada event terjadwal.</p>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
