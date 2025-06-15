# 创建lib目录（如果不存在）
New-Item -ItemType Directory -Force -Path "lib"

# 下载Bootstrap CSS
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" -OutFile "lib/bootstrap.min.css"

# 下载Bootstrap JS
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" -OutFile "lib/bootstrap.bundle.min.js"

# 下载Font Awesome CSS
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" -OutFile "lib/fontawesome.min.css"

Write-Host "所有文件下载完成！" 