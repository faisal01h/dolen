<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'amount',
        'author_id',
        'hash',
        'event_id'
    ];

    public function user(): HasOne {
        return $this->hasOne(User::class, 'id', 'author_id');
    }
}
