MVP — Plataforma Mini-EAD
Stack

Backend
PHP 8.2
Laravel 12
mariadb 
Laravel Sanctum
DomPDF

Frontend
React + Vite + TailwindCSS (versão mais profissional)

Funcionalidades

Autenticação
Aluno
Cadastro
Login
Logout
Recuperação de senha
Perfil
Admin
Gerenciamento de cursos
Gerenciamento de aulas
Emissão de certificados

Modelagem
Users
id
name
email
password
role
created_at
updated_at

Role:

admin
student
Courses
id
title
slug
description
thumbnail
workload
status
created_at
updated_at

Status:

draft
published
Lessons
id
course_id
title
slug
video_url
content
position
created_at
updated_at

Relacionamento:

Curso
 ├─ Aula 1
 ├─ Aula 2
 ├─ Aula 3
Enrollments
id
user_id
course_id
created_at

Relacionamento N:N:

Usuário
 ├─ Curso Laravel
 ├─ Curso React

Curso
 ├─ João
 ├─ Maria
Lesson Progress
id
user_id
lesson_id
completed
completed_at

Exemplo:

Curso Laravel

✓ Introdução
✓ Instalação
✓ Rotas
✗ Controllers

75%
Certificates
id
user_id
course_id
certificate_code
issued_at
pdf_path
created_at
Relacionamentos Eloquent
User
public function enrollments()
{
    return $this->hasMany(Enrollment::class);
}

public function certificates()
{
    return $this->hasMany(Certificate::class);
}
Course
public function lessons()
{
    return $this->hasMany(Lesson::class);
}

public function enrollments()
{
    return $this->hasMany(Enrollment::class);
}
Lesson
public function course()
{
    return $this->belongsTo(Course::class);
}
Fluxo do Aluno

1

Cadastrar conta

↓

2

Entrar no sistema

↓

3

Escolher curso

↓

4

Matricular-se

↓

5

Assistir aulas

↓

6

Marcar aula concluída

↓

7

Sistema calcula progresso

↓

8

100% concluído

↓

9

Certificado liberado

↓

10

Download PDF
---------------------------------------
Dashboard
Cards
Cursos Matriculados: 5

Cursos Concluídos: 2

Certificados: 2
Lista
Laravel 11
████████░░ 80%

PHP 8.2
██████░░░░ 60%

React
██████████ 100%

-------------------------------------------

Certificado PDF

Pacote:

composer require barryvdh/laravel-dompdf

Template:

CERTIFICADO

Certificamos que

João Silva

concluiu com sucesso o curso

Laravel 11 para Iniciantes

Carga horária: 20 horas

Código:
CERT-2026-000001

Data:
24/06/2026
Estrutura de Pastas
app/
├── Models
├── Services
│   ├── ProgressService.php
│   └── CertificateService.php
├── Http
│   ├── Controllers
│   └── Requests

resources/
├── views
│   ├── courses
│   ├── dashboard
│   └── certificates

database/
├── migrations
├── seeders
Rotas
Route::middleware('auth')->group(function () {

    Route::get('/dashboard');

    Route::resource('courses', CourseController::class);

    Route::post('/courses/{course}/enroll');

    Route::post('/lessons/{lesson}/complete');

    Route::get('/certificates');

    Route::get('/certificates/{certificate}/download');
});
Diferenciais para Portfólio

✅ Autenticação Laravel 11
✅ PHP 8.2
✅ Relacionamentos N:N
✅ Controle de progresso por aula
✅ Dashboard com métricas
✅ Certificados PDF
✅ Upload de capa dos cursos
✅ Seeders para popular o sistema
✅ Policies e Gates para permissões
✅ Service Layer (ProgressService e CertificateService)
✅ Interface responsiva com Tailwind

Esse escopo já é suficiente para apresentar um projeto de nível intermediário/avançado em Laravel, mostrando CRUD, relacionamentos complexos, regras de negócio e geração de documentos PDF.