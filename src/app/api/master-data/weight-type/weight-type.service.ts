import { prisma } from '@/core/libs/prisma';
import type { WeightType } from '@/../prisma-client';
import { unlink } from 'fs/promises';
import { join } from 'path';

export class WeightTypeService {
  private readonly fileFields = [
    'FileRegisterTicketIn',
    'FileRegisterTicketOut',
    'FileAutoRegisterTicketIn',
    'FileAutoRegisterTicketOut',
    'FileTicketIn',
    'FileTicketOut',
    'FileAutoTicketIn',
    'FileAutoTicketOut',
    'FileTicketRFIDTag',
  ] as const;

  // แปลง path จาก DB เป็น absolute path ในระบบไฟล์
  private getAbsoluteFilePath(relativePath: string | null): string {
    if (!relativePath) return '';
    // ตัด /uploads/ ออกเพื่อให้ได้ path ที่ถูกต้อง
    const cleanPath = relativePath.replace(/^\/uploads\//, '');
    return join(process.cwd(), 'public', 'uploads', cleanPath);
  }

  // ลบไฟล์เก่าถ้ามีการอัพเดท
  private async deleteOldFiles(oldData: WeightType | null, newData: Partial<WeightType>) {
    if (!oldData) return;

    for (const field of this.fileFields) {
      const oldPath = oldData[field];
      const newPath = newData[field];

      // ถ้ามีไฟล์เก่าและมีการเปลี่ยนแปลง path หรือลบไฟล์
      if (oldPath && oldPath !== newPath) {
        try {
          const absolutePath = this.getAbsoluteFilePath(oldPath);
          await unlink(absolutePath);
        } catch (error) {
          console.error(`Failed to delete file ${oldPath}:`, error);
        }
      }
    }
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: WeightType[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.weightType.findMany({
        skip,
        take: pageSize,
        orderBy: {
          WeightTypeID: 'asc',
        },
      }),
      prisma.weightType.count(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<WeightType | null> {
    return prisma.weightType.findUnique({
      where: { DataID: id },
    });
  }

  async create(data: Omit<WeightType, 'DataID'>): Promise<WeightType> {
    return prisma.weightType.create({
      data: {
        DataID: data.WeightTypeID || crypto.randomUUID(),
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<WeightType>): Promise<WeightType> {
    // ดึงข้อมูลเก่าก่อนอัพเดท
    const oldData = await this.findById(id);

    // ลบไฟล์เก่าถ้ามีการอัพเดทไฟล์
    await this.deleteOldFiles(oldData, data);

    return prisma.weightType.update({
      where: { DataID: id },
      data,
    });
  }

  async delete(id: string): Promise<WeightType> {
    // ดึงข้อมูลก่อนลบ
    const weightType = await this.findById(id);
    if (!weightType) {
      throw new Error('Weight type not found');
    }

    // ลบไฟล์ทั้งหมดที่เกี่ยวข้อง
    await this.deleteOldFiles(weightType, {});

    return prisma.weightType.delete({
      where: { DataID: id },
    });
  }
}
