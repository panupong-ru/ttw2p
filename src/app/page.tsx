import { redirect } from 'next/navigation';
import { ROUTE } from '@/core/constants/route';

export default function Home() {
  // ทำการ redirect ไปที่หน้า dashboard
  redirect(ROUTE.HOME);
}
