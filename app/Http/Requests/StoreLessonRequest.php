<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLessonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->canManageCourses();
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'video_url' => ['nullable', 'url'],
            'content' => ['nullable', 'string'],
            'position' => ['required', 'integer', 'min:0'],
        ];
    }
}
