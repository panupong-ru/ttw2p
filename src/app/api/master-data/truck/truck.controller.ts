import { TruckService } from './truck.service';
import type { Truck } from '@/../prisma-client';

type PaginatedResponse = {
  data: any[];
  total: number;
};

export class TruckController {
  private service: TruckService;
  constructor() {
    this.service = new TruckService();
  }
  async getAll(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.findAll(adjustedPage, pageSize);
  }

  async getById(id: string): Promise<any | null> {
    return this.service.findById(id);
  }

  async create(data: any): Promise<Truck> {
    // Convert string values to appropriate types
    const processedData = this.processTruckData(data);
    return this.service.create(processedData);
  }

  async update(id: string, data: any): Promise<Truck> {
    // Convert string values to appropriate types
    const processedData = this.processTruckData(data);
    return this.service.update(id, processedData);
  }

  async delete(id: string): Promise<Truck> {
    return this.service.delete(id);
  }

  // Helper method to process Truck data
  private processTruckData(data: any) {
    const processed: any = {};

    // Handle string fields
    const stringFields = [
      'CarRegister',
      'CarRegister2',
      'WeightTypeDataID',
      'CustomerDataID',
      'ProductDataID',
      'TransporterDataID',
      'DriverDataID',
      'Remark1',
      'Remark2',
      'Remark3',
    ];

    // Handle number fields
    const numberFields = [
      'WeightAdjKey1',
      'WeightAdjCal1',
      'WeightAdjKey2',
      'WeightAdjCal2',
      'WeightAdjKey3',
      'WeightAdjCal3',
      'AmountAdjCal1',
      'AmountAdjCal2',
      'AmountAdjCal3',
    ];

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

    // Add default values for auto-generated fields
    processed.WeightDate = new Date();
    processed.WeightTime = new Date();
    if (processed.Weight === undefined || processed.Weight === null) {
      processed.Weight = 0.0;
    }

    return processed;
  }
}

export const controller = new TruckController();
