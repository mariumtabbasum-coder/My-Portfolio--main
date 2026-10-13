import { Router } from 'express';
import mongoose from 'mongoose';
import Settings from '../models/Settings';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Certificate from '../models/Certificate';
import Service from '../models/Service';
import Milestone from '../models/Milestone';
import { dataStore } from '../utils/dataStore';

const router = Router();

// HTTP Cache Headers for Vercel Edge CDN:
// - max-age=0: Client browser always revalidates with CDN, avoiding stale local disk cache
// - s-maxage=5: Vercel CDN caches edge response for 5 seconds
// - stale-while-revalidate=30: Serves instant edge response for up to 30s while revalidating in background
export const setPublicCacheHeaders = (res: any) => {
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=5, stale-while-revalidate=30');
};

router.get(['/', '/bootstrap'], async (req, res) => {
  setPublicCacheHeaders(res);
  try {
    if (mongoose.connection?.readyState === 1) {
      // Execute all public portfolio queries in parallel in ONE single database round-trip
      const [dbSettings, dbProjects, dbSkills, dbServices, dbMilestones, dbCerts] = await Promise.all([
        (Settings as any).findOne().lean().exec().catch(() => null),
        (Project as any).find().sort({ createdAt: -1 }).lean().exec().catch(() => null),
        (Skill as any).find().sort({ order: 1, name: 1 }).lean().exec().catch(() => null),
        (Service as any).find().sort({ order: 1, title: 1 }).lean().exec().catch(() => null),
        (Milestone as any).find().sort({ year: -1, order: 1 }).lean().exec().catch(() => null),
        (Certificate as any).find().sort({ issueDate: -1, order: 1 }).lean().exec().catch(() => null),
      ]);

      const settings = dbSettings ? { ...dataStore.getSettings(), ...dbSettings } : dataStore.getSettings();

      const projects = dbProjects && dbProjects.length > 0
        ? dbProjects.map((p: any) => ({ ...p, id: p.id || p._id?.toString() }))
        : dataStore.getProjects();

      const skills = dbSkills && dbSkills.length > 0
        ? dbSkills.map((s: any) => ({ ...s, id: s.id || s._id?.toString() }))
        : dataStore.getSkills();

      const services = dbServices && dbServices.length > 0
        ? dbServices.map((s: any) => ({ ...s, id: s.id || s._id?.toString() }))
        : dataStore.getServices();

      const learning = dbMilestones && dbMilestones.length > 0
        ? dbMilestones.map((m: any) => ({ ...m, id: m.id || m._id?.toString() }))
        : dataStore.getMilestones();

      const certificates = dbCerts && dbCerts.length > 0
        ? dbCerts.map((c: any) => ({ ...c, id: c.id || c._id?.toString() }))
        : dataStore.getCertificates();

      return res.json({
        success: true,
        data: {
          settings,
          projects,
          skills,
          services,
          learning,
          certificates,
        }
      });
    }

    // In-memory fallback
    return res.json({
      success: true,
      data: {
        settings: dataStore.getSettings(),
        projects: dataStore.getProjects(),
        skills: dataStore.getSkills(),
        services: dataStore.getServices(),
        learning: dataStore.getMilestones(),
        certificates: dataStore.getCertificates(),
      }
    });
  } catch (err) {
    return res.json({
      success: true,
      data: {
        settings: dataStore.getSettings(),
        projects: dataStore.getProjects(),
        skills: dataStore.getSkills(),
        services: dataStore.getServices(),
        learning: dataStore.getMilestones(),
        certificates: dataStore.getCertificates(),
      }
    });
  }
});

export default router;
