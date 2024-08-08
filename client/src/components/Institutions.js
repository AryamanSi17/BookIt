const InstitutionList = {
  NA:"None",
  
  // Add more institution mappings as needed
};

const DepartmentList = {
  NA:"None",
  // Add more department mappings as needed
};

const institutions = [
  {
    name: InstitutionList['AITR'],
    departments: [
      DepartmentList['CE'],
      DepartmentList['ME'],
      DepartmentList['EC'],
      DepartmentList['CSE'],
      DepartmentList['AIML'],
      DepartmentList['IT'],
      DepartmentList['CSIT'],
      DepartmentList['FCA'],
      DepartmentList['HUMI'],
      DepartmentList['CHEM'],
    ],
  },
  {
    name: InstitutionList['AIMSR'],
    departments: [
      DepartmentList['BSC'],
      DepartmentList['BBA'],
    ],
  },
  {
    name: InstitutionList['AIPER'],
    departments: [
      DepartmentList['AIPER'],
    ],
  },
  {
    name: InstitutionList['AMR'],
    departments: [
      DepartmentList['AMR'],
    ],
  },
  {
    name: InstitutionList['AILAW'],
    departments: [
      DepartmentList['AILAW'],
    ],
  },
  {
    name: InstitutionList['CDC'],
    departments: [
      DepartmentList['CDC'],
      DepartmentList['EDC'],
      DepartmentList['PLACEMENT'],
      DepartmentList['TRAINING'],
      DepartmentList['IIPC'],
    ],
  },
  {
    name: InstitutionList['AC'],
    departments: [
      DepartmentList['AC'],
    ],
  },
  // Add more institutions based on InstitutionList mappings as needed
];

export { institutions, InstitutionList, DepartmentList };
