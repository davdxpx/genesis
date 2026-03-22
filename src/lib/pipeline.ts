export const pipelineSteps = [
  { id: '0', path: 'sys-init', name: "SYS_INIT" },
  { id: '1', path: 'briefing', name: "BRIEFING" },
  { id: '2', path: 'auth-req', name: "AUTH_REQ" },
  { id: '3', path: 'client-io', name: "CLIENT_IO" },
  { id: '4', path: 'loc-select', name: "LOC_SELECT" },
  { id: '5', path: 'pid-screen', name: "PID_SCREEN" },
  { id: '6', path: 'crispr-lab', name: "CRISPR_LAB" },
  { id: '7', path: 'qa-check', name: "QA_CHECK" },
  { id: '8', path: 'ethics-eval', name: "ETHICS_EVAL" }, 
  { id: '9', path: 'pr-control', name: "PR_CONTROL" },
  { id: '10', path: 'phenotype', name: "PHENOTYPE" },
  { id: '11', path: 'attributes', name: "ATTRIBUTES" },
  { id: '12', path: 'psyche', name: "PSYCHE" },
  { id: '13', path: 'prognosis', name: "PROGNOSIS" },
];
export const getStepIndex = (path: string) => {
  return pipelineSteps.findIndex(step => step.path === path);
};
export const getNextPhaseUrl = (currentPath: string) => {
  const currentIndex = getStepIndex(currentPath);
  if (currentIndex >= 0 && currentIndex < pipelineSteps.length - 1) {
    return `/phase/${pipelineSteps[currentIndex + 1].path}`;
  }
  return null;
};