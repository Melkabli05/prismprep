import { rhCategory } from './questions/data-rh';
import { methodologyCategory } from './questions/data-methodology';
import { gitCategory } from './questions/data-git';
import { oopCategory } from './questions/data-oop';
import { designPatternsCategory } from './questions/data-design-patterns';
import { architectureCategory } from './questions/data-architecture';
import { javaCategory } from './questions/data-java';
import { springCategory } from './questions/data-spring';
import { angularCategory } from './questions/data-angular';
import { databaseCategory } from './questions/data-database';
import { sqlCategory } from './questions/data-sql';
import { microservicesCategory } from './questions/data-microservices';
import { devopsCategory } from './questions/data-devops';
import { securityCategory } from './questions/data-security';
import { performanceCategory } from './questions/data-performance';
import { restApiCategory } from './questions/data-rest-api';
import { cloudCategory } from './questions/data-cloud';
import { linuxCategory } from './questions/data-linux';
import { systemDesignCategory } from './questions/data-system-design';
import { behavioralCategory } from './questions/data-behavioral';
import { aiCategory } from './questions/data-ai';

export const interviewCategories = [
  rhCategory, methodologyCategory, gitCategory, oopCategory, designPatternsCategory,
  architectureCategory, javaCategory, springCategory, angularCategory, databaseCategory,
  sqlCategory, microservicesCategory, devopsCategory, securityCategory, performanceCategory,
  restApiCategory, cloudCategory, linuxCategory, systemDesignCategory, behavioralCategory, aiCategory,
];

export type { InterviewCategory, InterviewSection, InterviewQuestion } from '../../../core/models/interview.models';