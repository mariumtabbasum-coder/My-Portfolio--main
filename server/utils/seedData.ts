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

    // Run all collection count checks in parallel in a single database round-trip
    const [settingsCount, projectCount, skillCount, certCount, serviceCount, milestoneCount] = await Promise.all([
      (Settings as any).countDocuments(),
      (Project as any).countDocuments(),
      (Skill as any).countDocuments(),
      (Certificate as any).countDocuments(),
      (Service as any).countDocuments(),
      (Milestone as any).countDocuments()
    ]);

    const seedPromises: Promise<any>[] = [];

    if (settingsCount === 0) {
      seedPromises.push((Settings as any).create(defaultData.settings).then(() => console.log('✅ Seeded default Website Settings.')));
    }
    if (projectCount === 0) {
      seedPromises.push((Project as any).insertMany(defaultData.projects).then(() => console.log('✅ Seeded default Projects.')));
    }
    if (skillCount === 0) {
      seedPromises.push((Skill as any).insertMany(defaultData.skills).then(() => console.log('✅ Seeded default Skills.')));
    }
    if (certCount === 0) {
      seedPromises.push((Certificate as any).insertMany(defaultData.certificates).then(() => console.log('✅ Seeded default Certificates.')));
    }
    if (serviceCount === 0) {
      seedPromises.push((Service as any).insertMany(defaultData.services).then(() => console.log('✅ Seeded default Services.')));
    }
    if (milestoneCount === 0) {
      seedPromises.push((Milestone as any).insertMany(defaultData.milestones).then(() => console.log('✅ Seeded default Milestones.')));
    }

    if (seedPromises.length > 0) {
      await Promise.all(seedPromises);
    }

    console.log('✨ Database seeding complete.');
  } catch (err) {
    console.error('Error seeding initial data:', err);
  }
}
