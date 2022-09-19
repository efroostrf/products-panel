import getNextOfCategory from './getNextOfCategory';

async function getCategoriesTree(id: number): Promise<number[]> {
  return new Promise(async (resolve) => {
    var quoue = [];
    var values = [];
    quoue.push(...await getNextOfCategory(id));

    while (quoue.length > 0) {
      var node = quoue.shift();
      values.push(node);
      quoue.push(...await getNextOfCategory(node));
    }

    resolve(values);
  });
}

export default getCategoriesTree;
