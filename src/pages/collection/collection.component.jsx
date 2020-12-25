import React,{useContext} from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';
import CollectionContext from '../../context/collections/collection.context';


import './collection.styles.scss';

const CollectionPage = ({ match }) => {
  const collections=useContext(CollectionContext);
  const collection =collections[match.params.collectionId];
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// const mapStateToProps = (state, ownProps) => ({
//   collection: selectCollection(ownProps.match.params.collectionId)(state)
// });


export default CollectionPage;
