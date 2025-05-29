import { prisma } from '@/core/libs/prisma';
import { Seed_ConfigLocal } from './config-local';
import { Seed_ConfigScale } from './config-scale';
import { Seed_WeightReport } from './weight-report';
import { Seed_UserLogIn } from './user-logIn';
import { Seed_Driver } from './driver';
import { Seed_Customer } from './customer';
import { Seed_Product } from './product';
import { Seed_Transporter } from './transporter';

const main = async () => {
  try {
    await Seed_ConfigLocal();
    await Seed_ConfigScale();
    await Seed_Customer();
    await Seed_Driver();
    await Seed_Product();
    await Seed_Transporter();
    await Seed_UserLogIn();
    await Seed_WeightReport();
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
