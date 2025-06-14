import { prisma } from '@/core/libs/prisma';

const UserLogIn = [
  {
    DataID: 'USR001',
    DataCenter: 'DC001',
    LogInName: 'admin',
    LogInPassword: '$2b$10$fJIAny2QdTLL/Ny6rBmfLu.auU/4/muLDmE24IeO8I5tSCdU2UTGu', // P@$sW0rd!
    FullName: 'Administrator',
    Permission: 'admin',
    FlagCancel: 'N',
    HWID: 'BFEBFBFF000406E3',
    DataHash: BigInt('1234567890123456789'),
  },
  {
    DataID: 'USR002',
    DataCenter: 'DC001',
    LogInName: 'operator',
    LogInPassword: '$2b$10$fJIAny2QdTLL/Ny6rBmfLu.auU/4/muLDmE24IeO8I5tSCdU2UTGu', // P@$sW0rd!
    FullName: 'Administrator',
    Permission: 'admin',
    FlagCancel: 'N',
    HWID: 'BFEBFBFF000406E3',
    DataHash: BigInt('2345678901234567890'),
  },
  {
    DataID: 'USR003',
    DataCenter: 'DC001',
    LogInName: 'supervisor',
    LogInPassword: '$2b$10$fJIAny2QdTLL/Ny6rBmfLu.auU/4/muLDmE24IeO8I5tSCdU2UTGu', // P@$sW0rd!
    FullName: 'Administrator',
    Permission: 'admin',
    FlagCancel: 'N',
    HWID: 'BFEBFBFF000406E3',
    DataHash: BigInt('3456789012345678901'),
  },
  {
    DataID: 'USR004',
    DataCenter: 'DC001',
    LogInName: 'viewer',
    LogInPassword: 'viewer123',
    FullName: 'Report Viewer',
    Permission: JSON.stringify({
      canManageUsers: false,
      canManageConfig: false,
      canViewReports: true,
      canManageWeight: false,
      canManageCustomers: false,
      canManageProducts: false,
      canManageDrivers: false,
      canManageTransporters: false,
    }),
    FlagCancel: 'N',
    HWID: 'BFEBFBFF000406E3',
    DataHash: BigInt('4567890123456789012'),
  },
  {
    DataID: 'USR005',
    DataCenter: 'DC001',
    LogInName: 'manager',
    LogInPassword: 'manager123',
    FullName: 'System Manager',
    Permission: JSON.stringify({
      canManageUsers: true,
      canManageConfig: true,
      canViewReports: true,
      canManageWeight: true,
      canManageCustomers: true,
      canManageProducts: true,
      canManageDrivers: true,
      canManageTransporters: true,
    }),
    FlagCancel: 'N',
    HWID: 'BFEBFBFF000406E3',
    DataHash: BigInt('5678901234567890123'),
  },
];

const Seed_UserLogIn = () =>
  prisma.$transaction(
    UserLogIn.map((row) => {
      const { DataID, ...rest } = row;
      return prisma.userLogIn.upsert({
        where: { LogInName: row.LogInName },
        update: rest,
        create: row,
      });
    })
  );

export { Seed_UserLogIn };
