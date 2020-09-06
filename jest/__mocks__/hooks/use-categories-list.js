import categoriesMetadata from '../../__fixtures__/categories-metadata';

const useCategoriesList = jest
  .fn()
  .mockImplementation(() => categoriesMetadata);

export default useCategoriesList;
