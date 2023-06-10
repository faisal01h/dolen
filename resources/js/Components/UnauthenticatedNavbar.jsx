import { Link } from "@inertiajs/react"
import React from "react"
export default function UnauthenticatedNavbar() {
    return (
        <div className="fixed top-0 left-0 p-6 flex flex-row w-screen justify-between dark:bg-slate-900 bg-slate-200">
            <div>
                <h1 className="text-teal-500 font-bold text-2xl">Dolen</h1>
            </div>

            <div>
                <Link
                    href={route('login')}
                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                    Log in
                </Link>

                <Link
                    href={route('register')}
                    className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                    Register
                </Link>
            </div>

        </div>
    )
}
