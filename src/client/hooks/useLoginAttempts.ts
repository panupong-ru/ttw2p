import { useState, useEffect } from 'react';
//perfectionist.dev/rules/sort-named-imports

// Constants
export const MAX_LOGIN_ATTEMPTS = 3;
export const LOCK_DURATION_MINUTES = 15;

export type LoginCallback = {
  onError: (error: Error) => void;
  onSuccess: (data: unknown) => void;
};

// Hook จัดการการล็อกอินผิดพลาด
export function useLoginAttempts() {
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [unlockTime, setUnlockTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  // ดึงค่าจำนวนครั้งที่ล็อกอินผิดและเวลาล็อคจาก localStorage เมื่อโหลดคอมโพเนนต์
  useEffect(() => {
    // ตรวจสอบวันที่ปัจจุบันกับวันที่บันทึกไว้ ถ้าต่างกันให้รีเซ็ต
    const currentDate = new Date().toDateString();
    const storedDate = localStorage.getItem('loginAttemptsDate');

    if (!storedDate || storedDate !== currentDate) {
      // รีเซ็ตเมื่อวันที่เปลี่ยน (รีเซ็ตที่เที่ยงคืน)
      resetAttempts();
      localStorage.setItem('loginAttemptsDate', currentDate);
      return;
    }

    const storedAttempts = localStorage.getItem('loginAttempts');
    const storedLockTime = localStorage.getItem('accountLockTime');

    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts, 10));
    }

    if (storedLockTime) {
      const lockTime = parseInt(storedLockTime, 10);
      const now = Date.now();

      if (lockTime > now) {
        setIsLocked(true);
        const unlockDateTime = new Date(lockTime);
        setUnlockTime(unlockDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        // ตั้งเวลาปลดล็อค
        const timeoutId = setTimeout(() => {
          resetAttempts();
        }, lockTime - now);

        return () => clearTimeout(timeoutId);
      } else {
        // เวลาล็อคหมดแล้ว ให้รีเซ็ต
        resetAttempts();
      }
    }
  }, []);

  // เพิ่มจำนวนครั้งที่ล็อกอินผิด
  const incrementAttempt = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    localStorage.setItem('loginAttempts', newAttempts.toString());

    // บันทึกวันที่ปัจจุบัน
    const currentDate = new Date().toDateString();
    localStorage.setItem('loginAttemptsDate', currentDate);

    // เช็คว่าเกินจำนวนครั้งที่กำหนดหรือไม่
    if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
      lockAccount();
    }

    return newAttempts;
  };

  // รีเซ็ตจำนวนครั้งที่ล็อกอินผิด
  const resetAttempts = () => {
    setIsLocked(false);
    setLoginAttempts(0);
    localStorage.removeItem('loginAttempts');
    localStorage.removeItem('accountLockTime');
  };

  // ล็อคบัญชี
  const lockAccount = () => {
    const lockTime = Date.now() + LOCK_DURATION_MINUTES * 60 * 1000;
    localStorage.setItem('accountLockTime', lockTime.toString());

    const unlockDateTime = new Date(lockTime);
    setUnlockTime(unlockDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setIsLocked(true);

    // ตั้งเวลาปลดล็อค
    setTimeout(resetAttempts, LOCK_DURATION_MINUTES * 60 * 1000);
  };

  return {
    loginAttempts,
    isLocked,
    unlockTime,
    error,
    setError,
    incrementAttempt,
    resetAttempts,
    lockAccount,
  };
}
