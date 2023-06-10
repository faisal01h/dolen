<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Eventroutes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $events = Event::get();

        return Inertia::render("Event/List", [
            "events" => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }
}
