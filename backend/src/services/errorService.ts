
import { DataSource, Repository } from 'typeorm';
import { dataSource } from '../datasource';
import { ErrorEvent } from '../entities/ErrorEvent';

export class ErrorService {
  private errorRepository: Repository<ErrorEvent>;

  constructor(private dataSource: DataSource) {
    this.errorRepository = this.dataSource.getRepository(ErrorEvent);
  }

  async storeError(errorData: Omit<ErrorEvent, 'id'>): Promise<string> {
    const error = this.errorRepository.create(errorData);
    await this.errorRepository.save(error);
    return error.id;
  }

  async getError(id: string): Promise<ErrorEvent | null> {
    return this.errorRepository.findOneBy({
      id,
    });
  }

  async getErrors(
    page: number = 1,
    limit: number = 10,
    projectId?: string,
    environment?: string,
    severity?: string
  ): Promise<[ErrorEvent[], number]> {
    const query = this.errorRepository.createQueryBuilder('error');

    if (projectId) {
      query.andWhere('error.projectId = :projectId', { projectId });
    }
    if (environment) {
      query.andWhere('error.environment = :environment', { environment });
    }
    if (severity) {
      query.andWhere('error.severity = :severity', { severity });
    }

    query.orderBy('error.timestamp', 'DESC');
    query.skip((page - 1) * limit);
    query.take(limit);

    return query.getManyAndCount();
  }

  async getErrorStats(projectId: string, days: number = 7): Promise<any> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const stats = await this.errorRepository
      .createQueryBuilder('error')
      .select('error.severity', 'severity')
      .addSelect('COUNT(*)', 'count')
      .where('error.projectId = :projectId', { projectId })
      .andWhere('error.timestamp >= :startDate', { startDate })
      .groupBy('error.severity')
      .getRawMany();

    return stats;
  }
}

export const errorService = new ErrorService(dataSource);