export interface IProject {
  id: number;
  project_name: string;
  priority: string;
  stage: string;
  progress: string;
  status: string;
  labels: string;
  open_risks: string;
  start_date: string;
  launch_date: string;
  owner: string;
  participants: string;
  blocked_by: string;
  blocking: string;
}

export const DATA: IProject[] = [
  {
    id: 1,
    project_name: 'Sports category on Netflix',
    priority: 'P0',
    stage: 'Scoping',
    progress: '10%',
    status: 'At risk',
    labels: 'revenue; board meeting; TV; mobile',
    open_risks: '3',
    start_date: '11-1-2023',
    launch_date: '2-27-2024',
    owner: 'Prod1',
    participants: 'Eng1; Eng 4; D1',
    blocked_by: '',
    blocking: '',
  },
  {
    id: 2,
    project_name: 'Public landing page',
    priority: 'P0',
    stage: 'Launched',
    progress: '100%',
    status: 'At risk',
    labels: 'mobile; users',
    open_risks: '3',
    start_date: '9-4-2023',
    launch_date: '10-16-2023',
    owner: 'Prod1',
    participants: 'Eng1; Eng 4; D1',
    blocked_by: '',
    blocking: '',
  },
  {
    id: 3,
    project_name: 'Search box',
    priority: 'P0',
    stage: 'Testing',
    progress: '80%',
    status: 'On track',
    labels: 'mobile; desktop; users',
    open_risks: '0',
    start_date: '10-9-2023',
    launch_date: '1-9-2024',
    owner: 'Prod1',
    participants: 'Eng2; Eng3; M1',
    blocked_by: '',
    blocking: '',
  },
  {
    id: 5,
    project_name: 'Search suggestions ',
    priority: 'P1',
    stage: 'Implementation',
    progress: '60%',
    status: 'On track',
    labels: 'mobile; desktop; users',
    open_risks: '0',
    start_date: '10-16-2023',
    launch_date: '1-16-2024',
    owner: 'Prod1',
    participants: 'Eng2; Eng3; M1',
    blocked_by: '',
    blocking: '',
  },
  {
    id: 6,
    project_name: 'Checkout page',
    priority: 'P0',
    stage: 'Implementation',
    progress: '40%',
    status: 'On track',
    labels: 'mobile; desktop; users; board meeting',
    open_risks: '2',
    start_date: '11-6-2023',
    launch_date: '1-2-2024',
    owner: 'Prod2',
    participants: 'Eng3; Eng5; M2',
    blocked_by: '',
    blocking: 'Payment gateway',
  },
  {
    id: 7,
    project_name: 'Payment gateway',
    priority: 'P0',
    stage: 'Design',
    progress: '20%',
    status: 'At risk',
    labels: 'mobile; desktop; users; board meeting',
    open_risks: '1',
    start_date: '11-13-2023',
    launch_date: '1-8-2024',
    owner: 'Prod2',
    participants: 'Eng4; Eng5; Eng6',
    blocked_by: 'Checkout page',
    blocking: '',
  },
  {
    id: 8,
    project_name: 'Catalog sorting',
    priority: 'P1',
    stage: 'Implementation',
    progress: '50%',
    status: 'At risk',
    labels: 'AI; mobile; desktop',
    open_risks: '0',
    start_date: '11-6-2023',
    launch_date: '11-30-2023',
    owner: 'Prod2',
    participants: 'Eng4; Eng5; Eng6',
    blocked_by: '',
    blocking: 'Advanced catalog sorting',
  },
  {
    id: 9,
    project_name: 'Advanced catalog sorting',
    priority: 'P2',
    stage: 'Not started',
    progress: '0%',
    status: 'On track',
    labels: 'AI; mobile; desktop',
    open_risks: '0',
    start_date: '11-1-2023',
    launch_date: '12-12-2023',
    owner: 'Prod2',
    participants: 'Eng4; Eng5; Eng6; M1',
    blocked_by: 'Catalog sorting',
    blocking: '',
  },
];

export interface GanttColumnConfig {
  field: string;
  title: string;
  width: number;
  expandable?: boolean;
}
