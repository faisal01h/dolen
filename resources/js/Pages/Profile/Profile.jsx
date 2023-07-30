import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { month } from '@/commons';
import { useEffect, useState } from 'react';

export default function Profile({ auth, profile, history }) {
    const [ date, setDate ] = useState(new Date(profile.created_at));
    console.log(profile)

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Events" />

            <div className="py-12 bg-slate-900 dark:bg-dots-lighter min-h-screen">
                <div className="max-w-7xl sm:px-6 lg:px-12">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-2">
                        <h1 className="text-6xl font-bold text-white">{profile.name}</h1>
                        <h2 className="text-md text-white">{profile.handle}</h2>

                    </div>
                    <div>
                        <div className="flex flex-col mx-8 gap-0 py-6 text-white">
                            <p>{history.length} events attended.</p>
                        </div>
                    </div>


                </div>
            </div>
        </AuthenticatedLayout>
    );
}
