import { prisma } from '@/core/libs/prisma';

const driverData = [
  {
    DataID: '2DDA0659A5C4BE4FADD40FE05B121DCC',
    DriverID: 'Dri002',
    DriverName: 'Driver2',
    Address1: '',
    Address2: '',
    FlagCancel: 'N',
  },
  {
    DataID: '5D5893353F9D2045B372A438E2DE38C2',
    DriverID: 'Dri003',
    DriverName: 'Driver3',
    Address1: '3/5',
    Address2: '3/6',
    FlagCancel: 'N',
  },
  {
    DataID: 'CECE2EE678D47644AAEAFB229C9DB745',
    DriverID: 'Dri004',
    DriverName: 'Driver4',
    Address1: '',
    Address2: '',
    FlagCancel: 'N',
  },
  {
    DataID: 'D26870B4EA00634B9F337458AFA09C41',
    DriverID: 'Dri001',
    DriverName: 'Driver1',
    Address1: '3/1',
    Address2: '3/2',
    FlagCancel: 'N',
  },
];

const Seed_Driver = () =>
  prisma.$transaction(
    driverData.map((row) => {
      const { DataID, ...rest } = row;
      return prisma.driver.upsert({
        where: { DataID },
        update: rest,
        create: row,
      });
    })
  );

export { Seed_Driver };
