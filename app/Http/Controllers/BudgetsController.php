<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Event;
use App\Models\Eventroutes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

class BudgetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $request->validate([
            "event" => "required|integer"
        ]);

        $event = Event::findOrFail($request->event);

        $budgets = Budget::where("event_id", $event->id)->get();
        $totalBudgets = 0;
        for($i = 0; $i < count($budgets); ++$i) {
            $budgets[$i]->user;
            $totalBudgets += $budgets[$i]->amount;
        }

        return Inertia::render("Budget/List", [
            "budgets" => $budgets,
            "total_budget" =>$totalBudgets,
            "event" => $event
        ]);
    }

    public function detail($id)
    {
        //
        $events = Event::find($id);
        $events["routes"] = $events->routes;
        $events["participants"] = $events->participants()->where('is_participating', 1)->get();
        $events["author"] =  User::find($events->author_id);

        return Inertia::render("Event/Details", [
            "event" => $events
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
            "author_id" => $request->user()->id,
            "is_visible" => true,
            "name" => $request->name,
            "start_date" => date_format(new \DateTime($request->startdate), "Y-m-d H:i:sO"),
            "end_date" => date_format(new \DateTime($request->enddate), "Y-m-d H:i:sO"),
        ]);

        return Inertia::location(route("events"));
    }
}
