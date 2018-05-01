const { Section, Project } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const section = await Section.create(req.body);

      req.flash('success', 'Seção criada com sucesso.');

      res.redirect(`/app/projects/${req.body.CategoryId}/sections/${section.id}`);
    } catch (err) {
      next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { projectId, id } = req.params;

      const projects = await Project.findAll({
        where: { UserId: req.session.user.id },
        include: Section,
      });

      const sections = await Section.findAll({
        where: { ProjectId: projectId },
      });

      const section = await Section.findById(id);

      res.render('sections/show', {
        projectId,
        projects,
        sections,
        currentSection: section,
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const section = await Section.findById(req.params.id);

      await section.update(req.body);

      req.flash('success', 'Seção atualizada com sucesso.');

      res.redirect(`/app/projects/${section.ProjectId}/sections/${section.id}`);
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
