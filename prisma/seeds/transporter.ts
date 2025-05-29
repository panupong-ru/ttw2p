import { prisma } from '@/core/libs/prisma';

const transporterData = [
  {
    DataID: '0A4C382D2E9F694FB376750525E3CFCD',
    TransporterID: 'Tran006',
    TransporterName: 'Transporter6',
    FlagCancel: 'N',
  },
  {
    DataID: '39B0BE174E626B44A54A0F9E8287D714',
    TransporterID: 'Tran001',
    TransporterName: 'Transporter1',
    Address1: '',
    Address2: '',
    FlagCancel: 'N',
  },
  {
    DataID: '3D6B26DDA5FF90459EB880C02EEBE8B4',
    TransporterID: 'Tran002',
    TransporterName: 'Transporter2',
    FlagCancel: 'N',
  },
  {
    DataID: '458A38D77592AD46B30F2017F60DBBF9',
    TransporterID: 'Tran005',
    TransporterName: 'Transporter5',
    FlagCancel: 'N',
  },
  {
    DataID: '7A189C020C1B5842A2BC4FAC7CD5C231',
    TransporterID: 'Tran004',
    TransporterName: 'Transporter4',
    Address1: '',
    Address2: '',
    FlagCancel: 'N',
  },
  {
    DataID: 'CCAB8340FA15984C92696025F3498477',
    TransporterID: 'Tran003',
    TransporterName: 'Transporter3',
    Address1: '',
    Address2: '',
    FlagCancel: 'N',
  },
];

const Seed_Transporter = () =>
  prisma.$transaction(
    transporterData.map((row) => {
      const { DataID, ...rest } = row;
      return prisma.transporter.upsert({
        where: { DataID },
        update: rest,
        create: row,
      });
    })
  );

export { Seed_Transporter };
