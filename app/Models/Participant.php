<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Participant extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'event_id',
        'is_participating',
    ];

    public function getEvents(): HasMany {
        return $this->hasMany(Event::class);
    }

    public function participantDetail(): HasMany {
        return $this->hasMany(User::class, 'id', 'author_id');
    }
}
