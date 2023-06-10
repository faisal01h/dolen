<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'event_id',
        'is_participating',
    ];
}
