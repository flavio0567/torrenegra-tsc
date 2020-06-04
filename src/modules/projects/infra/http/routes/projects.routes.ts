import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();
const projectsController = new ProjectsController();

// projectsRouter.use(ensureAuthenticated);

projectsRouter.get('/', async (req, res) => {
  const projectsRepository = new ProjectsRepository();
  const projects = await projectsRepository.findAllProjects();

  return res.json(projects);
});

projectsRouter.get('/:project_id', async (req, res) => {
  const { id } = req.params;

  const projectsRepository = new ProjectsRepository();
  const projects = await projectsRepository.findById(id);

  return res.json(projects);
});

projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string().required(),
      code: Joi.string().required(),
      description: Joi.string().required(),
      hour_plc: Joi.number().required(),
      hour_ihm: Joi.number(),
      is_blocked: Joi.number(),
      order_code: Joi.string().required(),
      order_value: Joi.number(),
      status: Joi.number().required(),
      value_third_party: Joi.number(),
      value_material: Joi.number(),
      value_travel: Joi.number(),
    },
  }),
  projectsController.create
);

export default projectsRouter;
