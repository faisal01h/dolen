import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { month } from '@/commons';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Add({ auth, event }) {
    const eventRoute = usePage().props.eventRoute;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        startdate: '',
        enddate: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('storeevent'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Add Event" />

            <div className="py-12 bg-slate-900 dark:bg-dots-lighter min-h-screen">
                <div className="max-w-7xl sm:px-6 lg:px-12">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg flex justify-between items-center">
                        <div className="p-6 text-3xl lg:text-6xl font-bold text-white">Add Destination</div>
                        <a className="px-3 py-2 rounded bg-rose-700 text-white h-fit" href={route("events")}>Cancel</a>
                    </div>

                    <form className="flex flex-col mx-8 gap-5" onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Event name" className='dark:text-gray-100' />

                            <TextInput
                                id="name"
                                className="mt-1 block w-64 l lg:w-80 dark:bg-transparent dark:border-slate-700 dark:text-white"
                                value={event.name}
                                disabled
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="coordinate" value="Coordinate" className='dark:text-gray-100' />

                            <TextInput
                                id="coordinate"
                                className="mt-1 block w-64 l lg:w-80 dark:bg-slate-600 dark:border-slate-700 dark:text-white"
                                placeholder="Latitude, Longitude"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="startdate" value="Start date" className='dark:text-gray-100' />

                            <input id="startdate" type="datetime-local" className="rounded-lg bg-slate-600 text-white" onChange={(e) => setData('startdate', e.target.value)}></input>

                            <InputError className="mt-2" message={errors.startdate} />
                        </div>
                        <div>
                            <InputLabel htmlFor="enddate" value="End date" className='dark:text-gray-100' />

                            <input id="enddate" type="datetime-local" className="rounded-lg bg-slate-600 text-white" onChange={(e) => setData('enddate', e.target.value)}></input>

                            <InputError className="mt-2" message={errors.enddate} />
                        </div>
                        <span className="text-xs text-gray-300">Powered by <a href="//openstreetmap.org" target="_blank" className="font-bold">OpenStreetMap</a></span>
                        <button type="submit" className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 w-fit rounded-lg">Submit</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
