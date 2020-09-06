import categoriesMetadata from '../../__fixtures__/categories-metadata';

const useTagsList = jest
  .fn()
  .mockImplementation(() => categoriesMetadata);
  
export default useTagsList;
