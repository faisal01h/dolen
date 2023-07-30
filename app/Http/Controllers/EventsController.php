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

    private function coordinateLookup(string $latitude, string $longitude, ?bool $assocResult = false) : object|array {
        // https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=-34.44076&lon=-58.70521
        $url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=$latitude&lon=$longitude";
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0');

        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, $assocResult);

        //usage:
        // // header("Content-Type: application/json");
        // $loc = $this->coordinateLookup('-8.1503','112.5772');
        // $address = $loc->address;
        // echo "$address->village, $address->county, $address->state";
        // // print_r($loc);
    }

    private function debugJson($var) {
        header("Content-Type: application/json");
        echo json_encode($var);
        die();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $p = Participant::where('author_id', Auth::user()->id)->get();

        for($i = 0; $i < count($p); ++$i) {
            if($p[$i]->event) {
                $p[$i]->event;
            } else {
                continue;
            }
            $p[$i]->event->participants = $p[$i]->event->participants;
            $p[$i]->event->routes = $p[$i]->event->routes;
            $p[$i]->author_detail = $p[$i]->authorDetail;

        }


        // $this->debugJson(now());

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
            $events["participants"][$i]->participant_detail = $events["participants"][$i]->authorDetail;
        }
        // $this->debugJson($events);
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

    public function storeRoute(Request $request)
    {
        $request->validate([
            "event_id" => "required|exists:events,id",
            "coordinate" => "required|string",
            "startdate" => "required|string",
            "enddate" => "required|string",
            "pinpoint" => "required|string"
        ]);
        $coord = explode(",", $request->coordinate);
        $lat = trim($coord[0], " ");
        $lon = trim($coord[1], " ");

        Eventroutes::create([
            "author_id" => Auth::user()->id,
            "event_id" => $request->event_id,
            "name" => $request->pinpoint,
            "coordinates" => $request->coordinate,
            "human_address" => json_encode($this->coordinateLookup($lat, $lon)),
            "image" => "",
            "start_date" => $request->startdate,
            "end_date" => $request->enddate
        ]);

        return Inertia::location(route("eventdetail", [$request->event_id]));
    }
}
