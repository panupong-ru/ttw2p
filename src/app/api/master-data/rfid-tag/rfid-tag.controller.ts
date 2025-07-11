import { RFIDTagService } from './rfid-tag.service';
import type { RFIDTag } from '@/../prisma-client';

type PaginatedResponse = {
  data: any[];
  total: number;
};

export class RFIDTagController {
  private service: RFIDTagService;
  constructor() {
    this.service = new RFIDTagService();
  }
  async getAll(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.findAll(adjustedPage, pageSize);
  }

  async getById(id: string): Promise<any | null> {
    return this.service.findById(id);
  }

  async create(data: any): Promise<RFIDTag> {
    // Convert string values to appropriate types
    const processedData = this.processRFIDTagData(data);
    return this.service.create(processedData);
  }

  async update(id: string, data: any): Promise<RFIDTag> {
    // Convert string values to appropriate types
    const processedData = this.processRFIDTagData(data);
    return this.service.update(id, processedData);
  }

  async delete(id: string): Promise<RFIDTag> {
    return this.service.delete(id);
  }

  // Helper method to process RFID Tag data
  private processRFIDTagData(data: any) {
    const processed: any = {};

    // Handle string fields
    const stringFields = [
      'RFIDTagID',
      'RFIDTagSerialNo',
      'CarRegister',
      'CarRegister2',
      'WeightTypeDataID',
      'CustomerDataID',
      'ProductDataID',
      'TransporterDataID',
      'DriverDataID',
      'SequenceWeightIn',
      'SequenceWeightOut',
      'UserLogInDataIDIn',
      'UserLogInDataIDOut',
      'ProductUnitDataID',
      'Remark1',
      'Remark2',
      'Remark3',
      'Remark4',
    ];

    // Handle number fields (Float)
    const numberFields = [
      'WeightIn',
      'WeightOut',
      'Weight',
      'WeightAdjust',
      'AdjustPercent',
      'AdjustPercentWeight',
      'WeightAdjKey1',
      'WeightAdjCal1',
      'WeightAdjKey2',
      'WeightAdjCal2',
      'WeightAdjKey3',
      'WeightAdjCal3',
      'WeightNet',
      'KgToUnit',
      'Price',
      'Tax',
      'Amount',
      'AmountAdjKey1',
      'AmountAdjCal1',
      'AmountAdjKey2',
      'AmountAdjCal2',
      'AmountAdjKey3',
      'AmountAdjCal3',
      'AmountNet',
    ];

    // Handle integer fields
    const integerFields = ['TicketPrintCountIn', 'TicketPrintCountOut'];

    // Handle date fields
    const dateFields = ['WeightDateIn', 'WeightTimeIn', 'WeightDateOut', 'WeightTimeOut'];

    // Process string fields
    stringFields.forEach((field) => {
      if (data[field] !== undefined) {
        processed[field] = data[field] === '' ? null : String(data[field]);
      }
    });

    // Process number fields
    numberFields.forEach((field) => {
      if (data[field] !== undefined && data[field] !== '' && data[field] !== null) {
        const value = parseFloat(data[field]);
        processed[field] = isNaN(value) ? null : value;
      }
    });

    // Process integer fields
    integerFields.forEach((field) => {
      if (data[field] !== undefined && data[field] !== '' && data[field] !== null) {
        const value = parseInt(data[field]);
        processed[field] = isNaN(value) ? null : value;
      }
    });

    // Process date fields
    dateFields.forEach((field) => {
      if (data[field] !== undefined && data[field] !== '' && data[field] !== null) {
        try {
          processed[field] = new Date(data[field]);
        } catch {
          processed[field] = null;
        }
      }
    });

    return processed;
  }
}

export const controller = new RFIDTagController();
