<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Participant extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'event_id',
        'is_participating',
    ];

    public function event(): HasOne {
        return $this->hasOne(Event::class, 'id', 'event_id')->where('start_date', '>=', now("Asia/Jakarta"));
    }

    public function authorDetail(): HasMany {
        return $this->hasMany(User::class, 'id', 'author_id');
    }
}
