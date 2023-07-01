<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CircleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\Circle::factory()->create([
            'name' => 'Admin',
            'description' => 'admin-only circle',
            'picture' => 'nil',
            'handle' => 'admin'
        ]);

        \App\Models\Usercircle::factory()->create([
            'user_id' => 1,
            'circle_id' => 1
        ]);

    }
}
