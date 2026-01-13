import type { Request, Response, NextFunction, RequestHandler } from 'express';
import Blurb from './models';

interface BlurbController {
  createBlurb: RequestHandler;
  getBlurb: RequestHandler;
  updateBlurb: RequestHandler;
  deleteBlurb: RequestHandler;
}

const BlurbController: BlurbController = {
  async createBlurb(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const { title, text } = req.body;

      if (!title || !text) {
        return next({
          log: 'Missing content details.',
          status: 500,
          message: { err: 'Missing content details.' },
        });
      }

      const newBlurb = await Blurb.create({ title, text });
      res.locals.newBlurb = newBlurb;
      return next();
    } catch (error) {
      return next({
        log: `BlurbController.createBlurb: ${error}`,
        status: 500,
        message: {
          err: 'BlurbController.createBlurb: Missing details to create new blurb. Check logs.',
        },
      });
    }
  },

  async getBlurb(_req: Request, res: Response, next: NextFunction) {
    try {
      // const blurbs = await Blurb.find({}).lean().exec();
      const blurbs = await Blurb.find({});

      if (!blurbs) {
        return next({
          log: 'No present blurbs to display.',
          status: 500,
          message: { err: 'No present blurbs to display.' },
        });
      }

      res.locals.blurbs = blurbs;
      return next();
    } catch (error) {
      return next({
        log: `BlurbController.getBlurb: ${error}`,
        status: 500,
        message: {
          err: 'BlurbController.getBlurb: (ERROR) Failure to fetch blurbs. Check logs.',
        },
      });
    }
  },

  async updateBlurb() {},

  async deleteBlurb() {},
};

export default BlurbController;
