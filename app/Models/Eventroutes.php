<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eventroutes extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'event_id',
        'name',
        'coordinates',
        'start_date',
        'end_date',
        'coordinates',
        'human_address',
        'image'
    ];
}
