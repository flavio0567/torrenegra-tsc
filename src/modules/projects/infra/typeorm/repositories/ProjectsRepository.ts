import { getRepository, Repository } from 'typeorm';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import Project from '../entities/Project';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findAllProjects(): Promise<Project[] | undefined> {
    const projects = await this.ormRepository.find();

    return projects || undefined;
  }

  public async findByCode(code: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: { code },
    });

    return project || undefined;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne(id);

    return findProject;
  }

  public async create({
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
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
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

    await this.ormRepository.save(project);

    return project;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }
}

export default ProjectsRepository;
