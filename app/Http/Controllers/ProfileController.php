<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Circle;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $circles = User::find($request->user()->id)->circles;
        $circlesinfo = [];
        foreach ($circles as $c) {
            array_push($circlesinfo, Circle::find($c->circle_id));
        }


        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'userCircles' => $circlesinfo
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function view($handle) {
        $profile = User::where("handle", $handle)->firstOrFail();
        $history = Participant::where("author_id", $profile->id)->get();
        $history = $history->reject(function (Participant $participation) {
            return $participation->is_participating == 0;
        });
        foreach($history as $h) {
            $h->event;
        }

        return Inertia::render("Profile/Profile", [
            "profile" => $profile,
            "history" => $history
        ]);
    }
}
