import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IProjectsRepository from '../repositories/IProjectsRepository';

import Project from '../infra/typeorm/entities/Project';

interface IRequest {
  client_id: string;
  code: string;
  description: string;
  hour_plc: number;
  hour_ihm: number;
  is_blocked: number;
  order_code: string;
  order_value: number;
  status: number;
  value_third_party: number;
  value_material: number;
  value_travel: number;
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({
    client_id,
    code,
    description,
    hour_plc,
    hour_ihm,
    is_blocked,
    order_code,
    order_value,
    status,
    value_third_party,
    value_material,
    value_travel,
  }: IRequest): Promise<Project> {
    const checkProjectExists = await this.projectsRepository.findByCode(code);

    if (checkProjectExists) {
      throw new AppError('Project already exist.', 401);
    }

    const project = await this.projectsRepository.create({
      client_id,
      code,
      description,
      hour_plc,
      hour_ihm,
      is_blocked,
      order_code,
      order_value,
      status,
      value_third_party,
      value_material,
      value_travel,
    });

    return project;
  }
}

export default CreateProjectService;
