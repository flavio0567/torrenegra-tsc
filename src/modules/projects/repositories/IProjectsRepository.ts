import Project from '../infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectRepository {
  findAllProjects(): Promise<Project[] | undefined>;
  findByCode(code: string): Promise<Project | undefined>;
  findById(project_id: string): Promise<Project | undefined>;
  create(data: ICreateProjectDTO): Promise<Project>;
  delete(project_id: string): Promise<void>;
  save(user: Project): Promise<Project>;
}
