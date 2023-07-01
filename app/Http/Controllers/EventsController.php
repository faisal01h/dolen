<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Eventroutes;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $p = Participant::where('author_id', Auth::user()->id)->get();
        for($i = 0; $i < count($p); ++$i) {

            $p[$i]["event"] = Event::where("end_date", ">", now())->where('id', $p[$i]->event_id)->limit(1)->get()[0];
            $p[$i]["routes"] = $p[$i]["event"]->routes;
            $p[$i]["participants"] = $p[$i]["event"]->participants()->where('is_participating', 1)->get();
        }
        // return $p;

        // $events = Event::where("end_date", ">", now())->get();
        // for($i = 0; $i < count($events); ++$i) {
        //     $events[$i]["routes"] = $events[$i]->routes;
        //     $events[$i]["participants"] = $events[$i]->participants()->where('is_participating', 1)->get();
        // }
        // return $events;

        return Inertia::render("Event/List", [
            "events" => $p
        ]);
    }

    public function detail($id)
    {
        //
        $participant = Participant::where('author_id', Auth::user()->id)->where('event_id', $id)->get();
        $isSiteAdmin = false;
        if(Auth::user()->role < 2 && count($participant) === 0) {

            return redirect(route("events"));

        } else {
            if(count($participant) === 0) $isSiteAdmin = true;
        }

        $events = Event::find($id);
        $events["routes"] = $events->routes;
        $events["participants"] = $events->participants()->where('is_participating', 1)->get();
        $events["author"] =  User::find($events->author_id);

        for($i = 0; $i < count($events["participants"]); ++$i) {
            $events["participants"][$i]->participantDetail;
        }

        return Inertia::render("Event/Details", [
            "event" => $events,
            "isSiteAdmin" => $isSiteAdmin
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render("Event/Add");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            "name" => "string|min:1|required",
            "startdate" => "string|required",
            "enddate" => "string|required",
        ]);

        $event = Event::create([
            "author_id" => Auth::user()->id,
            "is_visible" => true,
            "name" => $request->name,
            "start_date" => date_format(new \DateTime($request->startdate), "Y-m-d H:i:sO"),
            "end_date" => date_format(new \DateTime($request->enddate), "Y-m-d H:i:sO"),
        ]);

        Participant::create([
            "author_id" => $event->author_id,
            "event_id" => $event->id,
            "is_participating" => 1
        ]);

        return Inertia::location(route("events"));
    }

    public function createRoute(Request $request)
    {
        //
        $request->validate([
            "event" => "required|integer"
        ]);
        $event = Event::findOrFail($request->event);
        return Inertia::render("Event/Route/Add", [
            "event" => $event
        ]);
    }
}
