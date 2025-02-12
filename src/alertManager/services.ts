import Alert from './models';

export class AlertService {
  async get(id: string, userId: string) {
    return await Alert.findById({ _id: id }, {}, { userId: userId });
  }

  async list(userId?: string) {
    return await Alert.find({ userId });
  }

  async create(userId: string, symbol: string, price: number, type: 'above' | 'below') {
    return await Alert.create({ userId, symbol, price, type });
  }

  async update(id: string, userId: string, price?: number, type?: 'above' | 'below', status?: 'active' | 'inactive') {
    const updates: any = {};
    if (price !== undefined) updates.price = price;
    if (type !== undefined) updates.type = type;
    if (status !== undefined) updates.status = status;
    return await Alert.findOneAndUpdate({ _id: id, userId }, updates, { new: true });
  }

  async delete(id: string, userId: string) {
    return await Alert.findOneAndDelete({ _id: id, userId });
  }
}

export const alertService = new AlertService();
