<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('eventroutes', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('author_id');
            $table->foreignId('event_id')->constrained(
                table: 'events',
                indexName: 'routes_event_id'
            )->cascadeOnDelete();
            $table->foreign('author_id')->references('id')->on('users');
            $table->string('name');
            $table->dateTimeTz('start_date');
            $table->dateTimeTz('end_date');
            $table->string('coordinates');
            $table->string('human_address');
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventroutes');
    }
};
