#!/bin/bash
# Script สำหรับตรวจสอบและแก้ไข database

echo "🔍 ตรวจสอบ Database..."

# ตรวจสอบว่า database มี user หรือยัง
echo "📋 ตรวจสอบ users ใน database..."
docker-compose exec mysql mysql -u ttw2p_user -pttw2p_password ttw2p -e "SELECT LogInName, FullName FROM userLogIn;" 2>/dev/null

if [ $? -ne 0 ]; then
  echo "❌ ไม่สามารถเชื่อมต่อ database ได้"
  echo "💡 ลองตรวจสอบว่า containers ทำงานอยู่: docker-compose ps"
  exit 1
fi

# ตรวจสอบจำนวน users
USER_COUNT=$(docker-compose exec -T mysql mysql -u ttw2p_user -pttw2p_password ttw2p -e "SELECT COUNT(*) FROM userLogIn;" 2>/dev/null | tail -n 1 | tr -d ' ')

if [ "$USER_COUNT" = "0" ] || [ -z "$USER_COUNT" ]; then
  echo "⚠️  ไม่พบ users ใน database"
  echo "🌱 กำลัง seed database..."
  docker-compose exec app npx prisma db seed
  echo "✅ Seed เสร็จสิ้น"
else
  echo "✅ พบ $USER_COUNT users ใน database"
fi

echo ""
echo "📝 Default Login Credentials:"
echo "   Username: admin"
echo "   Password: P@\$sW0rd!"
echo ""
echo "🔗 Application: http://localhost:3000"


