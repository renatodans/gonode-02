const { Section, Project } = require('../models');

module.exports = {
  async new(req, res, next) {
    try {
      const { projectId } = req.params;

      const project = await Project.findOne({
        where: {
          UserId: req.session.user.id,
          id: projectId,
        },
      });

      if (project === null) {
        const denied = new Error('Acesso negado');
        throw denied;
      }

      res.render('sections/new', {
        project,
        user: req.session.user,
      });
    } catch (err) {
      next(err);
    }
  },

  async store(req, res, next) {
    try {
      const section = await Section.create(req.body);

      req.flash('success', 'Seção criada com sucesso.');

      res.redirect(`/app/projects/${req.body.ProjectId}/section/${section.id}`);
    } catch (err) {
      next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      await Section.destroy({ where: { id } });

      req.flash('success', 'Seção removida com sucesso.');
      res.redirect(`/app/projects/${req.body.ProjectId}`);
    } catch (err) {
      next(err);
    }
  },
};
