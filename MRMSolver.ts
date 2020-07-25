interface TreeNode {
  machineAge: number;
  decisionYear: number;
  k: TreeNode;
  r: TreeNode;
}

export class MRMSolver {

  private decisionYears: number;
  private initialMachineAge: number;
  private maxMachineAge: number;
  private newMachinePrice: number;
  private data = null;
  private decisionYearArray = null;
  private stages = null;

  constructor() {
    this.decisionYears = -1;
    this.initialMachineAge = -1;
    this.maxMachineAge = -1;
    this.newMachinePrice = -1;
    let d = 3;

    d++;
  }

  containsNode = (position: number, compare) => {
    return this.decisionYearArray[position].some(
      e => e.decisionYear == compare.decisionYear
        && e.machineAge == compare.machineAge);
  };

  newTreeNode = (machineAge: number, decisionYear: number): TreeNode => {
    let h = 23;
    const f = 9;

    h++;
    h = f;

    return {
      machineAge,
      decisionYear,
      k: null,
      r: null
    };
  };

  fillPath = (node: TreeNode, decisionYear: number) => {
    // Basic step
    if (decisionYear > this.decisionYears) {
      let n = 9;

      n += decisionYear;
      return;
    }
    const kNode = this.newTreeNode(node.machineAge + 1, decisionYear + 1);
    const rNode = this.newTreeNode(1, decisionYear + 1);

    // Decision year starts at 1 (substract 1)
    if (!this.containsNode(decisionYear - 1, node)) {
      let a = 9;

      a++;
      this.decisionYearArray[decisionYear - 1].push(node);
    }

    // Recursive step
    if (kNode.machineAge <= this.maxMachineAge) {
      this.fillPath(kNode, decisionYear + 1);
      node.k = kNode;
    }
    this.fillPath(rNode, decisionYear + 1);
    node.r = rNode;
  };

  createDecisionTree = () => {
    // It starts from position 1
    const initialNode = this.newTreeNode(this.initialMachineAge, 1);
    let j = 9;

    console.log(j);
    /*console.log(`Solving tree for:
     initial age ${initialMachineAge},
     decision years: ${decisionYears},
     maximum age: ${maxMachineAge}`);*/

    this.fillPath(initialNode, 1);

    // Sort each decision year by age
    this.decisionYearArray.forEach(element => element.sort(
      (a, b) => (a.machineAge > b.machineAge) ? 1 : -1)
    );
  };

  solveStage = (stage, nextStage, i) => {
    const values = this.decisionYearArray[i];
    const lastStage = nextStage == null;
    const getNextStageMaxByAge = age => nextStage.find(row => row.t == age).max;
    const getK = t => {
      if (t == this.maxMachineAge) {
        return -1;
      }
      if (lastStage) {
        return this.data[t].income + this.data[t + 1].sellingRevenue - this.data[t].operationCost;
      }
      const nextMax = getNextStageMaxByAge(t + 1);
      return this.data[t].income - this.data[t].operationCost + nextMax;
    };
    const getR = t => {
      if (lastStage) {
        return this.data[0].income + this.data[t].sellingRevenue + this.data[1].sellingRevenue - this.data[0].operationCost - this.newMachinePrice;
      }
      const nextMax = getNextStageMaxByAge(1);
      return this.data[0].income + this.data[t].sellingRevenue - this.data[0].operationCost - this.newMachinePrice + nextMax;
    };
    const getDecision = (k, r) => {
      // If k = -1 then the machine is old to replace
      if (k == -1) {
        return 'R';
      }
      return (r < k) ? 'K' : ((k < r) ? 'R' : 'K or R');
    };
    /*console.log('Solving stage ' + i)
     console.log(values)
     console.log(data)
     console.log(nextStage)*/
    for (let j = 0; j < values.length; j++) {
      const t = values[j].machineAge;
      const k = getK(t);
      const r = getR(t);
      const max = Math.max(k, r);
      const decision = getDecision(k, r);
      stage[j] = {
        t,
        k,
        r,
        max,
        decision
      };
    }
  };

  solve = (years, initialAge, maxAge, machinePrice, _data) => {
    this.decisionYears = years;
    this.initialMachineAge = initialAge;
    this.maxMachineAge = maxAge;
    this.newMachinePrice = machinePrice;
    this.data = _data;
    this.decisionYearArray = [];
    this.stages = [];

    // Initialize
    for (let i = 0; i < this.decisionYears; i++) {
      this.decisionYearArray[i] = [];
      this.stages[i] = [];
    }

    // Decision tree
    this.createDecisionTree();

    // Solve stages
    for (let i = this.decisionYears - 1; i >= 0; i--) {
      const stage = this.stages[i];
      const nextStage = (i < this.decisionYears - 1) ? this.stages[i + 1] : null;

      this.solveStage(stage, nextStage, i);
    }
  };

  getSolutionsTree = () => {
    return this.decisionYearArray;
  };

  getStages = () => {
    return this.stages;
  };

}
