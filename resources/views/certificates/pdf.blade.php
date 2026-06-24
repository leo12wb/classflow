<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Certificado - {{ $certificate->certificate_code }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            background: #fff;
            width: 297mm;
            height: 210mm;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .certificate {
            width: 100%;
            height: 100%;
            border: 12px solid #1e40af;
            padding: 40px 60px;
            text-align: center;
            position: relative;
            background: linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #eff6ff 100%);
        }

        .certificate::before {
            content: '';
            position: absolute;
            top: 20px; left: 20px; right: 20px; bottom: 20px;
            border: 3px solid #93c5fd;
        }

        .header {
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 42px;
            color: #1e40af;
            letter-spacing: 8px;
            text-transform: uppercase;
            font-weight: bold;
        }

        .header .subtitle {
            font-size: 14px;
            color: #6b7280;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-top: 6px;
        }

        .divider {
            width: 100px;
            height: 3px;
            background: #1e40af;
            margin: 20px auto;
        }

        .body-text {
            font-size: 16px;
            color: #374151;
            margin-bottom: 15px;
        }

        .student-name {
            font-size: 38px;
            color: #1e3a8a;
            font-weight: bold;
            margin: 15px 0;
            border-bottom: 2px solid #93c5fd;
            padding-bottom: 10px;
            display: inline-block;
        }

        .course-name {
            font-size: 24px;
            color: #1e40af;
            font-weight: bold;
            margin: 15px 0;
        }

        .details {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .detail-item {
            text-align: center;
        }

        .detail-label {
            font-size: 11px;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .detail-value {
            font-size: 14px;
            color: #374151;
            font-weight: bold;
            margin-top: 4px;
        }

        .workload {
            font-size: 15px;
            color: #6b7280;
            margin-top: 8px;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="header">
            <h1>Certificado</h1>
            <p class="subtitle">de Conclusão</p>
        </div>

        <div class="divider"></div>

        <p class="body-text">Certificamos que</p>

        <div class="student-name">{{ $certificate->user->name }}</div>

        <p class="body-text" style="margin-top: 15px;">concluiu com sucesso o curso</p>

        <div class="course-name">{{ $certificate->course->title }}</div>

        <p class="workload">Carga horária: {{ $certificate->course->workload }} horas</p>

        <div class="details">
            <div class="detail-item">
                <div class="detail-label">Código do Certificado</div>
                <div class="detail-value">{{ $certificate->certificate_code }}</div>
            </div>

            <div class="detail-item">
                <div class="detail-label">Plataforma</div>
                <div class="detail-value">Mini-EAD</div>
            </div>

            <div class="detail-item">
                <div class="detail-label">Data de Emissão</div>
                <div class="detail-value">{{ $certificate->issued_at?->format('d/m/Y') }}</div>
            </div>
        </div>
    </div>
</body>
</html>
