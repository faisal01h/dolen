import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { month } from '@/commons';

export default function List({ auth, budgets, total_budget }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Budgets" />

            <div className="py-12 bg-slate-900 dark:bg-dots-lighter min-h-screen">
                <div className="max-w-7xl sm:px-6 lg:px-12">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg flex justify-between items-center">
                        <div className="p-6 text-6xl font-bold text-white">Budgets</div>
                        <a className="px-3 py-2 rounded bg-slate-700 text-white h-fit" href={route("addevent")}>Add budget</a>
                    </div>

                    <div className="text-white mx-6 px-4 py-5 bg-indigo-900 rounded-lg">
                        <span>Total budget</span>
                        <h1 className="font-bold text-4xl">Rp{total_budget}</h1>
                    </div>

                    <div className="flex flex-col mx-8 gap-3 mt-8">
                        {
                            budgets.map((e, i) => {
                                console.log(e)
                                let type = e.amount >= 0 ? "Debit" : "Credit";
                                return (
                                    <div key={i} className="rounded-lg bg-white/10 text-gray-100 px-6 py-2 flex flex-row justify-between items-center hover:bg-white/20 transform duration-500 hover:py-4 text-lg hover:text-xl ">
                                        <div className="flex flex-col">
                                            <h2 className={`font-bold tracking-wider`}>{type}</h2>
                                            <Link className="tracking-tight text-sm hover:bg-white hover:text-slate-900 transition-all duration-300" href={route('profile.view', e.user.handle)}>
                                                {type}or: {e.user.name}
                                            </Link>
                                            <p>{e.description}</p>
                                        </div>
                                        <div className={`font-bold ${type == "Debit" ? "text-emerald-300" : "text-rose-300"}`}>
                                            {e.amount}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
