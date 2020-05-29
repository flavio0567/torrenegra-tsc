import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProjectService from '@modules/projects/services/CreateProjectService';

export default class ProjectsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
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
    } = req.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
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

    return res.json(project);
  }
}
