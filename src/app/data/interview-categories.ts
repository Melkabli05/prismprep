import { rhCategory } from './data-rh';
import { methodologyCategory } from './data-methodology';
import { gitCategory } from './data-git';
import { oopCategory } from './data-oop';
import { designPatternsCategory } from './data-design-patterns';
import { architectureCategory } from './data-architecture';
import { javaCategory } from './data-java';
import { springCategory } from './data-spring';
import { angularCategory } from './data-angular';
import { databaseCategory } from './data-database';
import { sqlCategory } from './data-sql';
import { microservicesCategory } from './data-microservices';
import { devopsCategory } from './data-devops';
import { securityCategory } from './data-security';
import { performanceCategory } from './data-performance';
import { restApiCategory } from './data-rest-api';
import { cloudCategory } from './data-cloud';
import { linuxCategory } from './data-linux';
import { systemDesignCategory } from './data-system-design';
import { behavioralCategory } from './data-behavioral';
import { aiCategory } from './data-ai';

export const interviewCategories = [
  rhCategory, methodologyCategory, gitCategory, oopCategory, designPatternsCategory,
  architectureCategory, javaCategory, springCategory, angularCategory, databaseCategory,
  sqlCategory, microservicesCategory, devopsCategory, securityCategory, performanceCategory,
  restApiCategory, cloudCategory, linuxCategory, systemDesignCategory, behavioralCategory, aiCategory,
];

export type { InterviewCategory, InterviewSection, InterviewQuestion } from '../models/interview.models';