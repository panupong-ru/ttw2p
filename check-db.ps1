# Script สำหรับตรวจสอบและแก้ไข database (Windows PowerShell)

Write-Host "🔍 ตรวจสอบ Database..." -ForegroundColor Cyan

# ตรวจสอบว่า database มี user หรือยัง
Write-Host "📋 ตรวจสอบ users ใน database..." -ForegroundColor Yellow
$result = docker-compose exec -T mysql mysql -u ttw2p_user -pttw2p_password ttw2p -e "SELECT COUNT(*) as count FROM userLogIn;" 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ไม่สามารถเชื่อมต่อ database ได้" -ForegroundColor Red
    Write-Host "💡 ลองตรวจสอบว่า containers ทำงานอยู่: docker-compose ps" -ForegroundColor Yellow
    exit 1
}

# ดึงจำนวน users
$userCount = ($result | Select-String -Pattern '\d+' | ForEach-Object { $_.Matches.Value } | Select-Object -First 1)

if ([string]::IsNullOrWhiteSpace($userCount) -or [int]$userCount -eq 0) {
    Write-Host "⚠️  ไม่พบ users ใน database" -ForegroundColor Yellow
    Write-Host "🌱 กำลัง seed database..." -ForegroundColor Green
    docker-compose exec app npx prisma db seed
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Seed เสร็จสิ้น" -ForegroundColor Green
    } else {
        Write-Host "❌ Seed ล้มเหลว" -ForegroundColor Red
    }
} else {
    Write-Host "✅ พบ $userCount users ใน database" -ForegroundColor Green
    
    # แสดงรายชื่อ users
    Write-Host "`n📝 Users ที่มีในระบบ:" -ForegroundColor Cyan
    docker-compose exec -T mysql mysql -u ttw2p_user -pttw2p_password ttw2p -e "SELECT LogInName, FullName FROM userLogIn;" 2>$null
}

Write-Host "`n📝 Default Login Credentials:" -ForegroundColor Cyan
Write-Host "   Username: admin" -ForegroundColor White
Write-Host "   Password: P@`$sW0rd!" -ForegroundColor White
Write-Host "`n🔗 Application: http://localhost:3000" -ForegroundColor Cyan


