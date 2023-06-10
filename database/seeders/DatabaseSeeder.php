<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        /*
            $table->string('name');
            $table->string('handle')->unique();
            $table->string('email')->unique();
            $table->integer('role')->default(1);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        */

        \App\Models\User::factory()->create([
            'name' => 'Faisal Hanif',
            'handle' => 'faisal',
            'email' => 'faisal01h@gmail.com',
            'role' => 3,
            'password' => Hash::make("28092001"),
        ]);
    }
}
