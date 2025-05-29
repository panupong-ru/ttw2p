import type { ConfigLocal } from '@/../prisma-client';
import { prisma } from '@/core/libs/prisma';

const data: ConfigLocal[] = [
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'DocOutPrinterName',
    ConfigValue: 'Microsoft Print to PDF',
    HWID: null,
    DataHash: null,
  },
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'DocPrintOut',
    ConfigValue: '2',
    HWID: null,
    DataHash: null,
  },
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'FormatDisplayDate',
    ConfigValue: 'dd/MM/yyyy',
    HWID: null,
    DataHash: null,
  },
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'FormatDisplayTime',
    ConfigValue: 'HH:mm:ss',
    HWID: null,
    DataHash: null,
  },
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'ReportFileDir',
    ConfigValue: null,
    HWID: null,
    DataHash: null,
  },
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'ReportPrinterName',
    ConfigValue: 'Microsoft Print to PDF',
    HWID: null,
    DataHash: null,
  },
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'WeightPrintTicketIn',
    ConfigValue: '2',
    HWID: null,
    DataHash: null,
  },
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'WeightPrintTicketOut',
    ConfigValue: '2',
    HWID: null,
    DataHash: null,
  },
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'WeightTicketInPrinterName',
    ConfigValue: 'Microsoft Print to PDF',
    HWID: null,
    DataHash: null,
  },
  {
    DataID: null,
    DataCenter: null,
    ConfigName: 'WeightTicketOutPrinterName',
    ConfigValue: 'Microsoft Print to PDF',
    HWID: null,
    DataHash: null,
  },
];

const Seed_ConfigLocal = () =>
  prisma.$transaction(
    data.map((row) => {
      const { ConfigName, ...rest } = row;
      return prisma.configLocal.upsert({
        where: { ConfigName },
        update: rest,
        create: row,
      });
    })
  );

export { Seed_ConfigLocal };
