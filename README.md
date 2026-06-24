# Plataforma Mini-EAD

> Plataforma de ensino online com cursos estruturados, turmas, controle de progresso por aula e emissão automática de certificados PDF.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | PHP 8.2 + Laravel 12 |
| Frontend | React + Inertia.js + Vite |
| Estilização | TailwindCSS |
| Banco de Dados | MySQL / MariaDB |
| Autenticação | Laravel Breeze + Sanctum |
| Geração de PDF | DomPDF (`barryvdh/laravel-dompdf`) |

---

## Funcionalidades

- Cadastro, login, logout e recuperação de senha
- Catálogo de cursos com thumbnail e status (rascunho / publicado)
- **Turmas por curso** — cada curso pode ter múltiplas turmas (ativas ou encerradas)
- **Fluxo de matrícula com aprovação** — aluno solicita inscrição; admin aprova e atribui turma
- Marcação de aulas como concluídas com cálculo de progresso em tempo real
- Emissão automática de certificado ao atingir 100% do curso
- Download de certificado em PDF com código único de verificação
- Dashboard personalizado por papel (admin / professor / aluno)
- Soft delete em cursos, aulas, usuários e matrículas
- Upload de imagem de capa dos cursos
- Controle de acesso por papéis via Policies e Gates
- Atribuição de múltiplos professores por curso (relação N:N)
- Painel de desempenho dos alunos por turma (progresso individual)

---

## Papéis de Usuário

| Ação | Admin | Professor | Aluno |
|------|:-----:|:---------:|:-----:|
| Criar curso | ✅ | ✅ | ❌ |
| Editar qualquer curso | ✅ | ❌ | ❌ |
| Editar curso próprio ou atribuído | ✅ | ✅ | ❌ |
| Excluir curso | ✅ | ✅ (só criados por si) | ❌ |
| Criar / editar aulas | ✅ | ✅ (cursos seus ou atribuídos) | ❌ |
| Atribuir professores a cursos | ✅ | ❌ | ❌ |
| Criar e gerenciar turmas | ✅ | ❌ | ❌ |
| Aprovar / rejeitar matrículas | ✅ | ❌ | ❌ |
| Matricular aluno diretamente | ✅ | ❌ | ❌ |
| Ver rascunhos | ✅ (todos) | ✅ (só os seus/atribuídos) | ❌ |
| Solicitar inscrição em curso | ❌ | ❌ | ✅ |
| Assistir aulas (após aprovação) | ❌ | ❌ | ✅ |
| Receber certificado | ❌ | ❌ | ✅ |

---

## Fluxo de Matrícula com Turmas

```
Aluno
  └─ Acessa curso → clica "Solicitar Inscrição"
       └─ Enrollment criado com status = pending

Admin
  └─ Dashboard exibe alerta de solicitações pendentes
       └─ Acessa /admin/enrollments
            ├─ Aprova → seleciona turma → status = approved
            └─ Rejeita → registra motivo → status = rejected

Aluno aprovado
  └─ Acessa aulas (desbloqueadas)
  └─ Vê turma atribuída na página do curso
  └─ Progresso calculado por aula concluída
  └─ 100% → certificado gerado automaticamente
```

---

## Estrutura do Projeto

```
app/
├── Http/Controllers/
│   ├── CertificateController.php
│   ├── CourseController.php
│   ├── CourseStudentController.php     ← matrículas diretas pelo admin
│   ├── CourseTeacherController.php     ← atribuição de professores
│   ├── DashboardController.php
│   ├── EnrollmentAdminController.php   ← aprovar/rejeitar solicitações
│   ├── EnrollmentController.php        ← solicitação de inscrição (student)
│   ├── LessonController.php
│   ├── LessonProgressController.php
│   └── TurmaController.php             ← CRUD de turmas por curso
├── Models/
│   ├── Certificate.php
│   ├── Course.php
│   ├── Enrollment.php                  ← status: pending|approved|rejected
│   ├── Lesson.php
│   ├── LessonProgress.php
│   ├── Turma.php
│   └── User.php
├── Policies/
│   └── CoursePolicy.php
└── Services/
    ├── CertificateService.php
    └── ProgressService.php

resources/js/Pages/
├── Admin/
│   └── Enrollments.jsx                 ← solicitações pendentes (admin)
├── Certificates/Index.jsx
├── Courses/
│   ├── Create.jsx
│   ├── Edit.jsx
│   ├── Index.jsx
│   ├── Show.jsx                        ← status da matrícula + turma atribuída
│   ├── Students.jsx                    ← alunos aprovados com turma e progresso
│   └── Teachers.jsx
├── Turmas/
│   └── Index.jsx                       ← painel de turmas + desempenho por aluno
├── Dashboard.jsx
└── Welcome.jsx
```

---

## Banco de Dados

```
users           (id, name, email, password, role, deleted_at)
courses         (id, user_id, title, slug, description, thumbnail, workload, status, deleted_at)
lessons         (id, course_id, title, slug, content, video_url, position, deleted_at)
turmas          (id, course_id, name, description, status, max_students, deleted_at)
enrollments     (id, user_id, course_id, turma_id, status, notes, created_at, deleted_at)
course_teacher  (course_id, user_id, assigned_at)
lesson_progress (id, user_id, lesson_id, completed, completed_at)
certificates    (id, user_id, course_id, code, issued_at, pdf_path)
```

`enrollments.status` → `pending` | `approved` | `rejected`

---

## Rotas Principais

```
GET  /                                   Welcome
GET  /dashboard                          Dashboard por papel

# Cursos
GET  /courses                            Listagem
POST /courses                            Criar
GET  /courses/{slug}                     Detalhe + status da matrícula
PUT  /courses/{slug}                     Atualizar
DEL  /courses/{slug}                     Soft delete

# Turmas
GET  /courses/{slug}/turmas              Gerenciar turmas + desempenho dos alunos
POST /courses/{slug}/turmas              Criar turma
PUT  /courses/{slug}/turmas/{id}         Atualizar turma
DEL  /courses/{slug}/turmas/{id}         Soft delete

# Alunos
GET  /courses/{slug}/students            Lista alunos aprovados (com turma)
POST /courses/{slug}/students            Matricular aluno diretamente (admin)
DEL  /courses/{slug}/students/{id}       Remover aluno

# Matrículas
POST /courses/{slug}/enroll              Solicitar inscrição (student)
GET  /admin/enrollments                  Solicitações pendentes (admin)
POST /admin/enrollments/{id}/approve     Aprovar + atribuir turma
POST /admin/enrollments/{id}/reject      Rejeitar com motivo

# Professores
GET  /courses/{slug}/teachers            Gerenciar professores
PUT  /courses/{slug}/teachers            Atualizar lista

# Aulas
POST /courses/{slug}/lessons             Criar aula
PUT  /courses/{slug}/lessons/{id}        Editar aula
DEL  /courses/{slug}/lessons/{id}        Soft delete
POST /lessons/{id}/complete              Marcar concluída

# Certificados
GET  /certificates                       Meus certificados
GET  /certificates/{id}/download         Download PDF
```

---

## Instalação

### Pré-requisitos

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL / MariaDB

### Passo a passo

```bash
# 1. Instalar dependências PHP
composer install

# 2. Instalar dependências Node
npm install

# 3. Configurar ambiente
cp .env.example .env
php artisan key:generate

# 4. Configurar banco de dados no .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mini_ead
DB_USERNAME=root
DB_PASSWORD=

# 5. Criar banco e rodar migrations + seeders
php artisan migrate --seed

# 6. Criar link de storage (thumbnails e certificados)
php artisan storage:link

# 7. Build dos assets
npm run build
```

---

## Executando

```bash
# Servidor Laravel
php artisan serve
# Acesse: http://localhost:8000

# Assets em modo desenvolvimento (hot reload)
npm run dev
```

---

## Usuários de Teste

| E-mail | Senha | Papel |
|--------|-------|-------|
| admin@miniead.com | password | Admin |
| professor@miniead.com | password | Professor |
| joao@miniead.com | password | Aluno |
| maria@miniead.com | password | Aluna |

---

## Diferenciais Técnicos

- **Service Layer** — `ProgressService` e `CertificateService` isolam a regra de negócio
- **Policies & Gates** — controle de acesso granular por papel (3 papéis)
- **Soft Delete** — cursos, aulas, usuários e matrículas nunca são destruídos fisicamente
- **Turmas** — organização dos alunos por turma dentro de cada curso
- **Fluxo de aprovação** — solicitação → revisão → aprovação com atribuição de turma
- **Relacionamentos N:N** — alunos ↔ cursos e professores ↔ cursos
- **Dashboard por papel** — cada papel vê métricas relevantes ao seu contexto
- **Certificados PDF** — gerados com DomPDF ao atingir 100% de progresso
- **React + Inertia.js** — SPA com roteamento server-side sem separação de API

---

## Licença

Projeto open-source para fins de portfólio e estudo.
