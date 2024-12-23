<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // Nama makanan
            $table->text('deskripsi'); // Deskripsi makanan
            $table->decimal('harga', 10, 2); // Harga makanan
            $table->string('gambar')->nullable(); // Nama file gambar
            $table->unsignedBigInteger('category_id'); // Relasi ke kategori
            $table->timestamps(); // Created_at dan updated_at

            // Foreign key ke tabel categories
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade'); // Hapus makanan jika kategori dihapus
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('foods');
    }
}