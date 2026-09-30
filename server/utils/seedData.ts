import mongoose from 'mongoose';
import Settings from '../models/Settings';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Certificate from '../models/Certificate';
import Service from '../models/Service';
import Milestone from '../models/Milestone';
import { defaultData } from './dataStore';

export async function seedInitialData() {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('🌱 MongoDB not connected; using local file store.');
      return;
    }

    console.log('🌱 Running automatic database seeding check...');

    // 1. Settings Seeding
    const settingsCount = await (Settings as any).countDocuments();
    if (settingsCount === 0) {
      await (Settings as any).create(defaultData.settings);
      console.log('✅ Seeded default Website Settings.');
    }

    // 2. Projects Seeding
    const projectCount = await (Project as any).countDocuments();
    if (projectCount === 0) {
      await (Project as any).insertMany(defaultData.projects);
      console.log('✅ Seeded default Projects.');
    }

    // 3. Skills Seeding
    const skillCount = await (Skill as any).countDocuments();
    if (skillCount === 0) {
      await (Skill as any).insertMany(defaultData.skills);
      console.log('✅ Seeded default Skills.');
    }

    // 4. Certificates Seeding
    const certCount = await (Certificate as any).countDocuments();
    if (certCount === 0) {
      await (Certificate as any).insertMany(defaultData.certificates);
      console.log('✅ Seeded default Certificates.');
    }

    // 5. Services Seeding
    const serviceCount = await (Service as any).countDocuments();
    if (serviceCount === 0) {
      await (Service as any).insertMany(defaultData.services);
      console.log('✅ Seeded default Services.');
    }

    // 6. Milestones Seeding
    const milestoneCount = await (Milestone as any).countDocuments();
    if (milestoneCount === 0) {
      await (Milestone as any).insertMany(defaultData.milestones);
      console.log('✅ Seeded default Milestones.');
    }

    console.log('✨ Database seeding complete.');
  } catch (err) {
    console.error('Error seeding initial data:', err);
  }
}
