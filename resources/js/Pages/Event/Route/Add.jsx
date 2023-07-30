import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { month } from '@/commons';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useState } from 'react';

export default function Add({ auth, event }) {
    const eventRoute = usePage().props.eventRoute;

    const [ poi, setPoi ] = useState([]);
    const [ coord, setCoord ] = useState("");

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        // name: '',
        event_id: event.id,
        pinpoint: '',
        coordinate: '',
        startdate: '',
        enddate: ''
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);


        post(route('storeeventroute'));
    };

    const pinpointChange = (e) => {
        let value = e.target.value;
        axios.get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)
        .then((response) => {
            setPoi(response.data);
            setData('pinpoint', e.target.value);
        })
        .catch((_err) => {
            setPoi([]);
        })
    }

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
                            <InputLabel htmlFor="pinpoint" value="Place" className='dark:text-gray-100' />

                            <TextInput
                                id="pinpoint"
                                className="mt-1 block w-64 l lg:w-80 dark:bg-transparent dark:border-slate-700 dark:text-white"
                                value={event.pinpoint}
                                onChange={e => {
                                    pinpointChange(e)
                                }}
                            />
                            {
                                poi.length > 0 ?
                                <div className="bg-slate-700 rounded-lg">
                                    <div className="flex flex-col text-gray-100 items-start gap-0 max-h-24 overflow-auto bg-slate-800 rounded-lg mt-2">
                                        {
                                            poi.map((e, i) => {
                                                return (
                                                    <div key={i} onClick={() => {setCoord(`${e.lat},${e.lon}`); setData('coordinate', `${e.lat},${e.lon}`)}} className="hover:bg-blue-800 px-2 w-full cursor-pointer py-1">
                                                        {e.display_name} ({e.type})
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <span className="text-white font-light text-xs mx-2">&copy; {new Date().getFullYear()} OpenStreetMap</span>
                                </div> : false
                            }
                            <InputError className="mt-2" message={errors.pinpoint} />
                        </div>
                        <div>
                            <InputLabel htmlFor="coordinate" value="Coordinate" className='dark:text-gray-100' />

                            <TextInput
                                id="coordinate"
                                className="mt-1 block w-64 l lg:w-80 dark:bg-slate-600 dark:border-slate-700 dark:text-white"
                                placeholder="Latitude, Longitude"
                                value={coord}
                                onChange={(_e) => setData("coordinate", e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.coordinate} />
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
                        <button type="submit" className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 w-fit rounded-lg" onClick={submit}>Submit</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
