import { client } from "@/sanity/client";
import {
  profileQuery,
  educationQuery,
  experiencesQuery,
  techStackQuery,
  projectsQuery,
  methodologyQuery,
  hardwareOpsQuery,
} from "@/sanity/queries";
import type {
  Profile,
  Education,
  Experience,
  TechStackData,
  Project,
  MethodologyData,
  HardwareOpsData,
} from "./types";

function ensureClient() {
  if (!client) throw new Error("Sanity client not configured");
  return client;
}

export async function getProfile(): Promise<Profile> {
  return ensureClient().fetch<Profile>(profileQuery);
}

export async function getEducation(): Promise<Education[]> {
  return ensureClient().fetch<Education[]>(educationQuery);
}

export async function getExperiences(): Promise<Experience[]> {
  return ensureClient().fetch<Experience[]>(experiencesQuery);
}

export async function getTechStack(): Promise<TechStackData> {
  return ensureClient().fetch<TechStackData>(techStackQuery);
}

export async function getProjects(): Promise<Project[]> {
  return ensureClient().fetch<Project[]>(projectsQuery);
}

export async function getMethodology(): Promise<MethodologyData> {
  return ensureClient().fetch<MethodologyData>(methodologyQuery);
}

export async function getHardwareOps(): Promise<HardwareOpsData> {
  return ensureClient().fetch<HardwareOpsData>(hardwareOpsQuery);
}
