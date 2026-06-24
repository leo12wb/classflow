<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->canManageCourses();
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'workload' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'in:draft,published'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
