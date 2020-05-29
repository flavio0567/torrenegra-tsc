import { uuid } from 'uuidv4';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';

class FakeProjectsRepository implements IProjectsRepository {
  private projects: Project[] = [];

  public async findAllProjects(): Promise<Project[] | undefined> {
    const { projects } = this;

    return projects || undefined;
  }

  public async findByCode(code: string): Promise<Project | undefined> {
    const findProjectByCode = this.projects.find(
      project => project.code === code
    );

    return findProjectByCode;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const findProjectById = this.projects.find(project => project.id === id);

    return findProjectById;
  }

  public async create(projectData: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, { id: uuid() }, projectData);

    this.projects.push(project);

    return project;
  }

  public async delete(project_id: string): Promise<void> {
    const findIndex = this.projects.findIndex(
      project => project.id === project_id
    );

    this.projects.splice(findIndex, 0);
  }

  public async save(project: Project): Promise<Project> {
    const findIndex = this.projects.findIndex(
      saveProject => saveProject.id === project.id
    );

    this.projects[findIndex] = project;

    return project;
  }
}

export default FakeProjectsRepository;
