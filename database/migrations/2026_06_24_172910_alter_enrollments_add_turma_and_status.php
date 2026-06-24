<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            // turma_id may already exist from a partial run — drop it and re-add with FK
            if (Schema::hasColumn('enrollments', 'turma_id')) {
                $table->dropColumn('turma_id');
            }
        });

        Schema::table('enrollments', function (Blueprint $table) {
            $table->foreignId('turma_id')->nullable()->constrained('turmas')->nullOnDelete()->after('course_id');

            if (!Schema::hasColumn('enrollments', 'status')) {
                $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->after('turma_id');
            }

            if (!Schema::hasColumn('enrollments', 'notes')) {
                $table->text('notes')->nullable()->after('status');
            }
        });

        // Matrículas existentes ficam aprovadas por padrão
        DB::table('enrollments')->update(['status' => 'approved']);
    }

    public function down(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->dropForeign(['turma_id']);
            $table->dropColumn(['turma_id', 'status', 'notes']);
        });
    }
};
