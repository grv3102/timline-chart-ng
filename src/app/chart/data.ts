export interface ITeamMember {
  team: string;
  team_member: string;
}

export const TEAM_MEMBERS: ITeamMember[] = [
  {
    team: 'Engineering 1',
    team_member: 'Eng1; Eng2; Eng3',
  },
  {
    team: 'Engineering 2',
    team_member: 'Eng4; Eng5; Eng6',
  },
  {
    team: 'Product',
    team_member: 'Prod1; Prod2',
  },
  {
    team: 'Design',
    team_member: 'D1; D2',
  },
  {
    team: 'Marketing',
    team_member: 'M1; M2',
  },
];

export interface Project {
  project_name: string;
  priority: string;
  owner: string;
  participants: string;
}

export interface TeamMemberProjects {
  teamMember: string;
  P0: number;
  P1: number;
  P2: number;
}
