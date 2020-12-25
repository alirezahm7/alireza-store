import React, { useContext } from 'react';
import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';
import { CartdropContext } from '../../provider/cart/cart.provider';

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;

  const {addItem} =useContext(CartdropContext);

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton className="custom-button" onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

// const mapDispatchToProps = dispatch => ({
//   addItem: items => dispatch(addItem(items))
// });

export default CollectionItem;
