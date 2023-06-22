<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'author_id',
        'name',
        'start_date',
        'end_date',
        'is_visible'
    ];

    public function routes(): HasMany {
        return $this->hasMany(Eventroutes::class);
    }

    public function participants(): HasMany {
        return $this->hasMany(Participant::class);
    }
}
