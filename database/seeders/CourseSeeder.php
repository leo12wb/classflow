<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $teacher = User::where('email', 'professor@miniead.com')->first();
        $admin = User::where('email', 'admin@miniead.com')->first();

        $courses = [
            [
                'title' => 'Laravel 11 para Iniciantes',
                'slug' => 'laravel-11-para-iniciantes',
                'description' => 'Aprenda Laravel do zero ao avançado com projetos práticos.',
                'workload' => 20,
                'status' => 'published',
                'lessons' => [
                    ['title' => 'Introdução ao Laravel', 'position' => 1, 'content' => 'Boas-vindas ao curso de Laravel. Vamos aprender os conceitos fundamentais.'],
                    ['title' => 'Instalação e Configuração', 'position' => 2, 'content' => 'Instalando o Laravel e configurando o ambiente de desenvolvimento.'],
                    ['title' => 'Rotas e Controllers', 'position' => 3, 'content' => 'Aprenda a criar rotas e controllers no Laravel.'],
                    ['title' => 'Eloquent ORM', 'position' => 4, 'content' => 'Trabalhando com banco de dados usando o Eloquent ORM.'],
                    ['title' => 'Blade Templates', 'position' => 5, 'content' => 'Criando views com o motor de templates Blade.'],
                ],
            ],
            [
                'title' => 'PHP 8.2 Moderno',
                'slug' => 'php-8-2-moderno',
                'description' => 'Domine os recursos modernos do PHP 8.2 com exemplos práticos.',
                'workload' => 15,
                'status' => 'published',
                'lessons' => [
                    ['title' => 'Introdução ao PHP 8.2', 'position' => 1, 'content' => 'Novidades do PHP 8.2 e o que mudou desde versões anteriores.'],
                    ['title' => 'Tipos e Type Hints', 'position' => 2, 'content' => 'Sistema de tipos do PHP 8.2, union types, intersection types.'],
                    ['title' => 'Fibers e Concorrência', 'position' => 3, 'content' => 'Programação assíncrona com Fibers no PHP 8.2.'],
                    ['title' => 'Atributos PHP', 'position' => 4, 'content' => 'Usando atributos (annotations) no PHP moderno.'],
                    ['title' => 'Readonly Properties', 'position' => 5, 'content' => 'Propriedades readonly e classes readonly.'],
                ],
            ],
            [
                'title' => 'React do Zero ao Avançado',
                'slug' => 'react-do-zero-ao-avancado',
                'description' => 'Construa interfaces modernas com React, hooks e muito mais.',
                'workload' => 25,
                'status' => 'published',
                'lessons' => [
                    ['title' => 'Introdução ao React', 'position' => 1, 'content' => 'O que é React e por que usá-lo. Criando seu primeiro componente.'],
                    ['title' => 'JSX e Componentes', 'position' => 2, 'content' => 'Entendendo JSX, props e a composição de componentes.'],
                    ['title' => 'Estado com useState', 'position' => 3, 'content' => 'Gerenciamento de estado local com o hook useState.'],
                    ['title' => 'Efeitos com useEffect', 'position' => 4, 'content' => 'Gerenciando efeitos colaterais com useEffect.'],
                    ['title' => 'Context API', 'position' => 5, 'content' => 'Compartilhando estado global com a Context API.'],
                ],
            ],
        ];

        foreach ($courses as $index => $courseData) {
            $lessons = $courseData['lessons'];
            unset($courseData['lessons']);

            // Primeiro curso é do admin, os demais do professor
            $courseData['user_id'] = $index === 0 ? $admin->id : $teacher->id;

            $course = Course::create($courseData);

            foreach ($lessons as $lessonData) {
                $lessonData['slug'] = \Illuminate\Support\Str::slug($lessonData['title']);
                $course->lessons()->create($lessonData);
            }
        }
    }
}
