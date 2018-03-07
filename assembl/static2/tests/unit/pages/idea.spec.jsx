import { transformPosts } from '../../../js/app/pages/idea';

describe('transformPosts function', () => {
  it('should transform posts', () => {
    const messageColumnsInput = [
      {
        color: '#50D593',
        index: 0,
        messageClassifier: 'positive',
        name: 'Positif'
      },
      {
        color: '#333333',
        index: 1,
        messageClassifier: 'negative',
        name: 'Négative'
      }
    ];
    const postsInput = [
      { node: { id: '1', subject: 'One', parentId: null, messageClassifier: 'positive' } },
      { node: { id: '2', subject: 'Two', parentId: null, messageClassifier: 'negative' } },
      { node: { id: '3', subject: 'Three', parentId: null, messageClassifier: 'positive' } },
      { node: { id: '4', subject: 'Four', parentId: null, messageClassifier: 'positive' } },
      { node: { id: '5', subject: 'First child of One', parentId: '1' } },
      { node: { id: '6', subject: 'Second child of One', parentId: '1' } },
      { node: { id: '7', subject: 'First child of Two', parentId: '2' } },
      { node: { id: '8', subject: 'First grandchild of One', parentId: '5' } },
      { node: { id: '9', subject: 'Second grandchild of One', parentId: '5' } }
    ];
    const expectedOutput = [
      {
        children: [
          {
            children: [
              { children: [], id: '8', parentId: '5', subject: 'First grandchild of One' },
              { children: [], id: '9', parentId: '5', subject: 'Second grandchild of One' }
            ],
            id: '5',
            parentId: '1',
            subject: 'First child of One'
          },
          { children: [], id: '6', parentId: '1', subject: 'Second child of One' }
        ],
        colColor: '#50D593',
        colName: 'Positif',
        id: '1',
        messageClassifier: 'positive',
        parentId: null,
        subject: 'One'
      },
      {
        children: [{ children: [], id: '7', parentId: '2', subject: 'First child of Two' }],
        colColor: '#333333',
        colName: 'Négative',
        id: '2',
        messageClassifier: 'negative',
        parentId: null,
        subject: 'Two'
      },
      {
        children: [],
        colColor: '#50D593',
        colName: 'Positif',
        id: '3',
        messageClassifier: 'positive',
        parentId: null,
        subject: 'Three'
      },
      {
        children: [],
        colColor: '#50D593',
        colName: 'Positif',
        id: '4',
        messageClassifier: 'positive',
        parentId: null,
        subject: 'Four'
      }
    ];
    const output = transformPosts(postsInput, messageColumnsInput);
    expect(output).toEqual(expectedOutput);
  });

  it('should transform posts and filter out deleted top post without answers', () => {
    const postsInput = [
      { node: { id: '1', subject: 'One', parentId: null, publicationState: 'DELETED_BY_ADMIN' } },
      { node: { id: '2', subject: 'Two', parentId: null, publicationState: 'DELETED_BY_ADMIN' } },
      { node: { id: '3', subject: 'Three', parentId: null, publicationState: 'DELETED_BY_USER' } },
      { node: { id: '4', subject: 'Four', parentId: null, publicationState: 'DELETED_BY_USER' } },
      { node: { id: '5', subject: 'Five', parentId: null } },
      { node: { id: '6', subject: 'Six', parentId: null } },
      { node: { id: '7', subject: 'First child of Two', parentId: '2' } },
      { node: { id: '8', subject: 'First child of Four', parentId: '4' } },
      { node: { id: '9', subject: 'First child of Five', parentId: '5', publicationState: 'DELETED_BY_USER' } },
      { node: { id: '10', subject: 'First child of Six', parentId: '6', publicationState: 'DELETED_BY_USER' } },
      { node: { id: '11', subject: 'First grandchild of Six', parentId: '10' } }
    ];
    const expectedOutput = [
      {
        children: [{ children: [], id: '7', parentId: '2', subject: 'First child of Two' }],
        id: '2',
        parentId: null,
        publicationState: 'DELETED_BY_ADMIN',
        subject: 'Two'
      },
      {
        children: [{ children: [], id: '8', parentId: '4', subject: 'First child of Four' }],
        id: '4',
        parentId: null,
        publicationState: 'DELETED_BY_USER',
        subject: 'Four'
      },
      {
        children: [{ children: [], id: '9', parentId: '5', publicationState: 'DELETED_BY_USER', subject: 'First child of Five' }],
        id: '5',
        parentId: null,
        subject: 'Five'
      },
      {
        children: [
          {
            children: [{ children: [], id: '11', parentId: '10', subject: 'First grandchild of Six' }],
            id: '10',
            parentId: '6',
            publicationState: 'DELETED_BY_USER',
            subject: 'First child of Six'
          }
        ],
        id: '6',
        parentId: null,
        subject: 'Six'
      }
    ];
    const output = transformPosts(postsInput, []);
    expect(output).toEqual(expectedOutput);
  });
});