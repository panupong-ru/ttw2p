import type { UserLogIn } from '@/../prisma-client';
import { prisma } from '@/core/libs/prisma';

const data: UserLogIn[] = [
  {
    DataID: 'admin',
    DataCenter: null,
    LogInName: 'admin',
    LogInPassword: '$2b$10$fJIAny2QdTLL/Ny6rBmfLu.auU/4/muLDmE24IeO8I5tSCdU2UTGu', // P@$sW0rd!
    FullName: 'Administrator',
    Permission: 'admin',
    FlagCancel: 'N',
    HWID: null,
    DataHash: null,
  },
  {
    DataID: 'user',
    DataCenter: null,
    LogInName: 'user',
    LogInPassword: '$2b$10$fJIAny2QdTLL/Ny6rBmfLu.auU/4/muLDmE24IeO8I5tSCdU2UTGu', // P@$sW0rd!
    FullName: 'User',
    Permission: 'user',
    FlagCancel: 'N',
    HWID: null,
    DataHash: null,
  },
];

const Seed_UserLogIn = () =>
  prisma.$transaction(
    data.map((row) => {
      const { DataID, ...rest } = row;
      return prisma.userLogIn.upsert({
        where: { DataID },
        update: rest,
        create: row,
      });
    })
  );

export { Seed_UserLogIn };
