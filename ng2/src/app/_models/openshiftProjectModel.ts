/**
 * TODO: Find out what this is based on, if anything
 */
export class OpenShiftProjectModel {
  // Custom elements
  project: string;
  members: {
    name: string;
    role: string;
    uuid: string;
  }[];

  kind: string;
  apiVersion: string;
  metaData: {}; // ListMeta? Actual type depends on this list type
  items: any[]; // Route, Service, Pod. Actual type depends on this list type

  resourceVersion: string;
  selfLink: string;
}
