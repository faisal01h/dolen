import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">Timeline</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 flex flex-col gap-3">
                <div className="sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
                <div className="sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Event Radar</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
